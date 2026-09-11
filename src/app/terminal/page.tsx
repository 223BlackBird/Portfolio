"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { portfolioData } from "@/data/portfolio";
import { Terminal as TerminalIcon, RotateCcw } from "lucide-react";

interface HistoryEntry {
  command: string;
  output: string[];
}

export default function TerminalPage() {
  const { terminal } = portfolioData;
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    return terminal.initialCommands.map((cmdKey) => {
      const cmdObj = terminal.commands[cmdKey];
      return {
        command: cmdKey,
        output: cmdObj
          ? Array.isArray(cmdObj.output)
            ? cmdObj.output
            : [cmdObj.output]
          : [`Command not found: ${cmdKey}`],
      };
    });
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleExecute = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    const matchedCmd = terminal.commands[trimmed];
    let outputLines: string[];

    if (matchedCmd) {
      outputLines = Array.isArray(matchedCmd.output)
        ? matchedCmd.output
        : [matchedCmd.output];
    } else {
      outputLines = [
        `Command '${trimmed}' not recognized.`,
        `Type 'help' to see all supported commands.`,
      ];
    }

    setHistory((prev) => [...prev, { command: trimmed, output: outputLines }]);
    setInputVal("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecute(inputVal);
  };

  const handleQuickChip = (cmdKey: string) => {
    handleExecute(cmdKey);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setHistory([]);
  };

  const prevHistoryLengthRef = useRef(history.length);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length > prevHistoryLengthRef.current) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    prevHistoryLengthRef.current = history.length;
  }, [history]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Page Hero */}
        <PageHero
          badge="DEVELOPER SANDBOX"
          title="Interactive Terminal Console"
          description={terminal.subtitle}
        />

        <section className="py-16 md:py-24 bg-[#090a0f]">
          <Container size="narrow">
            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="text-xs font-mono text-zinc-500 mr-1">
                Quick run:
              </span>
              {Object.keys(terminal.commands).map((cmd) => (
                <button
                  type="button"
                  key={cmd}
                  onClick={() => handleQuickChip(cmd)}
                  className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900/90 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  ${cmd}
                </button>
              ))}
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900/50 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 border border-zinc-800/80 transition-colors flex items-center gap-1"
                title="Clear terminal"
              >
                <RotateCcw className="w-3 h-3" />
                <span>clear</span>
              </button>
            </div>

            {/* Terminal Window Chrome */}
            <div className="rounded-2xl bg-[#08090e] border border-white/[0.08] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  {/* <span className="ml-2 text-zinc-400 text-xs">
                    ayush@portfolio: ~ (bash)
                  </span> */}
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                  <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">interactive console</span>
                </div>
              </div>

              {/* Terminal Output Area */}
              <div
                ref={scrollContainerRef}
                className="p-6 space-y-4 min-h-[380px] max-h-[550px] overflow-y-auto leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((entry, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <span className="text-zinc-500">$</span>
                      <span>{entry.command}</span>
                    </div>
                    <div className="pl-4 text-zinc-300 space-y-1">
                      {entry.output.map((line, lIdx) => (
                        <div key={lIdx} className="whitespace-pre-wrap">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Command Input Line */}
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 pt-2"
                >
                  <span className="text-emerald-400 font-semibold">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type 'help' or any command..."
                    className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-600 focus:outline-none font-mono text-xs sm:text-sm"
                    aria-label="Terminal command input"
                  />
                </form>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 text-center text-xs font-mono text-zinc-500">
              Tip: Click any command chip above or type directly in the prompt.
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
