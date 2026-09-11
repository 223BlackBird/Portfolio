import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export function ExperienceSnapshot() {
  const { experience } = portfolioData;
  const currentExperiences = experience.items.filter(item => item.isCurrent);

  if (currentExperiences.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-b border-white/[0.06] bg-[#090a0f] relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <Badge variant="accent" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
              <span>CAREER & CONTRIBUTIONS</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Professional Experience
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Engineering systems, automated test frameworks, and deployment
              workflows across production and staging environments.
            </p>
          </div>

          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors self-start md:self-auto group"
          >
            <span>View full timeline</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="space-y-6">
          {currentExperiences.map((currentExp) => (
            <div
              key={currentExp.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#0e1017]/80 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">
                      {currentExp.role}
                    </span>
                    {currentExp.isCurrent && (
                      <Badge variant="accent" size="sm">
                        Present
                      </Badge>
                    )}
                  </div>
                  <p className="text-emerald-400 font-mono text-sm mt-1">
                    {currentExp.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {currentExp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {currentExp.location}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal py-6">
                {currentExp.description}
              </p>

              <div className="pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {currentExp.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {currentExp.technologies.length > 6 && (
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900/50 text-zinc-500 border border-zinc-800/60">
                      +{currentExp.technologies.length - 6} more
                    </span>
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
