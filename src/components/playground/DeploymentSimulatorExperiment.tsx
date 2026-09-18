"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, RefreshCw, Play, CheckCircle2 } from "lucide-react";

type DeployState = "idle" | "running" | "completed";

interface DeploymentStage {
  step: string;
  label: string;
  status: "pending" | "running" | "done";
  details?: string;
  progress?: number;
}

const INITIAL_STAGES: DeploymentStage[] = [
  { step: "[1/5]", label: "Backing up current build...", status: "pending", details: "✓ Complete" },
  { step: "[2/5]", label: "Installing dependencies...", status: "pending", details: "✓ Complete" },
  { step: "[3/5]", label: "Building application...", status: "pending", progress: 0 },
  { step: "[4/5]", label: "Validating build...", status: "pending", details: "✓ Complete" },
  { step: "[5/5]", label: "Reloading PM2...", status: "pending", details: "✓ Complete" },
];

export function DeploymentSimulatorExperiment() {
  const [state, setState] = useState<DeployState>("idle");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [buildProgress, setBuildProgress] = useState<number>(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleRunDeployment = () => {
    if (state === "running") return;

    clearTimers();
    setState("running");
    setCurrentStepIndex(0);
    setBuildProgress(0);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Immediate completion
      setCurrentStepIndex(4);
      setBuildProgress(100);
      setState("completed");
      return;
    }

    // Step 1: Backup (500ms)
    const t1 = setTimeout(() => {
      setCurrentStepIndex(1);

      // Step 2: Dependencies (600ms)
      const t2 = setTimeout(() => {
        setCurrentStepIndex(2);

        // Step 3: Build progress animation
        const p1 = setTimeout(() => setBuildProgress(35), 200);
        const p2 = setTimeout(() => setBuildProgress(70), 450);
        const p3 = setTimeout(() => setBuildProgress(100), 700);
        timersRef.current.push(p1, p2, p3);

        const t3 = setTimeout(() => {
          setCurrentStepIndex(3);

          // Step 4: Validating (500ms)
          const t4 = setTimeout(() => {
            setCurrentStepIndex(4);

            // Step 5: Reload PM2 (600ms)
            const t5 = setTimeout(() => {
              setState("completed");
            }, 600);
            timersRef.current.push(t5);
          }, 500);
          timersRef.current.push(t4);
        }, 900);
        timersRef.current.push(t3);
      }, 600);
      timersRef.current.push(t2);
    }, 500);

    timersRef.current.push(t1);
  };

  const handleReset = () => {
    clearTimers();
    setState("idle");
    setCurrentStepIndex(-1);
    setBuildProgress(0);
  };

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-white/[0.14]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              04
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider">
              SIMULATION
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
            <Terminal className="w-2.5 h-2.5 text-zinc-400" />
            <span>deploy.sh</span>
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
          DEPLOYMENT PIPELINE
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Simulate a zero-downtime production deployment with automated health checks.
        </p>

        {/* Action Trigger */}
        <div className="mb-3.5">
          {state === "idle" && (
            <button
              type="button"
              onClick={handleRunDeployment}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 font-mono text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span>RUN DEPLOYMENT</span>
            </button>
          )}

          {state === "running" && (
            <button
              type="button"
              disabled
              className="w-full py-2 px-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-mono text-xs flex items-center justify-center gap-2 cursor-wait"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Executing deployment steps...</span>
            </button>
          )}

          {state === "completed" && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
              <span>RUN AGAIN</span>
            </button>
          )}
        </div>

        {/* Simulated Terminal Window Output */}
        <div className="rounded-xl bg-[#08090e] border border-zinc-800/80 p-3.5 font-mono text-xs text-zinc-300 min-h-[175px]">
          <div className="text-zinc-500 text-[11px] mb-2 border-b border-zinc-850 pb-1 flex items-center justify-between">
            <span className="text-emerald-400/90">$ ./deploy.sh</span>
            <span className="text-[10px] text-zinc-600 uppercase">Non-destructive</span>
          </div>

          {state === "idle" && (
            <div className="py-6 text-center text-zinc-600 text-xs">
              Click <span className="text-zinc-400">RUN DEPLOYMENT</span> to start the pipeline simulation.
            </div>
          )}

          {(state === "running" || state === "completed") && (
            <div className="space-y-2 text-xs">
              {INITIAL_STAGES.map((stg, idx) => {
                if (idx > currentStepIndex) return null;
                const isStepDone = idx < currentStepIndex || state === "completed";
                const isCurrentActive = idx === currentStepIndex && state === "running";

                return (
                  <div key={stg.step} className="space-y-0.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>
                        <span className="text-zinc-500 mr-1.5">{stg.step}</span>
                        {stg.label}
                      </span>
                      {isCurrentActive && idx !== 2 && (
                        <span className="text-emerald-400 animate-pulse text-[11px]">in progress...</span>
                      )}
                    </div>

                    {/* Step 3 Progress Bar */}
                    {idx === 2 ? (
                      <div className="pl-4 py-0.5 flex items-center gap-2">
                        <span className="text-emerald-400 text-xs tracking-wider">
                          {"█".repeat(Math.floor(buildProgress / 5))}
                          {"░".repeat(20 - Math.floor(buildProgress / 5))}
                        </span>
                        <span className="text-zinc-400 text-[11px] font-semibold">{buildProgress}%</span>
                      </div>
                    ) : (
                      isStepDone && (
                        <div className="pl-4 text-emerald-400 text-[11px]">
                          ✓ Complete
                        </div>
                      )
                    )}
                  </div>
                );
              })}

              {state === "completed" && (
                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 space-y-1 animate-in fade-in duration-300">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>DEPLOYMENT COMPLETE</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 pl-5">
                    Build validated successfully. Application reloaded.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Mocked bash deployment routine</span>
        <span className="text-zinc-600">PM2 cluster target</span>
      </div>
    </div>
  );
}
