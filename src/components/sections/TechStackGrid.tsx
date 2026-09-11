import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";

export function TechStackGrid() {
  const { stackDomains, hero } = portfolioData;
  const { metrics } = hero.techStackVisual;

  return (
    <section
      id="stack"
      className="py-20 md:py-28 border-b border-white/[0.06] bg-[#090a0f] relative"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <Badge variant="accent" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
              <span>CORE ARCHITECTURE & SYSTEMS</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Core Engineering Stack
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Technologies and systems I actively build with, grouped by
              engineering domain. Focused on backend reliability, data
              integrity, and end-to-end automation.
            </p>
          </div>


        </div>

        {/* Stack Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackDomains.map((domain, index) => (
            <div
              key={domain.domain}
              className={`p-6 sm:p-7 rounded-2xl bg-[#0e1017]/80 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                    {domain.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {domain.techs.length} technologies
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {domain.domain}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {domain.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono text-zinc-200 bg-zinc-900/90 border border-zinc-800/90 group-hover:border-zinc-700/80 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering System Metrics */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-4 rounded-xl bg-zinc-950/40 border border-white/[0.04] text-left"
            >
              <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                {metric.label}
              </span>
              <span className="block text-base font-semibold text-zinc-100 font-mono mt-1">
                {metric.value}
              </span>
              <span className="block text-xs text-zinc-400 mt-0.5">
                {metric.subtext}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
