"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

type StatusCode = 200 | 404 | 500;

interface ResponseData {
  status: StatusCode;
  statusText: string;
  latency: string;
  payload: Record<string, unknown>;
}

const RESPONSES: Record<StatusCode, ResponseData> = {
  200: {
    status: 200,
    statusText: "OK",
    latency: "42ms",
    payload: {
      id: 42,
      name: "Ayush",
      role: "backend",
    },
  },
  404: {
    status: 404,
    statusText: "NOT FOUND",
    latency: "18ms",
    payload: {
      error: "User not found",
    },
  },
  500: {
    status: 500,
    statusText: "INTERNAL SERVER ERROR",
    latency: "156ms",
    payload: {
      error: "Something went wrong",
    },
  },
};

export function ApiResponseExperiment() {
  const [activeStatus, setActiveStatus] = useState<StatusCode>(200);
  const [copied, setCopied] = useState(false);

  const current = RESPONSES[activeStatus];
  const jsonString = JSON.stringify(current.payload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const getStatusColor = (status: StatusCode) => {
    switch (status) {
      case 200:
        return "text-emerald-400 bg-emerald-950/40 border-emerald-800/60";
      case 404:
        return "text-amber-400 bg-amber-950/40 border-amber-800/60";
      case 500:
        return "text-rose-400 bg-rose-950/40 border-rose-800/60";
    }
  };

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-white/[0.14]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              EXPERIMENT 01
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider">
              SIMULATED REQUEST
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            HTTP/1.1
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
          API RESPONSE
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          See how different API outcomes behave.
        </p>

        {/* Request Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 font-mono text-xs mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              GET
            </span>
            <span className="text-zinc-300 font-medium select-all">
              /api/users/42
            </span>
          </div>

          {/* Quick Outcome Controls */}
          <div className="flex items-center gap-1">
            {( [200, 404, 500] as StatusCode[] ).map((code) => {
              const isActive = activeStatus === code;
              return (
                <button
                  type="button"
                  key={code}
                  onClick={() => setActiveStatus(code)}
                  aria-pressed={isActive}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                    isActive
                      ? code === 200
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                        : code === 404
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60"
                  }`}
                >
                  {code} {code === 200 ? "OK" : code === 404 ? "NOT FOUND" : "ERROR"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Response Metadata Strip */}
        <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/50 text-[11px] font-mono text-zinc-400 mb-3">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Status</span>
            <span className={`font-semibold ${getStatusColor(current.status).split(" ")[0]}`}>
              {current.status} {current.statusText}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Latency</span>
            <span className="text-zinc-200">{current.latency}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Request</span>
            <span className="text-zinc-200">GET</span>
          </div>
        </div>

        {/* Code Payload Box */}
        <div className="relative rounded-xl bg-[#08090e] border border-zinc-800/80 overflow-hidden font-mono text-xs">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950/60 border-b border-zinc-800/60 text-[11px] text-zinc-500">
            <span>application/json</span>
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
          </div>
          <pre className="p-3 text-zinc-300 overflow-x-auto leading-relaxed text-xs">
            <code>{jsonString}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Deterministic mock response</span>
        <span className="text-zinc-600">no network call</span>
      </div>
    </div>
  );
}
