import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ApiResponseExperiment } from "@/components/playground/ApiResponseExperiment";
import { QueryPipelineExperiment } from "@/components/playground/QueryPipelineExperiment";
import { RetryPolicyExperiment } from "@/components/playground/RetryPolicyExperiment";
import { DeploymentSimulatorExperiment } from "@/components/playground/DeploymentSimulatorExperiment";
import { DebuggingScenariosExperiment } from "@/components/playground/DebuggingScenariosExperiment";

export const metadata: Metadata = {
  title: "Engineering Playground — Ayush.dev",
  description:
    "Interactive engineering experiments covering APIs, databases, debugging, automation and deployment.",
};

export default function PlaygroundPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Editorial Compact Header */}
        <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-14 border-b border-white/[0.06] bg-grid-pattern bg-radial-vignette overflow-hidden">
          <Container size="wide">
            <div className="max-w-3xl space-y-4">
              {/* Status Indicator & Kicker */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>INTERACTIVE</span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  ENGINEERING PLAYGROUND
                </span>
              </div>

              {/* Editorial Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                Small experiments from backend systems, automation and deployment.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                Explore → break things → see what happens.
              </p>
            </div>
          </Container>
        </section>

        {/* Experiments Grid Section */}
        <section className="py-10 sm:py-14 bg-[#090a0f]">
          <Container size="wide">
            <div className="space-y-6">
              {/* Row 1: API Response & Database Query Pipeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ApiResponseExperiment />
                <QueryPipelineExperiment />
              </div>

              {/* Row 2: Retry Policy & Deployment Pipeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RetryPolicyExperiment />
                <DeploymentSimulatorExperiment />
              </div>

              {/* Row 3: Debugging Scenarios (Signature Lab) */}
              <div>
                <DebuggingScenariosExperiment />
              </div>
            </div>

            {/* Understated Editorial Footer Detail */}
            <div className="mt-14 pt-8 border-t border-white/[0.06] text-center">
              <p className="text-xs font-mono text-zinc-500 tracking-wide">
                Built to experiment. Not to pretend.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
