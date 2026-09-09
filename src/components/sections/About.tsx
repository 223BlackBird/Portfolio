import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="py-20 md:py-28 border-b border-white/[0.06] relative">
      <Container>
        <SectionHeading
          badge={about.badge}
          title={about.title}
          subtitle={about.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative text */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {about.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-zinc-300">
                {paragraph}
              </p>
            ))}

            {/* Engineering Highlights Quick Stat Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {about.highlights.map((item) => (
                <div
                  key={item.label}
                  className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/[0.06]"
                >
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-zinc-200 mt-1 font-mono">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Principles Card Grid */}
          <div className="lg:col-span-5 space-y-3.5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Core Engineering Values
            </h3>
            <div className="space-y-3">
              {about.principles.map((principle) => (
                <div
                  key={principle.title}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-white/[0.06] hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-200">
                        {principle.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
