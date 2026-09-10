import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { ExternalLink, ArrowUpRight, CheckCircle, Terminal } from "lucide-react";
import { GithubIcon } from "../ui/IconHelper";

export function Projects() {
  const { projects } = portfolioData;

  const featuredProject = projects.items.find((p) => p.isFeatured);
  const regularProjects = projects.items.filter((p) => !p.isFeatured);

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-white/[0.06] bg-[#0b0c13]/60 relative">
      <Container>
        <SectionHeading
          badge={projects.badge}
          title={projects.title}
          subtitle={projects.subtitle}
        />

        {/* Featured Project Showcase */}
        {featuredProject && (
          <div className="mb-14 rounded-3xl bg-zinc-900/70 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Deep Context */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="accent" size="sm">
                      FEATURED FLAGSHIP
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {featuredProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-emerald-400/90 font-mono mt-1">
                      {featuredProject.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                    {featuredProject.description}
                  </p>

                  {/* Problem solved callout */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.05] space-y-1.5">
                    <div className="text-xs font-mono font-semibold uppercase text-zinc-400">
                      Problem Solved
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {featuredProject.problemSolved}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  {featuredProject.keyContributions && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        Key Engineering Highlights:
                      </div>
                      <ul className="space-y-1.5">
                        {featuredProject.keyContributions.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-1 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tech & Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {featuredProject.githubUrl && (
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium font-mono text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white border border-zinc-700 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {featuredProject.liveDemoUrl && (
                      <a
                        href={featuredProject.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium font-mono text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                      >
                        <span>Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Mockup / Architecture Preview */}
              <div className="lg:col-span-5 bg-[#08090e] border-t lg:border-t-0 lg:border-l border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <span className="font-mono text-xs text-zinc-500 ml-2">
                        {featuredProject.mockup?.tag || "ARCHITECTURE"}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">
                      LIVE SPEC
                    </span>
                  </div>

                  {featuredProject.mockup?.snippet && (
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 font-mono text-xs text-emerald-400/90 leading-relaxed overflow-x-auto whitespace-pre">
                      {featuredProject.mockup.snippet}
                    </div>
                  )}

                  {featuredProject.architectureHighlights && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                        ENGINEERING AREAS:
                      </div>
                      <div className="space-y-2">
                        {featuredProject.architectureHighlights.map((arch, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/[0.04] text-xs text-zinc-300 font-mono"
                          >
                            {arch}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.04] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                  <span>Status: Actively maintained</span>
                  <span className="text-emerald-400">●</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project) => (
            <div
              key={project.id}
              className="group p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] hover:border-emerald-500/40 hover:bg-zinc-900/70 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    {project.status}
                  </Badge>
                  {project.mockup?.tag && (
                    <span className="font-mono text-[10px] text-zinc-500">
                      {project.mockup.tag}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs font-mono text-emerald-400/90 mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Problem solved pill */}
                <div className="p-3 rounded-lg bg-zinc-950/60 border border-white/[0.04] text-xs text-zinc-300">
                  <span className="font-mono text-zinc-500 text-[10px] block uppercase">
                    Problem solved
                  </span>
                  <span className="mt-0.5 block">{project.problemSolved}</span>
                </div>

                {/* Code / Mockup Snippet */}
                {project.mockup?.snippet && (
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] text-zinc-300 overflow-x-auto whitespace-pre">
                    {project.mockup.snippet}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 text-zinc-400 border border-zinc-800/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                      aria-label={`${project.title} GitHub repo`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
                      aria-label={`${project.title} Live demo`}
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
