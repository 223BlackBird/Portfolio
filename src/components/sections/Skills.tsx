import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-white/[0.06] relative">
      <Container>
        <SectionHeading
          badge={skills.badge}
          title={skills.title}
          subtitle={skills.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                  <h3 className="font-mono text-sm font-semibold tracking-wider text-emerald-400 uppercase">
                    {category.name}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {category.skills.length} tools
                  </span>
                </div>

                {category.description && (
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                )}

                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 group-hover:bg-emerald-400 transition-colors" />
                        <span className="text-sm font-medium text-zinc-200">
                          {skill.name}
                        </span>
                      </div>
                      {skill.focus && (
                        <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                          {skill.focus}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 text-[10px] font-mono text-zinc-600 text-right">
                config: src/data/portfolio.ts
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
