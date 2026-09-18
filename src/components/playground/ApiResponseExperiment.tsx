"use client";

import React, { useState, useMemo } from "react";
import {
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Search,
  Server,
  Database,
  Globe,
  ArrowRight,
} from "lucide-react";

type RoleOption = "all" | "backend" | "automation" | "devops";
type StatusOption = "all" | "active" | "inactive";

interface ApiResponse {
  ok: boolean;
  count?: number;
  users?: Array<{
    name: string;
    role: string;
    active: boolean;
  }>;
  error?: string;
}

export function ApiResponseExperiment() {
  const [role, setRole] = useState<RoleOption>("all");
  const [status, setStatus] = useState<StatusOption>("all");
  const [name, setName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [httpStatus, setHttpStatus] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [recordCount, setRecordCount] = useState<number | null>(null);
  const [responsePayload, setResponsePayload] = useState<ApiResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showImplementation, setShowImplementation] = useState<boolean>(false);

  // Compute the live request URL matching current user filter selections
  const requestUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (role !== "all") {
      params.set("role", role);
    }
    if (status !== "all") {
      params.set("active", status === "active" ? "true" : "false");
    }
    const trimmedName = name.trim();
    if (trimmedName.length > 0) {
      params.set("name", trimmedName);
    }

    const queryString = params.toString();
    return `/api/playground/users${queryString ? `?${queryString}` : ""}`;
  }, [role, status, name]);

  const handleFetch = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setHttpStatus("REQUESTING...");
    const startTime = performance.now();

    try {
      const res = await fetch(requestUrl);
      const measuredLatency = Math.round(performance.now() - startTime);
      const data: ApiResponse = await res.json();

      setStatusCode(res.status);
      setLatency(measuredLatency);
      setResponsePayload(data);

      if (res.ok) {
        setHttpStatus("200 OK");
        setRecordCount(data.count ?? data.users?.length ?? 0);
      } else {
        setHttpStatus(`${res.status} ${res.statusText || "ERROR"}`);
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
        error: "Something went wrong while processing the request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const jsonString = useMemo(() => {
    if (!responsePayload) return null;
    return JSON.stringify(responsePayload, null, 2);
  }, [responsePayload]);

  const handleCopy = () => {
    if (!jsonString) return;
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-white/[0.14]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              01
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE API
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            HTTP/1.1
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
          LIVE API EXPLORER
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Manipulate safe query parameters and execute genuine backend queries against MongoDB Atlas.
        </p>

        {/* Filter Controls Bar */}
        <div className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/80 mb-3 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center justify-between">
            <span>Query Filters</span>
            <span className="text-zinc-600">Strict server validation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Role Filter */}
            <div>
              <label
                htmlFor="filter-role"
                className="block text-[11px] font-mono text-zinc-400 mb-1"
              >
                Role
              </label>
              <div className="relative">
                <select
                  id="filter-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as RoleOption)}
                  className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-emerald-500/50 appearance-none pr-7 cursor-pointer hover:border-zinc-700"
                >
                  <option value="all">All</option>
                  <option value="backend">backend</option>
                  <option value="automation">automation</option>
                  <option value="devops">devops</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label
                htmlFor="filter-status"
                className="block text-[11px] font-mono text-zinc-400 mb-1"
              >
                Status
              </label>
              <div className="relative">
                <select
                  id="filter-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as StatusOption)}
                  className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-emerald-500/50 appearance-none pr-7 cursor-pointer hover:border-zinc-700"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Name Search Filter */}
            <div>
              <label
                htmlFor="filter-name"
                className="block text-[11px] font-mono text-zinc-400 mb-1"
              >
                Name
              </label>
              <div className="relative">
                <input
                  id="filter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 30))}
                  placeholder="e.g. Alex"
                  maxLength={30}
                  className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 hover:border-zinc-700 pr-7"
                />
                <Search className="w-3.5 h-3.5 text-zinc-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Request Bar & Fetch Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 font-mono text-xs mb-3">
          <div className="flex items-center gap-2 overflow-x-auto min-w-0 flex-1 py-0.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
              GET
            </span>
            <span
              className="text-zinc-300 font-medium truncate select-all"
              title={requestUrl}
            >
              {requestUrl}
            </span>
          </div>

          <button
            type="button"
            id="fetch-button"
            onClick={handleFetch}
            disabled={isLoading}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm ${
              isLoading
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-[0.98] border border-emerald-400"
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>REQUESTING</span>
              </>
            ) : (
              <span>FETCH</span>
            )}
          </button>
        </div>

        {/* Live Response Metadata Strip */}
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
              {httpStatus ?? "READY TO FETCH"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Latency</span>
            <span className="text-zinc-200">
              {latency !== null ? `${latency}ms` : "—"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Records</span>
            <span className="text-zinc-200">
              {recordCount !== null ? `${recordCount} record${recordCount === 1 ? "" : "s"}` : "—"}
            </span>
          </div>
        </div>

        {/* Code Payload Box */}
        <div className="relative rounded-xl bg-[#08090e] border border-zinc-800/80 overflow-hidden font-mono text-xs mb-3">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950/60 border-b border-zinc-800/60 text-[11px] text-zinc-500">
            <span>RESPONSE / application/json</span>
            {jsonString && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                aria-label="Copy JSON payload"
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
          <pre className="p-3 text-zinc-300 overflow-x-auto leading-relaxed text-xs min-h-[120px] max-h-[220px]">
            <code>
              {jsonString ?? (
                <span className="text-zinc-600 italic">
                  Press [ FETCH ] to send a real query to the Next.js backend and MongoDB Atlas.
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
                  <Globe className="w-3 h-3 text-zinc-400" /> Browser
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                  <Server className="w-3 h-3 text-emerald-400" /> Next.js API
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                  <Database className="w-3 h-3 text-emerald-400" /> MongoDB Atlas
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  JSON response
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed pt-1">
                Requests are processed server-side with strict parameter whitelisting and bounded query limits. No raw database queries or credentials are ever exposed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Strip */}
      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Genuine live request</span>
        <span className="text-zinc-600">MongoDB Atlas backed</span>
      </div>
    </div>
  );
}
