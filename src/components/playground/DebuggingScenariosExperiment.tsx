"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, RotateCcw, HelpCircle } from "lucide-react";

interface Option {
  id: "A" | "B" | "C" | "D";
  text: string;
}

interface DebuggingScenario {
  id: number;
  title: string;
  problem: string;
  question: string;
  options: Option[];
  correctOptionId: "A" | "B" | "C" | "D";
  correctExplanation: {
    heading: string;
    subheading: string;
    steps?: string[];
    summary: string;
  };
  incorrectExplanation: {
    heading: string;
    subheading: string;
    summary: string;
  };
  principle: string;
}

const SCENARIOS: DebuggingScenario[] = [
  {
    id: 1,
    title: "PRODUCTION 500",
    problem: "The API works perfectly on localhost. Production returns HTTP 500.",
    question: "What do you check first?",
    options: [
      { id: "A", text: "Rewrite the endpoint" },
      { id: "B", text: "Increase server size" },
      { id: "C", text: "Check logs and reproduce the failure" },
      { id: "D", text: "Add Redis" },
    ],
    correctOptionId: "C",
    correctExplanation: {
      heading: "GOOD CALL.",
      subheading: "Start with evidence.",
      steps: [
        "1. Reproduce the issue",
        "2. Inspect application logs",
        "3. Check the request/error trace",
        "4. Identify the failing layer",
        "5. Fix the actual problem",
      ],
      summary: "Gather verifiable error traces before introducing code or infrastructure mutations.",
    },
    incorrectExplanation: {
      heading: "NOT THE FIRST MOVE.",
      subheading: "Before changing architecture, find evidence for the failure.",
      summary: "Guessing resource limits or rewriting code without examining server logs introduces unknown variables without solving root cause.",
    },
    principle: "Reproduce before changing things.",
  },
  {
    id: 2,
    title: "LATENCY SPIKE",
    problem: "An endpoint suddenly takes 4 seconds to respond.",
    question: "What do you check first?",
    options: [
      { id: "A", text: "Immediately add Redis caching" },
      { id: "B", text: "Measure and identify the bottleneck" },
      { id: "C", text: "Switch to a faster programming language" },
      { id: "D", text: "Add a load balancer" },
    ],
    correctOptionId: "B",
    correctExplanation: {
      heading: "GOOD CALL.",
      subheading: "Measure before optimizing.",
      steps: [
        "1. Profile database query durations",
        "2. Inspect external third-party API calls",
        "3. Check for serial blocking loops",
        "4. Profile payload serialization overhead",
      ],
      summary: "Pinpoint where the 4 seconds are actually spent before applying architectural patches.",
    },
    incorrectExplanation: {
      heading: "NOT THE FIRST MOVE.",
      subheading: "Before adding caches, identify what is slow.",
      summary: "Slapping Redis over an unprofiled endpoint masks underlying lock contention or connection pool starvation.",
    },
    principle: "Measure before optimizing.",
  },
  {
    id: 3,
    title: "FLAKY CI TEST",
    problem: "A Playwright test passes locally but randomly fails in CI.",
    question: "What do you check first?",
    options: [
      { id: "A", text: "Add arbitrary sleep(5000) everywhere" },
      { id: "B", text: "Inspect timing/state dependencies and CI logs" },
      { id: "C", text: "Delete the test from CI" },
      { id: "D", text: "Run tests with concurrency set to 100" },
    ],
    correctOptionId: "B",
    correctExplanation: {
      heading: "GOOD CALL.",
      subheading: "Isolate asynchronous timing and test isolation.",
      steps: [
        "1. Check for unawaited network idle or DOM transitions",
        "2. Verify test database state pollution between parallel workers",
        "3. Inspect CI runner CPU throttling compared to local dev machines",
      ],
      summary: "Flaky tests in CI are almost always caused by timing assumptions or shared mutable state.",
    },
    incorrectExplanation: {
      heading: "NOT THE FIRST MOVE.",
      subheading: "Fix root causality instead of symptom patching.",
      summary: "Arbitrary sleep calls bloat test runs and still fail when CI runner concurrency fluctuates.",
    },
    principle: "Fix the bottleneck, not the symptom.",
  },
  {
    id: 4,
    title: "BUILD FAILURE",
    problem: "A deployment fails during the build stage.",
    question: "What do you check first?",
    options: [
      { id: "A", text: "Force push without checking" },
      { id: "B", text: "Read the complete build error" },
      { id: "C", text: "Restart the production server" },
      { id: "D", text: "Reinstall the operating system" },
    ],
    correctOptionId: "B",
    correctExplanation: {
      heading: "GOOD CALL.",
      subheading: "Read the entire error message.",
      steps: [
        "1. Inspect compiler/bundler output log",
        "2. Identify missing environment variables or type mismatches",
        "3. Verify dependency lockfile consistency",
      ],
      summary: "The compiler invariably explains the exact file, line, and unsatisfied constraint causing the failure.",
    },
    incorrectExplanation: {
      heading: "NOT THE FIRST MOVE.",
      subheading: "The failure is in code compilation, not runtime servers.",
      summary: "Build failures occur before artifacts touch production; restarting servers won't fix syntax or type errors.",
    },
    principle: "Read the entire error message.",
  },
  {
    id: 5,
    title: "DEGRADING QUERY",
    problem: "A database query becomes significantly slower as data volume grows.",
    question: "What do you check first?",
    options: [
      { id: "A", text: "Inspect query plan and index usage" },
      { id: "B", text: "Upgrade database instance to largest tier" },
      { id: "C", text: "Shard the database across 5 servers" },
      { id: "D", text: "Stop using relational databases" },
    ],
    correctOptionId: "A",
    correctExplanation: {
      heading: "GOOD CALL.",
      subheading: "Inspect EXPLAIN ANALYZE output.",
      steps: [
        "1. Run EXPLAIN (ANALYZE, BUFFERS) on the query",
        "2. Check if the planner switched from Index Scan to Seq Scan",
        "3. Review table statistics and composite index ordering",
      ],
      summary: "A query that scales poorly usually suffers from missing indexes or stale table statistics.",
    },
    incorrectExplanation: {
      heading: "NOT THE FIRST MOVE.",
      subheading: "Hardware upgrades do not fix algorithmic table scans.",
      summary: "Throwing larger server instances or sharding at an unindexed full table scan increases cost without solving linear latency degradation.",
    },
    principle: "Fix the bottleneck, not the symptom.",
  },
];

export function DebuggingScenariosExperiment() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({});

  const scenario = SCENARIOS[currentIndex];
  const selectedOptionId = selectedAnswers[scenario.id];
  const isAnswered = selectedOptionId !== undefined;
  const isCorrect = isAnswered && selectedOptionId === scenario.correctOptionId;

  const handleSelectOption = (optionId: "A" | "B" | "C" | "D") => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [scenario.id]: optionId,
    }));
  };

  const handleResetCurrent = () => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[scenario.id];
      return next;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SCENARIOS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < SCENARIOS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 transition-colors hover:border-white/[0.14]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            EXPERIMENT 05
          </span>
          <span className="text-zinc-700">/</span>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            SIGNATURE LAB
          </span>
        </div>

        {/* Stepper Navigation */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-zinc-500 text-[11px]">
            SCENARIO {currentIndex + 1} OF {SCENARIOS.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
              aria-label="Previous scenario"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
              aria-label="Next scenario"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
        HOW WOULD YOU DEBUG THIS?
      </h3>
      <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
        Real backend problem solving. Choose the first move, inspect engineering reasoning, and discover core principles.
      </p>

      {/* Scenario Problem Box */}
      <div className="rounded-xl bg-[#08090e] border border-zinc-800/80 p-4 font-mono text-xs mb-4">
        <div className="flex items-center justify-between text-[10px] uppercase text-zinc-500 font-semibold mb-1.5">
          <span>THE PROBLEM</span>
          <span className="text-zinc-600">{scenario.title}</span>
        </div>
        <p className="text-zinc-100 text-sm font-sans font-medium mb-3 leading-snug">
          {scenario.problem}
        </p>
        <div className="text-xs text-emerald-400 font-mono font-medium flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{scenario.question}</span>
        </div>
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        {scenario.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isThisCorrect = opt.id === scenario.correctOptionId;

          let btnStyles = "text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800/80 border-zinc-800/80";

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyles = "bg-emerald-500/15 text-emerald-300 border-emerald-500/50 shadow-sm";
            } else if (isSelected && !isThisCorrect) {
              btnStyles = "bg-rose-500/15 text-rose-300 border-rose-500/40";
            } else {
              btnStyles = "text-zinc-600 bg-zinc-950/40 border-zinc-900 opacity-60";
            }
          }

          return (
            <button
              type="button"
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              className={`p-3 rounded-xl border text-left font-mono text-xs transition-all flex items-start gap-2.5 ${btnStyles}`}
            >
              <span
                className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-semibold shrink-0 ${
                  isSelected
                    ? isThisCorrect
                      ? "bg-emerald-400 text-zinc-950"
                      : "bg-rose-400 text-zinc-950"
                    : "bg-zinc-800 text-zinc-400 border border-zinc-700/60"
                }`}
              >
                {opt.id}
              </span>
              <span className="leading-snug pt-0.5">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Card (appears when answered) */}
      {isAnswered && (
        <div
          className={`rounded-xl p-4 font-mono text-xs border mb-4 animate-in fade-in duration-300 ${
            isCorrect
              ? "bg-emerald-950/20 border-emerald-800/50"
              : "bg-zinc-950/90 border-zinc-800/90"
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span
                className={`font-semibold tracking-wide text-xs ${
                  isCorrect ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {isCorrect
                  ? scenario.correctExplanation.heading
                  : scenario.incorrectExplanation.heading}
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetCurrent}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
              title="Reset answer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>

          <div className="text-zinc-300 text-xs font-semibold mb-2">
            {isCorrect
              ? scenario.correctExplanation.subheading
              : scenario.incorrectExplanation.subheading}
          </div>

          {isCorrect && scenario.correctExplanation.steps && (
            <div className="space-y-1 mb-2 pl-1 text-[11px] text-zinc-300">
              {scenario.correctExplanation.steps.map((step, sIdx) => (
                <div key={sIdx}>{step}</div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isCorrect
              ? scenario.correctExplanation.summary
              : scenario.incorrectExplanation.summary}
          </p>

          {/* Understated Engineering Principle */}
          <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              DEBUGGING PRINCIPLE
            </span>
            <span className="text-emerald-400 font-semibold">
              {scenario.principle}
            </span>
          </div>
        </div>
      )}

      {/* Footer Meta & Stepper */}
      <div className="pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Deterministic debugging heuristics</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNext}
            className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <span>Next scenario</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
