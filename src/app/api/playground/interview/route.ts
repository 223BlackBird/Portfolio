import { NextRequest, NextResponse } from "next/server";
import { getInterviewQuestion } from "@/lib/interview-service";
import { emitServerLog } from "@/lib/server-logs";

const ALLOWED_PARAMS = new Set(["next"]);

export async function GET(request: NextRequest) {
  const reqStart = performance.now();

  try {
    const { searchParams } = new URL(request.url);

    // Reject unrecognized query parameters
    for (const key of searchParams.keys()) {
      if (!ALLOWED_PARAMS.has(key)) {
        return NextResponse.json(
          { ok: false, error: "Invalid query parameter" },
          { status: 400 }
        );
      }
    }

    const isNext = searchParams.get("next") === "true";
    const question = await getInterviewQuestion(isNext);

    const totalDuration = Math.round(performance.now() - reqStart);

    emitServerLog({
      level: "INFO",
      source: "http",
      message: `GET /api/playground/interview${isNext ? "?next=true" : ""}`,
      result: `200 OK · ${totalDuration}ms`,
      status: 200,
      durationMs: totalDuration,
    });

    emitServerLog({
      level: "INFO",
      source: "server",
      message: `interview topic selected: ${question.topic}`,
      result: `${question.trendLabel} (${question.source.platform})`,
    });

    return NextResponse.json({
      ok: true,
      ...question,
    });
  } catch (error) {
    console.error("Playground interview API error:", error);

    emitServerLog({
      level: "ERROR",
      source: "server",
      message: "interview topic retrieval failure",
      result: "500 INTERNAL ERROR",
      status: 500,
    });

    return NextResponse.json(
      { ok: false, error: "Interview service temporarily unavailable." },
      { status: 500 }
    );
  }
}
