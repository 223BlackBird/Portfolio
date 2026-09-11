import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FeaturedWorkCard } from "@/components/sections/FeaturedWorkCard";
import { ExploringSnapshot } from "@/components/sections/ExploringSnapshot";

import { portfolioData } from "@/data/portfolio";
import { DynamicIcon } from "@/components/ui/IconHelper";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Production software engineering work, backend architectures, database engineering, and test automation frameworks by Ayush P Vinod.",
};

export default function WorkPage() {
  const { whatIDo } = portfolioData;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Page Header */}
        <PageHero
          badge="PORTFOLIO & CASE STUDIES"
          title="Engineering Work & Systems"
          description="A showcase of production software engineering, backend architectures, automated test suites, and infrastructure delivery."
        />

        {/* Flagship Case Study Section */}
        <section className="py-16 md:py-24 border-b border-white/[0.06] bg-[#090a0f]">
          <Container>
            <div className="mb-10 space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Primary Case Study
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Flagship Project
              </h2>
            </div>

            <FeaturedWorkCard />
          </Container>
        </section>

        {/* Engineering Capabilities / Areas of Practice */}
        <section className="py-20 md:py-28 border-b border-white/[0.06] bg-[#0b0c13]/50">
          <Container>
            <div className="max-w-2xl space-y-3 mb-14">
              <Badge variant="accent" size="sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                <span>HOW I ENGINEER</span>
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {whatIDo.title}
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                {whatIDo.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Currently Exploring Section */}
        <ExploringSnapshot />

      </main>
      <Footer />
    </>
  );
}
