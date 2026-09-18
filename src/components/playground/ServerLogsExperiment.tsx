"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";
import type { ServerLogEntry } from "@/lib/server-logs";

export function ServerLogsExperiment() {
  const [logs, setLogs] = useState<ServerLogEntry[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userAtBottomRef = useRef<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);

  // Poll for new server logs at a gentle 1.5s interval
  useEffect(() => {
    let isMounted = true;

    const fetchLogs = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        const res = await fetch("/api/playground/logs");
        if (!res.ok) {
          if (isMounted) setIsError(true);
          return;
        }

        const data = await res.json();
        if (isMounted && data.ok && Array.isArray(data.logs)) {
          setIsError(false);

          setLogs((prevLogs) => {
            const existingIds = new Set(prevLogs.map((l) => l.id));
            const newEntries: ServerLogEntry[] = data.logs.filter(
              (incoming: ServerLogEntry) => !existingIds.has(incoming.id)
            );

            if (newEntries.length === 0) {
              return prevLogs;
            }

            // Append new entries and retain a bounded window of 50 logs
            const updated = [...prevLogs, ...newEntries];
            return updated.slice(-50);
          });
        }
      } catch {
        if (isMounted) setIsError(true);
      } finally {
        isFetchingRef.current = false;
      }
    };

    // Initial fetch
    fetchLogs();
    const interval = setInterval(fetchLogs, 1500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Smart auto-scroll: lock to bottom only if visitor is already near the bottom
  useEffect(() => {
    if (userAtBottomRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
    userAtBottomRef.current = atBottom;
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "INFO":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-800/50";
      case "WARN":
        return "text-amber-400 bg-amber-950/40 border-amber-800/50";
      case "ERROR":
        return "text-rose-400 bg-rose-950/40 border-rose-800/50";
      default:
        return "text-zinc-400 bg-zinc-900 border-zinc-800";
    }
  };

  return (
    <div className="rounded-2xl bg-[#0b0c12] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full transition-colors hover:border-white/[0.14]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              02
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
              LIVE
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
            <Terminal className="w-2.5 h-2.5 text-zinc-400" />
            <span>OBSERVABILITY</span>
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">
          SERVER LOGS
        </h3>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Real-time stream of public backend application events emitted by API operations.
        </p>

        {/* Structured Log Terminal Box */}
        <div className="relative rounded-xl bg-[#08090e] border border-zinc-800/80 overflow-hidden font-mono text-xs">
          {/* Table Header Columns */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-zinc-950/80 border-b border-zinc-800/60 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider select-none">
            <div className="col-span-3 sm:col-span-2">TIME</div>
            <div className="col-span-2 sm:col-span-2">LEVEL</div>
            <div className="col-span-7 sm:col-span-5">EVENT</div>
            <div className="hidden sm:block sm:col-span-3 text-right">RESULT</div>
          </div>

          {/* Log Stream Body */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            tabIndex={0}
            aria-label="Server Logs Stream"
            className="p-3 space-y-2 overflow-y-auto overflow-x-auto min-h-[220px] max-h-[280px] focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          >
            {isError ? (
              <div className="flex items-center justify-center h-44 text-zinc-500 text-xs italic font-mono">
                LOG STREAM UNAVAILABLE
              </div>
            ) : logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-44 text-zinc-500 text-xs italic font-mono space-y-1">
                <span>WAITING FOR SERVER ACTIVITY...</span>
                <span className="text-[10px] text-zinc-600 not-italic">
                  Events will appear naturally as API requests are executed.
                </span>
              </div>
            ) : (
              logs.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-12 gap-2 items-center text-[11px] py-0.5 border-b border-white/[0.02] last:border-0"
                >
                  {/* Timestamp */}
                  <span className="col-span-3 sm:col-span-2 text-zinc-500 whitespace-nowrap">
                    {entry.timeDisplay}
                  </span>

                  {/* Level Badge */}
                  <div className="col-span-2 sm:col-span-2">
                    <span
                      className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold border ${getLevelBadgeClass(
                        entry.level
                      )}`}
                    >
                      {entry.level}
                    </span>
                  </div>

                  {/* Event Message */}
                  <span className="col-span-7 sm:col-span-5 text-zinc-200 truncate" title={entry.message}>
                    {entry.message}
                  </span>

                  {/* Result Detail */}
                  <span
                    className="hidden sm:block sm:col-span-3 text-right text-zinc-400 truncate text-[10px]"
                    title={entry.result}
                  >
                    {entry.result ?? "—"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>Instance observability · Ephemeral in-memory stream</span>
        <span className="text-zinc-600">Passive stream</span>
      </div>
    </div>
  );
}
