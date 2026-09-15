"use client";

import React, { useState } from "react";
import { ChevronRight, Database, Info } from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  badge: string;
  summary: string;
  details: Array<{ label: string; value: string }>;
}

const STAGES: PipelineStage[] = [
  {
    id: "query",
    name: "QUERY",
    badge: "01",
    summary: "Raw SQL query received over client TCP socket connection.",
    details: [
      { label: "Protocol", value: "PostgreSQL Frontend/Backend v3.0" },
      { label: "Client state", value: "Ready for query" },
      { label: "Parameters", value: "Bound and sanitized" },
    ],
  },
  {
    id: "parser",
    name: "PARSER",
    badge: "02",
    summary: "Converts SQL string into an Abstract Syntax Tree (AST).",
    details: [
      { label: "Grammar", value: "Validated against SQL grammar" },
      { label: "Relations", value: "Table 'users' catalog lookup confirmed" },
      { label: "Output", value: "Query tree structure generated" },
    ],
  },
  {
    id: "planner",
    name: "QUERY PLANNER",
    badge: "03",
    summary: "Evaluates cost of available execution paths using table statistics.",
    details: [
      { label: "Planner chose", value: "Index Scan" },
      { label: "Reason", value: "Selective WHERE condition" },
      { label: "Alternative rejected", value: "Seq Scan (cost too high)" },
    ],
  },
  {
    id: "index_scan",
    name: "INDEX SCAN",
    badge: "04",
    summary: "Traverses B-Tree index to locate row identifiers (TIDs) matching predicate.",
    details: [
      { label: "Index used", value: "users_active_idx" },
      { label: "Rows scanned", value: "128" },
      { label: "Rows returned", value: "24" },
    ],
  },
  {
    id: "postgresql",
    name: "POSTGRESQL",
    badge: "05",
    summary: "Reads heap pages for matching pointers and applies MVCC visibility checks.",
    details: [
      { label: "Engine", value: "Storage engine heap access" },
      { label: "Snapshot", value: "Transaction isolation verified" },
      { label: "Buffer cache", value: "Cache hit (0 physical disk reads)" },
    ],
  },
  {
    id: "result",
    name: "RESULT",
    badge: "06",
    summary: "Serializes matched tuple rows into wire format and returns to client.",
    details: [
      { label: "Output count", value: "24 active user records" },
      { label: "Status", value: "CommandComplete (SELECT 24)" },
      { label: "Format", value: "Binary row serialization" },
    ],
  },
];

export function QueryPipelineExperiment() {
  const [activeStageId, setActiveStageId] = useState<string>("index_scan");

  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[3];

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-white/[0.14]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              EXPERIMENT 02
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider">
              DATABASE ENGINE
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
            <Database className="w-2.5 h-2.5 text-zinc-400" />
            <span>EXPLAIN</span>
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
          QUERY PIPELINE
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Step through how a relational database plans and executes queries.
        </p>

        {/* SQL Statement Display */}
        <div className="rounded-xl bg-[#08090e] border border-zinc-800/80 p-3 font-mono text-xs text-zinc-300 mb-3.5">
          <div className="text-[10px] uppercase text-zinc-500 mb-1 font-semibold">
            Input Query
          </div>
          <div className="text-emerald-400/90">
            SELECT <span className="text-zinc-400">*</span>
          </div>
          <div className="pl-3 text-zinc-300">
            FROM <span className="text-zinc-100">users</span>
          </div>
          <div className="pl-3 text-zinc-300">
            WHERE <span className="text-emerald-400">active</span> = <span className="text-amber-400">true</span>;
          </div>
        </div>

        {/* Interactive Conceptual Pipeline Navigator */}
        <div className="mb-3.5">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Execution Pipeline (click to inspect)</span>
            <span className="text-zinc-600">6 stages</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-zinc-950/70 border border-zinc-800/60 font-mono text-[11px]">
            {STAGES.map((stage, idx) => {
              const isSelected = stage.id === activeStageId;
              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    onClick={() => setActiveStageId(stage.id)}
                    aria-pressed={isSelected}
                    className={`px-2 py-1 rounded transition-all flex items-center gap-1 text-[11px] ${
                      isSelected
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm font-semibold"
                        : "text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 hover:bg-zinc-800/60 border border-zinc-800/50"
                    }`}
                  >
                    <span className="text-[9px] text-zinc-500">{stage.badge}</span>
                    <span>{stage.name}</span>
                  </button>
                  {idx < STAGES.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-zinc-700 shrink-0 hidden sm:inline" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Inspector */}
        <div className="rounded-xl bg-zinc-950/90 border border-zinc-800/80 p-3.5 font-mono text-xs">
          <div className="flex items-center justify-between gap-2 border-b border-zinc-800/60 pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-semibold text-zinc-100 text-xs">
                Stage {currentStage.badge}: {currentStage.name}
              </span>
            </div>
            <span className="text-[10px] text-zinc-500">Inspection panel</span>
          </div>

          <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
            {currentStage.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentStage.details.map((item, dIdx) => (
              <div
                key={dIdx}
                className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60"
              >
                <span className="text-[10px] text-zinc-500 block">
                  {item.label}:
                </span>
                <span className="text-zinc-200 font-medium text-xs">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-zinc-600" />
          <span>Educational abstraction</span>
        </span>
        <span className="text-zinc-600">PostgreSQL planning model</span>
      </div>
    </div>
  );
}
