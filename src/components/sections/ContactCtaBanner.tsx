import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { ArrowRight, Mail } from "lucide-react";

export function ContactCtaBanner() {
  const { contact } = portfolioData;

  return (
    <section className="py-20 md:py-28 relative bg-grid-pattern bg-radial-vignette">
      <Container size="default">
        <div className="rounded-3xl bg-gradient-to-b from-[#11131c] to-[#090a0f] border border-white/[0.08] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle green ambient blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 inline-block">
              GET IN TOUCH
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {contact.title}
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              {contact.subtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-950/40 font-mono"
              >
                <span>Initiate Contact</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`mailto:${contact.directEmail}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{contact.directEmail}</span>
              </a>
            </div>

            <div className="pt-2 text-xs font-mono text-zinc-500">
              {contact.statusText}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
