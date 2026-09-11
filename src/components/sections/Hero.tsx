"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { DynamicIcon } from "../ui/IconHelper";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  const { hero, contact } = portfolioData;

  // Filter for social links for hero
  const githubLink = contact.socialLinks.find((l) => l.name.toLowerCase() === "github");
  const linkedinLink = contact.socialLinks.find((l) => l.name.toLowerCase() === "linkedin");

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-32 lg:pb-24 xl:pt-36 xl:pb-28 min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-grid-pattern bg-radial-vignette border-b border-white/[0.06]"
    >
      <Container className="w-full">
        <div className="max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="accent" size="md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{hero.statusBadge.text}</span>
              </Badge>
            </div>

            {/* Title & Role */}
            <div className="space-y-2">
              <p className="font-mono text-sm uppercase tracking-widest text-zinc-500">
                {hero.greeting}
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                {hero.name}
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-zinc-400">
                {hero.role}
              </h2>
            </div>

            {/* Tagline / Introduction */}
            <p className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl">
              {hero.tagline}
            </p>

            {/* Call to Actions & Social links */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-950/40"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <span>{hero.secondaryCta.label}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>

              {/* Social Channels */}
              <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-zinc-800">
                {githubLink && (
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <DynamicIcon name="Github" className="w-4 h-4" />
                  </a>
                )}
                {linkedinLink && (
                  <a
                    href={linkedinLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <DynamicIcon name="Linkedin" className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
