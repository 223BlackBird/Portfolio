import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Sparkles, ArrowRight } from "lucide-react";

export function ExploringSnapshot() {
  const { skills } = portfolioData;

  return (
    <section className="py-20 md:py-28 border-b border-white/[0.06] bg-[#0b0c13]/40 relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <Badge variant="accent" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
              <span>ACTIVE LEARNING & HORIZONS</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Currently Exploring
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Tools, systems, and practices I am currently learning and
              experimenting with outside my primary day-to-day stack.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors self-start md:self-auto group"
          >
            <span>Learn more about my background</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.categories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-mono text-sm font-semibold tracking-wider text-emerald-400 uppercase">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                    Exploring
                  </span>
                </div>

                {category.description && (
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {category.description}
                  </p>
                )}

                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 flex flex-col gap-1.5"
                    >
                      <span className="font-medium text-zinc-200 text-sm">
                        {skill.name}
                      </span>
                      {skill.focus && (
                        <span className="text-xs font-mono text-zinc-500">
                          {skill.focus}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-white/[0.04] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                <span>Status: In progress</span>
                <span className="text-emerald-400">●</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
