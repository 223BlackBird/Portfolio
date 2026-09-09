import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { DynamicIcon } from "../ui/IconHelper";

export function WhatIDo() {
  const { whatIDo } = portfolioData;

  return (
    <section id="capabilities" className="py-20 md:py-28 border-b border-white/[0.06] bg-[#0b0c13]/50">
      <Container>
        <SectionHeading
          badge={whatIDo.badge}
          title={whatIDo.title}
          subtitle={whatIDo.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whatIDo.items.map((item) => (
            <div
              key={item.id}
              className="group p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] hover:border-emerald-500/40 hover:bg-zinc-900/80 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-colors mb-4">
                  <DynamicIcon name={item.iconName} className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/[0.04] flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950/60 text-zinc-400 border border-zinc-800/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
