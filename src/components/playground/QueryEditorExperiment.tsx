"use client";

import React, { useState } from "react";
import {
  Code,
  Database,
  Play,
  RotateCcw,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Server,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCode2,
} from "lucide-react";

type QueryMode = "json" | "sql";

const DEFAULT_JSON_QUERY = `{\n  "role": "backend",\n  "active": true\n}`;
const DEFAULT_SQL_QUERY = `SELECT * FROM users WHERE role = 'backend' AND active = true;`;

const JSON_PRESETS = [
  { label: "ALL", query: `{}` },
  { label: "BACKEND", query: `{\n  "role": "backend"\n}` },
  { label: "ACTIVE", query: `{\n  "active": true\n}` },
  { label: "BACKEND + ACTIVE", query: `{\n  "role": "backend",\n  "active": true\n}` },
  { label: "NAME", query: `{\n  "name": "alex"\n}` },
];

const SQL_PRESETS = [
  { label: "ALL", query: `SELECT * FROM users;` },
  { label: "BACKEND", query: `SELECT * FROM users WHERE role = 'backend';` },
  { label: "ACTIVE", query: `SELECT * FROM users WHERE active = true;` },
  { label: "BACKEND + ACTIVE", query: `SELECT * FROM users WHERE role = 'backend' AND active = true;` },
  { label: "NAME", query: `SELECT * FROM users WHERE name = 'alex';` },
];

interface QueryResponse {
  ok: boolean;
  mode?: "json" | "sql";
  count?: number;
  users?: Array<{
    name: string;
    role: string;
    active: boolean;
  }>;
  error?: string;
}

export function QueryEditorExperiment() {
  const [queryMode, setQueryMode] = useState<QueryMode>("json");
  const [queryText, setQueryText] = useState<string>(DEFAULT_JSON_QUERY);
  const [clientError, setClientError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [httpStatus, setHttpStatus] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [recordCount, setRecordCount] = useState<number | null>(null);
  const [responsePayload, setResponsePayload] = useState<QueryResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showImplementation, setShowImplementation] = useState<boolean>(false);

  const presets = queryMode === "json" ? JSON_PRESETS : SQL_PRESETS;

  const handleModeSwitch = (newMode: QueryMode) => {
    if (newMode === queryMode) return;
    setQueryMode(newMode);
    setQueryText(newMode === "json" ? DEFAULT_JSON_QUERY : DEFAULT_SQL_QUERY);
    setClientError(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setQueryText(val);

    if (queryMode === "json") {
      try {
        const parsed = JSON.parse(val);
        if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
          setClientError("Query must be a JSON object.");
        } else {
          setClientError(null);
        }
      } catch {
        setClientError("Please enter valid JSON.");
      }
    } else {
      // Basic SQL syntax check
      const trimmed = val.trim();
      if (!/^SELECT\b/i.test(trimmed)) {
        setClientError("SQL query must start with 'SELECT'.");
      } else if (!/\bFROM\s+users\b/i.test(trimmed)) {
        setClientError("Only queries against table 'users' are allowed.");
      } else {
        setClientError(null);
      }
    }
  };

  const handleSelectPreset = (presetQuery: string) => {
    setQueryText(presetQuery);
    setClientError(null);
  };

  const handleReset = () => {
    setQueryText(queryMode === "json" ? DEFAULT_JSON_QUERY : DEFAULT_SQL_QUERY);
    setClientError(null);
  };

  const handleRunQuery = async () => {
    if (isLoading) return;

    let payload: Record<string, unknown>;

    if (queryMode === "json") {
      try {
        const parsed = JSON.parse(queryText);
        if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
          setClientError("Query must be a JSON object.");
          return;
        }
        payload = { type: "json", query: parsed };
        setClientError(null);
      } catch {
        setClientError("Please enter valid JSON.");
        return;
      }
    } else {
      const trimmed = queryText.trim();
      if (!/^SELECT\b/i.test(trimmed) || !/\bFROM\s+users\b/i.test(trimmed)) {
        setClientError("Only queries of form 'SELECT * FROM users [WHERE ...]' are supported.");
        return;
      }
      payload = { type: "sql", sql: trimmed };
      setClientError(null);
    }

    setIsLoading(true);
    setHttpStatus("RUNNING...");
    const startTime = performance.now();

    try {
      const res = await fetch("/api/playground/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const measuredLatency = Math.round(performance.now() - startTime);
      const data: QueryResponse = await res.json();

      setStatusCode(res.status);
      setLatency(measuredLatency);
      setResponsePayload(data);

      if (res.ok) {
        setHttpStatus("200 OK");
        setRecordCount(data.count ?? data.users?.length ?? 0);
      } else {
        setHttpStatus(`${res.status} ${res.statusText || "BAD REQUEST"}`);
        setRecordCount(0);
      }
    } catch {
      const measuredLatency = Math.round(performance.now() - startTime);
      setStatusCode(500);
      setLatency(measuredLatency);
      setHttpStatus("500 INTERNAL ERROR");
      setRecordCount(0);
      setResponsePayload({
        ok: false,
        error: "Query could not be completed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const jsonString = responsePayload ? JSON.stringify(responsePayload, null, 2) : null;

  const handleCopy = () => {
    if (!jsonString) return;
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-white/[0.14]">
      <div>
        {/* Header with Payload Format Switcher */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              03
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider">
              QUERY TOOL
            </span>
          </div>

          {/* Switchable Dialect Segmented Toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => handleModeSwitch("json")}
              className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                queryMode === "json"
                  ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Code className="w-3 h-3" />
              <span>JSON</span>
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch("sql")}
              className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                queryMode === "sql"
                  ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Database className="w-3 h-3" />
              <span>SQL</span>
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
          QUERY EDITOR
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Switch between JSON and SQL syntax. The backend validates the input and translates it to a MongoDB query.
        </p>

        {/* Presets Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">Presets:</span>
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSelectPreset(preset.query)}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900/80 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800/80 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
            title="Reset to default query"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        </div>

        {/* Lightweight Monospace Query Textarea */}
        <div className="relative rounded-xl bg-zinc-950/90 border border-zinc-800/80 overflow-hidden font-mono text-xs mb-2">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950/70 border-b border-zinc-800/60 text-[11px] text-zinc-500 select-none">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
              <span>Query Payload ({queryMode.toUpperCase()})</span>
            </span>
            <span className="text-[10px] text-zinc-600">role · active · name</span>
          </div>

          <textarea
            value={queryText}
            onChange={handleTextChange}
            rows={5}
            spellCheck={false}
            aria-label={`${queryMode.toUpperCase()} Query Payload`}
            className="w-full bg-[#08090e] p-3 text-zinc-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/50 caret-emerald-400"
          />
        </div>

        {/* Client-side syntax warning if invalid */}
        {clientError && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 mb-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-[11px] font-mono text-amber-400">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{clientError}</span>
          </div>
        )}

        {/* Run Query Action Bar */}
        <div className="flex items-center justify-between gap-2.5 p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 font-mono text-xs mb-3">
          <div className="text-[11px] text-zinc-500 truncate px-1 flex items-center gap-1.5">
            <FileCode2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Mode:</span>
            <span className="px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold uppercase text-[10px]">
              {queryMode}
            </span>
            <span className="text-zinc-600">→ /api/playground/query</span>
          </div>

          <button
            type="button"
            id="run-query-btn"
            onClick={handleRunQuery}
            disabled={isLoading || Boolean(clientError)}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm ${
              isLoading || clientError
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] border border-emerald-400"
            }`}
          >
            <Play className={`w-3 h-3 ${isLoading ? "animate-spin" : "fill-current"}`} />
            <span>{isLoading ? "RUNNING..." : "RUN QUERY"}</span>
          </button>
        </div>

        {/* Results Metadata Bar */}
        <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/50 text-[11px] font-mono text-zinc-400 mb-3">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Status</span>
            <span
              className={`font-semibold ${
                statusCode === 200
                  ? "text-emerald-400"
                  : statusCode && statusCode >= 400
                  ? "text-rose-400"
                  : "text-zinc-400"
              }`}
            >
              {httpStatus ?? "READY TO RUN"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Latency</span>
            <span className="text-zinc-200">{latency !== null ? `${latency}ms` : "—"}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Records</span>
            <span className="text-zinc-200">
              {recordCount !== null ? `${recordCount} record${recordCount === 1 ? "" : "s"}` : "—"}
            </span>
          </div>
        </div>

        {/* Response Box */}
        <div className="relative rounded-xl bg-[#08090e] border border-zinc-800/80 overflow-hidden font-mono text-xs mb-3">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950/60 border-b border-zinc-800/60 text-[11px] text-zinc-500">
            <span>RESULT / application/json</span>
            {jsonString && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                aria-label="Copy result JSON"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 text-[10px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-[10px]">Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
          <pre className="p-3 text-zinc-300 overflow-x-auto leading-relaxed text-xs min-h-[110px] max-h-[190px]">
            <code>
              {jsonString ?? (
                <span className="text-zinc-600 italic">
                  Press [ RUN QUERY ] to execute your {queryMode.toUpperCase()} query against MongoDB.
                </span>
              )}
            </code>
          </pre>
        </div>

        {/* Expandable Implementation Disclosure */}
        <div className="border border-zinc-800/60 rounded-xl overflow-hidden bg-zinc-950/40">
          <button
            type="button"
            onClick={() => setShowImplementation(!showImplementation)}
            className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Server className="w-3 h-3 text-emerald-400/80" />
              <span>VIEW IMPLEMENTATION</span>
            </span>
            {showImplementation ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {showImplementation && (
            <div className="px-3 pb-3 pt-1 border-t border-zinc-800/50 font-mono text-[11px] text-zinc-400 space-y-2">
              <div className="flex flex-wrap items-center gap-1 text-zinc-300 pt-1">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                  {queryMode.toUpperCase()} Query
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                  <Server className="w-3 h-3 text-emerald-400" /> Next.js API
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Schema & Parser
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                  <Database className="w-3 h-3 text-emerald-400" /> MongoDB
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  JSON Response
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed pt-1">
                Both JSON and SQL dialects are safely compiled server-side into MongoDB filter criteria. No arbitrary operators or raw database commands can be injected.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Strip */}
      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Switchable JSON / SQL dialects</span>
        <span className="text-zinc-600">Hard limit: 20 records</span>
      </div>
    </div>
  );
}
