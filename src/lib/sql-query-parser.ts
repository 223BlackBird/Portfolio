/**
 * Safe SQL-to-Mongo Filter Parser
 *
 * Implements a strict, safe translation layer for a controlled subset of SQL:
 * SELECT * FROM users [WHERE condition AND condition...]
 *
 * Rejects raw database operators, subqueries, unapproved tables, and unknown fields.
 */

const ALLOWED_ROLES = new Set(["backend", "automation", "devops"]);

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface SqlParseResult {
  ok: boolean;
  filter?: Record<string, unknown>;
  error?: string;
}

export function parseSafeSql(sql: string): SqlParseResult {
  if (typeof sql !== "string") {
    return { ok: false, error: "SQL query must be a string." };
  }

  // Normalize: remove trailing semicolon and excess whitespace
  const clean = sql.trim().replace(/;\s*$/, "").trim();

  // Guard against dangerous SQL patterns (subqueries, unions, comments, multiple statements)
  if (/[;]|--|\/\*|\*\/|\bUNION\b|\bDROP\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bEXEC\b/i.test(clean)) {
    return { ok: false, error: "Unsupported SQL syntax or statement." };
  }

  // Validate basic SELECT * FROM users syntax
  const selectMatch = clean.match(/^SELECT\s+(\*|[a-zA-Z0-9_,\s]+)\s+FROM\s+users(?:\s+WHERE\s+(.+))?$/i);
  if (!selectMatch) {
    return {
      ok: false,
      error: "Only queries of form 'SELECT * FROM users [WHERE ...]' are supported.",
    };
  }

  const whereClause = selectMatch[2];
  if (!whereClause || whereClause.trim().length === 0) {
    return { ok: true, filter: {} };
  }

  // Reject unsupported OR conjunctions or grouping parentheses
  if (/\bOR\b|\(|\)/i.test(whereClause)) {
    return {
      ok: false,
      error: "Only 'AND' conjunctions on permitted fields (role, active, name) are supported.",
    };
  }

  const conditions = whereClause.split(/\s+AND\s+/i);
  const filter: Record<string, unknown> = {};

  for (const rawCondition of conditions) {
    const condition = rawCondition.trim();

    // 1. Role match: role = 'backend' | role = "backend"
    const roleMatch = condition.match(/^role\s*=\s*['"]?([a-zA-Z0-9_-]+)['"]?$/i);
    if (roleMatch) {
      const roleVal = roleMatch[1].toLowerCase();
      if (!ALLOWED_ROLES.has(roleVal)) {
        return { ok: false, error: `Invalid role: '${roleVal}'. Allowed: backend, automation, devops.` };
      }
      filter.role = roleVal;
      continue;
    }

    // 2. Active match: active = true | active = false
    const activeMatch = condition.match(/^active\s*=\s*(true|false)$/i);
    if (activeMatch) {
      filter.active = activeMatch[1].toLowerCase() === "true";
      continue;
    }

    // 3. Name match: name = 'alex' OR name LIKE '%alex%'
    const nameMatch = condition.match(/^name\s*(?:=\s*['"]([^'"]+)['"]|\s+LIKE\s+['"]%?([^'"%]+)%?['"])$/i);
    if (nameMatch) {
      const rawName = (nameMatch[1] || nameMatch[2] || "").trim();
      if (rawName.length < 1 || rawName.length > 30) {
        return { ok: false, error: "Name search must be between 1 and 30 characters." };
      }
      filter.name = {
        $regex: escapeRegex(rawName),
        $options: "i",
      };
      continue;
    }

    // Unrecognized or unauthorized condition
    return {
      ok: false,
      error: `Invalid condition: '${condition}'. Allowed fields: role, active, name.`,
    };
  }

  return { ok: true, filter };
}
