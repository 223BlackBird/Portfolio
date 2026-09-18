import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { emitServerLog } from "@/lib/server-logs";
import { parseSafeSql } from "@/lib/sql-query-parser";

const ALLOWED_FIELDS = new Set(["role", "active", "name"]);
const ALLOWED_ROLES = new Set(["backend", "automation", "devops"]);
const MAX_LIMIT = 20;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isPlainObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

export async function POST(request: NextRequest) {
  const reqStart = performance.now();

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      emitServerLog({
        level: "WARN",
        source: "validator",
        message: "malformed JSON payload",
        result: "400 BAD REQUEST",
        status: 400,
      });

      return NextResponse.json(
        { ok: false, error: "Invalid query" },
        { status: 400 }
      );
    }

    if (!isPlainObject(body)) {
      emitServerLog({
        level: "WARN",
        source: "validator",
        message: "request body must be an object",
        result: "400 BAD REQUEST",
        status: 400,
      });

      return NextResponse.json(
        { ok: false, error: "Invalid query" },
        { status: 400 }
      );
    }

    const payloadType = typeof body.type === "string" ? body.type.toLowerCase() : "json";
    let mongoFilter: Record<string, unknown> = {};

    // Mode A: SQL Query Payload
    if (payloadType === "sql" || (typeof body.sql === "string" && !body.query)) {
      if (typeof body.sql !== "string" || body.sql.trim().length === 0) {
        emitServerLog({
          level: "WARN",
          source: "validator",
          message: "empty SQL payload",
          result: "400 BAD REQUEST",
          status: 400,
        });

        return NextResponse.json(
          { ok: false, error: "Invalid query: 'sql' string required." },
          { status: 400 }
        );
      }

      const sqlResult = parseSafeSql(body.sql);
      if (!sqlResult.ok || !sqlResult.filter) {
        emitServerLog({
          level: "WARN",
          source: "validator",
          message: "SQL validation rejected",
          result: "400 BAD REQUEST",
          status: 400,
        });

        return NextResponse.json(
          { ok: false, error: sqlResult.error ?? "Invalid SQL query" },
          { status: 400 }
        );
      }

      mongoFilter = sqlResult.filter;
    }
    // Mode B: JSON Query Payload
    else if (payloadType === "json" || isPlainObject(body.query)) {
      if (!isPlainObject(body.query)) {
        emitServerLog({
          level: "WARN",
          source: "validator",
          message: "query must be a plain object",
          result: "400 BAD REQUEST",
          status: 400,
        });

        return NextResponse.json(
          { ok: false, error: "Invalid query" },
          { status: 400 }
        );
      }

      const queryInput = body.query;
      const inputKeys = Object.keys(queryInput);

      // Reject any unknown fields (e.g. $where, $regex, foo, etc.)
      for (const key of inputKeys) {
        if (!ALLOWED_FIELDS.has(key)) {
          emitServerLog({
            level: "WARN",
            source: "validator",
            message: `unauthorized query field: ${key}`,
            result: "400 BAD REQUEST",
            status: 400,
          });

          return NextResponse.json(
            { ok: false, error: "Invalid query" },
            { status: 400 }
          );
        }
      }

      // Validate 'role' if present
      if ("role" in queryInput) {
        const role = queryInput.role;
        if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
          emitServerLog({
            level: "WARN",
            source: "validator",
            message: "invalid role query value",
            result: "400 BAD REQUEST",
            status: 400,
          });

          return NextResponse.json(
            { ok: false, error: "Invalid query" },
            { status: 400 }
          );
        }
        mongoFilter.role = role;
      }

      // Validate 'active' if present
      if ("active" in queryInput) {
        const active = queryInput.active;
        if (typeof active !== "boolean") {
          emitServerLog({
            level: "WARN",
            source: "validator",
            message: "invalid active query value",
            result: "400 BAD REQUEST",
            status: 400,
          });

          return NextResponse.json(
            { ok: false, error: "Invalid query" },
            { status: 400 }
          );
        }
        mongoFilter.active = active;
      }

      // Validate 'name' if present (length 1 - 30 chars)
      if ("name" in queryInput) {
        const name = queryInput.name;
        if (typeof name !== "string") {
          emitServerLog({
            level: "WARN",
            source: "validator",
            message: "invalid name query value",
            result: "400 BAD REQUEST",
            status: 400,
          });

          return NextResponse.json(
            { ok: false, error: "Invalid query" },
            { status: 400 }
          );
        }

        const trimmedName = name.trim();
        if (trimmedName.length < 1 || trimmedName.length > 30) {
          emitServerLog({
            level: "WARN",
            source: "validator",
            message: "name query out of bounds",
            result: "400 BAD REQUEST",
            status: 400,
          });

          return NextResponse.json(
            { ok: false, error: "Invalid query" },
            { status: 400 }
          );
        }

        mongoFilter.name = {
          $regex: escapeRegex(trimmedName),
          $options: "i",
        };
      }
    } else {
      return NextResponse.json(
        { ok: false, error: "Invalid query payload format." },
        { status: 400 }
      );
    }

    // Execute safe MongoDB query
    const dbStart = performance.now();
    const client = await clientPromise;
    const db = client.db("portfolio_playground");
    const users = await db
      .collection("users")
      .find(mongoFilter, {
        projection: { _id: 0, name: 1, role: 1, active: 1 },
      })
      .limit(MAX_LIMIT)
      .toArray();

    const dbDuration = Math.round(performance.now() - dbStart);

    emitServerLog({
      level: "INFO",
      source: "db",
      message: `${payloadType.toUpperCase()} query completed`,
      result: `${users.length} record${users.length === 1 ? "" : "s"} · ${dbDuration}ms`,
      durationMs: dbDuration,
    });

    const totalDuration = Math.round(performance.now() - reqStart);

    emitServerLog({
      level: "INFO",
      source: "http",
      message: `POST /api/playground/query (${payloadType.toUpperCase()})`,
      result: `200 OK · ${totalDuration}ms`,
      status: 200,
      durationMs: totalDuration,
    });

    return NextResponse.json({
      ok: true,
      mode: payloadType,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Playground query API error:", error);

    emitServerLog({
      level: "ERROR",
      source: "server",
      message: "query execution failure",
      result: "500 INTERNAL ERROR",
      status: 500,
    });

    return NextResponse.json(
      { ok: false, error: "Query could not be completed." },
      { status: 500 }
    );
  }
}
