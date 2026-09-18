import { NextRequest, NextResponse } from "next/server";
import { getRecentServerLogs } from "@/lib/server-logs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Reject unknown parameters to keep the endpoint strictly controlled
    if (Array.from(searchParams.keys()).length > 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid query parameter" },
        { status: 400 }
      );
    }

    // Return the recent public-safe server logs from the in-memory buffer
    // IMPORTANT: Do not log requests to /api/playground/logs to prevent recursion
    const logs = getRecentServerLogs(50);

    return NextResponse.json({
      ok: true,
      logs,
    });
  } catch (error) {
    console.error("Playground logs API error:", error);

    return NextResponse.json(
      { ok: false, error: "Log stream unavailable" },
      { status: 500 }
    );
  }
}
