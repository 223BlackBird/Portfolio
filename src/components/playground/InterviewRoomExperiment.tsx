"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  Scale,
  Clock,
  Layers,
} from "lucide-react";
import type { InterviewQuestionData } from "@/lib/interview-service";

export function InterviewRoomExperiment() {
  const [data, setData] = useState<InterviewQuestionData | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextLoading, setIsNextLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = async (isNext = false) => {
    if (isNext) {
      setIsNextLoading(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const res = await fetch(`/api/playground/interview${isNext ? "?next=true" : ""}`);
      if (!res.ok) {
        throw new Error("Failed to load interview question");
      }
      const json = await res.json();
      if (json.ok) {
        setData(json);
        setIsRevealed(false);
      } else {
        throw new Error(json.error || "Service error");
      }
    } catch {
      setError("Interview feed temporarily unavailable. Please try again.");
    } finally {
      setIsLoading(false);
      setIsNextLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 transition-colors hover:border-white/[0.14] flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              05
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  data?.isLive
                    ? "bg-emerald-400 animate-pulse motion-reduce:animate-none"
                    : "bg-zinc-500"
                }`}
              />
              {data?.isLive ? "LIVE FEED" : "CACHED"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {data?.level && (
              <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                {data.level}
              </span>
            )}
            {data?.trendLabel && (
              <span
                className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                  data.trendLabel === "TRENDING TOPIC"
                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                    : "bg-zinc-900 text-zinc-300 border-zinc-800"
                }`}
              >
                {data.trendLabel}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1 flex items-center gap-2">
          <span>INTERVIEW ROOM</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Original technical interview questions synthesized from recent public engineering interview reports.
        </p>

        {error ? (
          <div className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-center font-mono text-xs text-zinc-400 space-y-3">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => fetchQuestion(false)}
              className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono"
            >
              Retry
            </button>
          </div>
        ) : isLoading || !data ? (
          <div className="p-8 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-center font-mono text-xs text-zinc-500 flex flex-col items-center justify-center gap-2 min-h-[220px]">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Ingesting recent interview reports...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Topic & Source Origin Notice */}
            <div className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/70 text-xs font-mono space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TOPIC: {data.topic}</span>
                </div>
                {data.crossSource && (
                  <span className="text-[10px] text-zinc-400 bg-zinc-900 px-1.5 py-0.2 rounded border border-zinc-800 flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5 text-emerald-400" />
                    <span>Cross-community signal</span>
                  </span>
                )}
              </div>

              {/* Explicit Attribution Line */}
              <div className="text-[11px] text-zinc-400 flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 border-t border-zinc-800/50">
                <span className="text-zinc-500">Report origin:</span>
                <span className="text-zinc-300 truncate max-w-[280px] sm:max-w-md" title={data.source.reportTitle}>
                  "{data.source.reportTitle}"
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">{data.source.platform}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">{data.source.publishedDate}</span>
                {data.source.supportingReportCount > 1 && (
                  <>
                    <span className="text-zinc-600">·</span>
                    <span className="text-emerald-400 font-medium">
                      {data.source.supportingReportCount} independent reports
                    </span>
                  </>
                )}
                <a
                  href={data.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 transition-colors underline underline-offset-2 ml-auto"
                >
                  <span>Inspect report</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-xl bg-[#08090e] border border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  Original Interview Question
                </span>
                <span className="text-[10px] font-mono text-zinc-600">
                  Synthesized for technical evaluation
                </span>
              </div>

              <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                {data.question}
              </p>

              {/* Think State / Action */}
              {!isRevealed ? (
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-zinc-800/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Take a moment to formulate your approach mentally before revealing.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsRevealed(true)}
                    className="w-full sm:w-auto px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] border border-emerald-400 transition-all flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                  >
                    <span>REVEAL BREAKDOWN</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                /* Revealed Breakdown */
                <div className="pt-3 border-t border-zinc-800/60 space-y-3.5 animate-fadeIn">
                  {/* Discussion */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>Discussion & Expected Reasoning</span>
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {data.discussion}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>What Interviewers Are Looking For</span>
                    </span>
                    <ul className="grid grid-cols-1 gap-1 font-mono text-[11px] text-zinc-300 pl-1">
                      {data.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trade-offs */}
                  <div className="space-y-1 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      <span>Engineering Trade-offs</span>
                    </span>
                    <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                      {data.tradeOffs}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Strip with Next Question Action & Freshness */}
      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex flex-wrap items-center justify-between gap-2.5 text-[10px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-600" />
            <span>
              {data?.isLive
                ? `Source updated: ${data.source.cacheAgeFormatted}`
                : `Cache age: ${data?.source.cacheAgeFormatted || "recent"}`}
            </span>
          </span>
          <span className="text-zinc-700">·</span>
          {/* <span className="text-zinc-500">Non-verbatim original synthesis</span> */}
        </div>

        <button
          type="button"
          onClick={() => fetchQuestion(true)}
          disabled={isNextLoading}
          className="px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-mono ml-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isNextLoading ? "animate-spin text-emerald-400" : ""}`} />
          <span>NEXT QUESTION</span>
        </button>
      </div>
    </div>
  );
}
