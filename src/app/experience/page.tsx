import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

import { portfolioData } from "@/data/portfolio";
import { Calendar, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience & Timeline",
  description:
    "Professional software engineering experience, roles, responsibilities, and system contributions by Ayush P Vinod.",
};

export default function ExperiencePage() {
  const { experience } = portfolioData;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Page Hero */}
        <PageHero
          badge="CAREER TIMELINE"
          title="Experience & Contributions"
          description="A chronological look at my engineering work, technical responsibilities, and the production systems I've helped build."
        />

        {/* Timeline Section */}
        <section className="py-20 md:py-28 bg-[#090a0f]">
          <Container size="narrow">
            <div className="relative">
              {/* Vertical Timeline Track */}
              <div className="absolute left-4 md:left-8 top-4 bottom-4 w-[1px] bg-gradient-to-b from-emerald-500/50 via-zinc-800 to-transparent" />

              <div className="space-y-12">
                {experience.items.map((item) => (
                  <div key={item.id} className="relative flex items-start gap-6 md:gap-10">
                    {/* Timeline Node */}
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-zinc-950 border-2 border-emerald-500/80 shrink-0 mt-1 shadow-lg shadow-emerald-950/50">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>

                    {/* Experience Detail Card */}
                    <div className="flex-1 p-6 sm:p-8 rounded-2xl bg-[#0e1017] border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06]">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h2 className="text-xl sm:text-2xl font-bold text-white">
                              {item.role}
                            </h2>
                            {item.isCurrent && (
                              <Badge variant="accent" size="sm">
                                Present
                              </Badge>
                            )}
                          </div>
                          <p className="text-emerald-400 font-mono text-sm sm:text-base font-medium mt-1">
                            {item.company}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            {item.period}
                          </span>
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Overview Narrative */}
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Projects Worked On */}
                      {item.projects && item.projects.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                            Projects Worked On:
                          </div>
                          <ul className="space-y-3">
                            {item.projects.map((project, idx) => (
                              <li
                                key={idx}
                                className="text-xs sm:text-sm text-zinc-300 flex items-start gap-3"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span className="leading-relaxed font-normal font-semibold">
                                  {project}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Cross-Link Card to Truewill Case Study */}
                      <div className="p-4 rounded-xl bg-zinc-950/80 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                            Primary Project
                          </span>
                          <div className="text-sm font-semibold text-zinc-200">
                            Truewill Quality Management Platform
                          </div>
                        </div>
                        <Link
                          href="/work/truewill"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline"
                        >
                          <span>Read architectural case study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Technologies */}
                      <div className="pt-4 border-t border-white/[0.04] space-y-2">
                        <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                          Technologies Used:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
