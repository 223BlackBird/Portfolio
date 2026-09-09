import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { footer, hero, contact } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080c] py-12 text-zinc-400 text-xs">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-semibold text-zinc-200">
                {footer.copyrightName}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="font-mono text-zinc-500">
                © {currentYear}
              </span>
            </div>
            <p className="text-zinc-500 max-w-md">
              {footer.techStackNote}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{footer.statusText}</span>
            </div>

            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition-colors font-mono"
              aria-label="Back to top"
            >
              <span>top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
