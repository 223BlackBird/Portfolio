import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

import { portfolioData } from "@/data/portfolio";
import { CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Engineering Philosophy",
  description:
    "Engineering philosophy, core values, technical mindset, and active learning areas of Ayush P Vinod.",
};

export default function AboutPage() {
  const { about, skills } = portfolioData;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Page Hero */}
        <PageHero
          badge="ABOUT & PHILOSOPHY"
          title={about.title}
          description={about.subtitle}
        />

        {/* Narrative & Highlights Section */}
        <section className="py-20 md:py-28 border-b border-white/[0.06] bg-[#090a0f]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Narrative Story */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  Background & Mindset
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Building Systems that Just Work
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                  {about.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Highlights Bar */}
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {about.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06]"
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

              {/* Right Column: 4 Principles */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                  Core Engineering Values
                </span>
                <div className="space-y-3">
                  {about.principles.map((principle) => (
                    <div
                      key={principle.title}
                      className="p-5 rounded-xl bg-zinc-900/40 border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <h3 className="text-base font-semibold text-zinc-100">
                            {principle.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
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



      </main>
      <Footer />
    </>
  );
}
