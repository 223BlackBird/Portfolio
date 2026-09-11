import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { portfolioData } from "@/data/portfolio";
import {
  CheckCircle2,
  Server,
  Database,
  Workflow,
  Cloud,
  Terminal,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Truewill Case Study | Quality Management Platform",
  description:
    "Technical case study on Truewill: backend APIs with Python/FastAPI, PostgreSQL schema engineering, Playwright test framework from scratch, and Docker/Linux CI/CD.",
};

export default function TruewillCaseStudyPage() {
  const project = portfolioData.projects.items.find((p) => p.slug === "truewill");

  if (!project || !project.caseStudy) {
    return null;
  }

  const { caseStudy } = project;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Page Hero */}
        <PageHero
          backLink={{ label: "Back to Work", href: "/work" }}
          badge="FLAGSHIP CASE STUDY"
          title="Truewill: Quality Management Platform"
          description={project.description}
        />



        {/* Deep Dive Content Container */}
        <section className="py-16 md:py-24 bg-[#090a0f]">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Main Content Body */}
              <div className="lg:col-span-8 space-y-16">
                {/* 1. Problem & Context */}
                <div className="space-y-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                    01 / Problem & Context
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Mission-Critical Workflow Integrity
                  </h2>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                    {caseStudy.problemContext}
                  </p>

                  <div className="p-4 rounded-xl bg-[#0e1017] border border-white/[0.06] mt-4 space-y-1.5">
                    <span className="text-xs font-mono font-semibold uppercase text-zinc-400">
                      Problem Solved
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {project.problemSolved}
                    </p>
                  </div>
                </div>

                {/* 2. Backend Architecture */}
                <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 shrink-0">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                        02 / Server-Side Architecture
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {caseStudy.sections.backend.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-zinc-300 leading-relaxed font-normal">
                    {caseStudy.sections.backend.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Technical Responsibilities:
                    </div>
                    <ul className="space-y-2.5">
                      {caseStudy.sections.backend.bulletPoints?.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3. Database Engineering */}
                <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 shrink-0">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                        03 / Persistence & Schemas
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {caseStudy.sections.database.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-zinc-300 leading-relaxed font-normal">
                    {caseStudy.sections.database.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      PostgreSQL & Migration Discipline:
                    </div>
                    <ul className="space-y-2.5">
                      {caseStudy.sections.database.bulletPoints?.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. Playwright Automation */}
                <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 shrink-0">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                        04 / Automated Testing
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {caseStudy.sections.automation.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-zinc-300 leading-relaxed font-normal">
                    {caseStudy.sections.automation.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Framework Architecture & Capabilities:
                    </div>
                    <ul className="space-y-2.5">
                      {caseStudy.sections.automation.bulletPoints?.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 5. DevOps & Infrastructure */}
                <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 shrink-0">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                        05 / Runtime & Delivery
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {caseStudy.sections.devops.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-zinc-300 leading-relaxed font-normal">
                    {caseStudy.sections.devops.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-[#0e1017] border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Infrastructure Operations:
                    </div>
                    <ul className="space-y-2.5">
                      {caseStudy.sections.devops.bulletPoints?.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Engineering Decisions */}
                <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                      06 / Architecture Trade-Offs
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                      Key Engineering Decisions
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {caseStudy.engineeringDecisions.map((dec, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-[#0e1017] border border-white/[0.06] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-emerald-400 uppercase">
                            {dec.area}
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-zinc-100">
                          {dec.decision}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                          {dec.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Outcomes & Impact */}
                <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                      07 / Verification & Impact
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                      Outcomes & Key Learnings
                    </h2>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1017] to-zinc-950 border border-emerald-500/20 space-y-3">
                    <ul className="space-y-3">
                      {caseStudy.outcomes.map((outcome, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-zinc-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar Sticky Panel: Spec, Tech & Actions */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
                {/* Live Spec Window */}
                <div className="rounded-2xl bg-[#0a0b10] border border-white/[0.08] overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-[11px] text-zinc-400">
                        truewill.spec
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      <span>SPEC</span>
                    </span>
                  </div>

                  <div className="p-4 space-y-4">
                    {project.mockup?.snippet && (
                      <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-emerald-400/90 leading-relaxed overflow-x-auto whitespace-pre">
                        {project.mockup.snippet}
                      </div>
                    )}

                    {project.architectureHighlights && (
                      <div className="space-y-2 pt-2">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                          ENGINEERING AREAS:
                        </div>
                        <div className="space-y-1.5">
                          {project.architectureHighlights.map((arch, i) => (
                            <div
                              key={i}
                              className="p-2 rounded-lg bg-zinc-900/60 border border-white/[0.04] text-[11px] text-zinc-300 font-mono"
                            >
                              {arch}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technology Stack Pill Card */}
                <div className="p-5 rounded-2xl bg-[#0e1017] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Technologies Used:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-200 bg-zinc-900 border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation CTA Box */}
                <div className="p-5 rounded-2xl bg-[#0e1017] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Actions
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                    >
                      <span>Discuss a Similar System</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/work"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Work Overview</span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
