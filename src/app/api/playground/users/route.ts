import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { emitServerLog } from "@/lib/server-logs";

const ALLOWED_PARAMS = new Set(["role", "active", "name"]);
const ALLOWED_ROLES = new Set(["backend", "automation", "devops"]);
const MAX_LIMIT = 20;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  const reqStart = performance.now();

  try {
    const { searchParams } = new URL(request.url);

    // 1. Strict parameter validation: reject any unknown query parameter
    for (const key of searchParams.keys()) {
      if (!ALLOWED_PARAMS.has(key)) {
        emitServerLog({
          level: "WARN",
          source: "validator",
          message: "invalid query parameter",
          result: "400 BAD REQUEST",
          status: 400,
        });

        return NextResponse.json(
          { ok: false, error: "Invalid query parameter" },
          { status: 400 }
        );
      }
    }

    const role = searchParams.get("role");
    const activeParam = searchParams.get("active");
    const name = searchParams.get("name");

    const queryFilter: Record<string, unknown> = {};

    // 2. Validate 'role' if present
    if (role !== null) {
      if (!ALLOWED_ROLES.has(role)) {
        emitServerLog({
          level: "WARN",
          source: "validator",
          message: "invalid role parameter",
          result: "400 BAD REQUEST",
          status: 400,
        });

        return NextResponse.json(
          { ok: false, error: "Invalid query parameter" },
          { status: 400 }
        );
      }
      queryFilter.role = role;
    }

    // 3. Validate 'active' if present
    if (activeParam !== null) {
      if (activeParam !== "true" && activeParam !== "false") {
        emitServerLog({
          level: "WARN",
          source: "validator",
          message: "invalid active parameter",
          result: "400 BAD REQUEST",
          status: 400,
        });

        return NextResponse.json(
          { ok: false, error: "Invalid query parameter" },
          { status: 400 }
        );
      }
      queryFilter.active = activeParam === "true";
    }

    // 4. Validate 'name' if present (length 1 - 30 chars)
    if (name !== null) {
      const trimmedName = name.trim();
      if (trimmedName.length < 1 || trimmedName.length > 30) {
        emitServerLog({
          level: "WARN",
          source: "validator",
          message: "invalid name parameter length",
          result: "400 BAD REQUEST",
          status: 400,
        });

        return NextResponse.json(
          { ok: false, error: "Invalid query parameter" },
          { status: 400 }
        );
      }
      // Safe server-side case-insensitive partial regex match with escaped special characters
      queryFilter.name = {
        $regex: escapeRegex(trimmedName),
        $options: "i",
      };
    }

    // 5. Query MongoDB Atlas
    const dbStart = performance.now();
    const client = await clientPromise;
    const db = client.db("portfolio_playground");
    const users = await db
      .collection("users")
      .find(queryFilter, {
        projection: { _id: 0, name: 1, role: 1, active: 1 },
      })
      .limit(MAX_LIMIT)
      .toArray();

    const dbDuration = Math.round(performance.now() - dbStart);

    // Emit database query completed event
    emitServerLog({
      level: "INFO",
      source: "db",
      message: "users query completed",
      result: `${users.length} record${users.length === 1 ? "" : "s"} · ${dbDuration}ms`,
      durationMs: dbDuration,
    });

    // Build sanitized path string (never expose raw visitor-supplied name search)
    const sanitizedParts: string[] = [];
    if (role) sanitizedParts.push(`role=${role}`);
    if (activeParam !== null) sanitizedParts.push(`active=${activeParam}`);
    if (name !== null) sanitizedParts.push(`name=[filter]`);
    const sanitizedQuery = sanitizedParts.length > 0 ? `?${sanitizedParts.join("&")}` : "";
    const sanitizedPath = `/api/playground/users${sanitizedQuery}`;

    const totalDuration = Math.round(performance.now() - reqStart);

    // Emit HTTP request completed event
    emitServerLog({
      level: "INFO",
      source: "http",
      message: `GET ${sanitizedPath}`,
      result: `200 OK · ${totalDuration}ms`,
      status: 200,
      durationMs: totalDuration,
    });

    return NextResponse.json({
      ok: true,
      count: users.length,
      users,
    });
  } catch (error) {
    // Log error internally; never expose stack traces or DB connection details to client
    console.error("Playground users API error:", error);

    emitServerLog({
      level: "ERROR",
      source: "server",
      message: "internal query failure",
      result: "500 INTERNAL ERROR",
      status: 500,
    });

    return NextResponse.json(
      { ok: false, error: "Something went wrong while processing the request." },
      { status: 500 }
    );
  }
}
