import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Badge } from "../ui/Badge";
import { ArrowRight, CheckCircle } from "lucide-react";

export function FeaturedWorkCard() {
  const project = portfolioData.projects.items.find((p) => p.isFeatured) || portfolioData.projects.items[0];

  if (!project) return null;

  return (
    <div className="rounded-3xl bg-[#0e1017]/85 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Deep Context */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent" size="sm">
                FLAGSHIP CASE STUDY
              </Badge>
              <span className="text-[11px] font-mono text-zinc-400">
                Australian Client
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-emerald-400 font-mono mt-1">
                {project.tagline}
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Problem Solved callout */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.05] space-y-1.5">
              <div className="text-xs font-mono font-semibold uppercase text-zinc-400">
                Problem Solved
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.problemSolved}
              </p>
            </div>

            {/* Key Contributions */}
            {project.keyContributions && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Key Engineering Contributions:
                </div>
                <ul className="space-y-2">
                  {project.keyContributions.slice(0, 3).map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-1 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Case Study Link */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            <Link
              href="/work/truewill"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-950/40 shrink-0"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Live Spec / Architecture Preview */}
        <div className="lg:col-span-5 bg-[#08090e] border-t lg:border-t-0 lg:border-l border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="font-mono text-xs text-zinc-500 ml-2">
                  {project.mockup?.tag || "ARCHITECTURE"}
                </span>
              </div>

            </div>

            {project.mockup?.snippet && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 font-mono text-xs text-emerald-400/90 leading-relaxed overflow-x-auto whitespace-pre shadow-inner">
                {project.mockup.snippet}
              </div>
            )}

            {project.architectureHighlights && (
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  CORE ENGINEERING AREAS:
                </div>
                <div className="space-y-2">
                  {project.architectureHighlights.map((arch, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/[0.04] text-xs text-zinc-300 font-mono"
                    >
                      {arch}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 mt-6 border-t border-white/[0.04] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
            <span>Status: Actively maintained</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
