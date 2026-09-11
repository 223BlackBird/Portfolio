import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ValuesSnapshot() {
  const { about } = portfolioData;

  return (
    <section className="py-20 md:py-28 border-b border-white/[0.06] bg-[#0b0c13]/50 relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <Badge variant="accent" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
              <span>ENGINEERING PHILOSOPHY</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Pragmatic engineering with curiosity at the core
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Software development is more than writing code — it is about
              building dependable systems that solve real problems with
              predictability and maintainability.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors self-start md:self-auto group"
          >
            <span>Read full philosophy</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {about.principles.map((principle) => (
            <div
              key={principle.title}
              className="p-5 rounded-2xl bg-zinc-900/40 border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-200">
                  {principle.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
