"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { DynamicIcon } from "../ui/IconHelper";
import { ArrowDown, ArrowUpRight, Activity } from "lucide-react";

export function Hero() {
  const { hero, contact } = portfolioData;
  const { techStackVisual } = hero;
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  // Filter for social links for hero
  const githubLink = contact.socialLinks.find((l) => l.name.toLowerCase() === "github");
  const linkedinLink = contact.socialLinks.find((l) => l.name.toLowerCase() === "linkedin");

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-32 lg:pb-24 xl:pt-36 xl:pb-28 min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-grid-pattern bg-radial-vignette border-b border-white/[0.06]"
    >
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left Column: Core Persona & Action */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
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
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-950/40"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <span>{hero.secondaryCta.label}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>

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

          {/* Right Column: Dedicated "Tech Stack / Capabilities" Hero Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0d0e15] border border-white/[0.08] shadow-2xl overflow-hidden code-glow transition-all">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-400">
                    stack.sys
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>{techStackVisual.environment}</span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                      {techStackVisual.badge}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      layer {activeLayerIndex + 1}/4
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-200">
                    {techStackVisual.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {techStackVisual.subtitle}
                  </p>
                </div>

                {/* Architecture Layers Interactive Stack */}
                <div className="space-y-2.5">
                  {techStackVisual.architectureLayers.map((layer, idx) => {
                    const isSelected = activeLayerIndex === idx;
                    return (
                      <button
                        type="button"
                        key={layer.layer}
                        onClick={() => setActiveLayerIndex(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-zinc-900/90 border-emerald-500/40 shadow-sm"
                            : "bg-zinc-950/40 border-white/[0.04] hover:bg-zinc-900/40 hover:border-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`font-mono text-xs font-medium ${
                              isSelected ? "text-emerald-400" : "text-zinc-400"
                            }`}
                          >
                            {layer.layer}
                          </span>
                          {layer.latency && (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                              {layer.latency}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.techs.map((tech) => (
                            <span
                              key={tech}
                              className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                                isSelected
                                  ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                                  : "bg-zinc-900/70 text-zinc-400 border border-zinc-800/70"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* System Metrics Footer */}
                <div className="pt-3 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center">
                  {techStackVisual.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-2 rounded-lg bg-zinc-950/60 border border-white/[0.03]"
                    >
                      <span className="block text-[10px] font-mono text-zinc-500 uppercase">
                        {metric.label}
                      </span>
                      <span className="block text-xs font-semibold text-zinc-200 font-mono mt-0.5">
                        {metric.value}
                      </span>
                      <span className="block text-[9px] text-zinc-500 truncate">
                        {metric.subtext}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
