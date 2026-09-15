"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, X, RefreshCw, ArrowRight, ShieldCheck } from "lucide-react";

type SimState = "idle" | "running" | "completed";

interface AttemptStep {
  attemptNumber: number;
  status: "pending" | "timeout" | "success";
  backoffWait?: string;
  timestamp?: string;
}

export function RetryPolicyExperiment() {
  const [state, setState] = useState<SimState>("idle");
  const [visibleAttempts, setVisibleAttempts] = useState<AttemptStep[]>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending timers on unmount or reset
  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleSimulate = () => {
    if (state === "running") return;

    clearTimers();
    setState("running");
    setVisibleAttempts([]);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Immediate completion without delayed animations
      setVisibleAttempts([
        { attemptNumber: 1, status: "timeout", backoffWait: "200ms" },
        { attemptNumber: 2, status: "timeout", backoffWait: "400ms" },
        { attemptNumber: 3, status: "success" },
      ]);
      setState("completed");
      return;
    }

    // Step 1: Attempt 1
    const t1 = setTimeout(() => {
      setVisibleAttempts([
        { attemptNumber: 1, status: "timeout", backoffWait: "200ms" },
      ]);

      // Step 2: Attempt 2 after backoff
      const t2 = setTimeout(() => {
        setVisibleAttempts((prev) => [
          ...prev,
          { attemptNumber: 2, status: "timeout", backoffWait: "400ms" },
        ]);

        // Step 3: Attempt 3 after further backoff
        const t3 = setTimeout(() => {
          setVisibleAttempts((prev) => [
            ...prev,
            { attemptNumber: 3, status: "success" },
          ]);
          setState("completed");
        }, 900);
        timersRef.current.push(t3);
      }, 900);
      timersRef.current.push(t2);
    }, 400);

    timersRef.current.push(t1);
  };

  const handleReset = () => {
    clearTimers();
    setState("idle");
    setVisibleAttempts([]);
  };

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-white/[0.14]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              EXPERIMENT 03
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider">
              FAULT TOLERANCE
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-zinc-400" />
            <span>RETRY LOGIC</span>
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
          RETRY POLICY
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Watch transient connection failure recover via exponential backoff.
        </p>

        {/* Initial Architectural Flow Strip */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 font-mono text-xs mb-3.5">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-[11px]">
            REQUEST
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-[11px]">
            API
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-[11px]">
            DATABASE
          </span>
        </div>

        {/* Action Button */}
        <div className="mb-4">
          {state === "idle" && (
            <button
              type="button"
              onClick={handleSimulate}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 font-mono text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>SIMULATE FAILURE</span>
              <span className="text-zinc-500 font-normal">→ 3 attempts</span>
            </button>
          )}

          {state === "running" && (
            <button
              type="button"
              disabled
              className="w-full py-2 px-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-mono text-xs flex items-center justify-center gap-2 cursor-wait"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Running backoff retry loop...</span>
            </button>
          )}

          {state === "completed" && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
              <span>TRY AGAIN</span>
            </button>
          )}
        </div>

        {/* Simulation Output Area */}
        <div className="rounded-xl bg-[#08090e] border border-zinc-800/80 p-3.5 font-mono text-xs min-h-[145px] flex flex-col justify-center">
          {state === "idle" && (
            <div className="text-center py-4 text-zinc-600 text-xs">
              Click <span className="text-zinc-400">SIMULATE FAILURE</span> to observe retry mechanics.
            </div>
          )}

          {(state === "running" || state === "completed") && (
            <div className="space-y-2.5">
              <div className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider flex items-center justify-between">
                <span>REQUEST EXECUTION TRACE</span>
                <span className="text-zinc-600">max_retries = 3</span>
              </div>

              <div className="space-y-2">
                {visibleAttempts.map((att) => (
                  <div
                    key={att.attemptNumber}
                    className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/80 border border-zinc-800/60 text-xs animate-in fade-in duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400 font-medium">
                        Attempt {att.attemptNumber}
                      </span>
                      {att.backoffWait && att.status === "timeout" && (
                        <span className="text-[10px] text-zinc-500 font-normal">
                          (wait {att.backoffWait})
                        </span>
                      )}
                    </div>

                    {att.status === "timeout" ? (
                      <span className="inline-flex items-center gap-1 text-rose-400 text-xs font-semibold">
                        <X className="w-3.5 h-3.5" />
                        <span>✕ timeout</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        <span>✓ success</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {state === "completed" && (
                <div className="pt-2 border-t border-zinc-800/60 grid grid-cols-2 gap-2 text-[11px] animate-in fade-in duration-300">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Retry strategy</span>
                    <span className="text-zinc-200 font-semibold">Exponential backoff</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Result</span>
                    <span className="text-emerald-400 font-semibold">Recovered</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Prevents cascading network outages</span>
        <span className="text-zinc-600">idempotent retry</span>
      </div>
    </div>
  );
}
