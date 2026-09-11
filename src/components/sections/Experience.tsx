import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-white/[0.06] relative">
      <Container>
        <SectionHeading
          badge={experience.badge}
          title={experience.title}
          subtitle={experience.subtitle}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-8 top-3 bottom-3 w-[1px] bg-gradient-to-b from-emerald-500/50 via-zinc-800 to-transparent" />

          <div className="space-y-12">
            {experience.items.map((item) => (
              <div key={item.id} className="relative flex items-start gap-6 md:gap-10">
                {/* Timeline node */}
                <div className="relative z-10 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-zinc-950 border-2 border-emerald-500/80 shrink-0 mt-1 shadow-lg shadow-emerald-950/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                {/* Experience Card */}
                <div className="flex-1 p-6 md:p-8 rounded-2xl bg-zinc-900/40 border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-zinc-100">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-emerald-400 font-medium text-sm">
                          {item.company}
                        </span>
                        {item.isCurrent && (
                          <Badge variant="accent" size="sm">
                            Present
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Projects Worked On */}
                  {item.projects && item.projects.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                        Projects Worked On:
                      </div>
                      <ul className="space-y-2">
                        {item.projects.map((project, idx) => (
                          <li
                            key={idx}
                            className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500/80 mt-0.5 shrink-0" />
                            <span className="leading-relaxed font-semibold">{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="pt-4 border-t border-white/[0.04] flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 text-zinc-400 border border-zinc-800/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
