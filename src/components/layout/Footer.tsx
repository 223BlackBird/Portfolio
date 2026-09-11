import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "../ui/IconHelper";

export function Footer() {
  const { footer, contact } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080c] py-16 text-zinc-400 text-xs">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/[0.06]">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-100 group"
              aria-label="Ayush P Vinod Home"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-xs text-emerald-400">
                {">_"}
              </span>
              <span className="font-semibold tracking-tight text-base text-white">
                Ayush
                <span className="text-emerald-400 font-mono">.dev</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-sm max-w-md leading-relaxed font-normal">
              Backend-focused software engineer specializing in reliable APIs,
              PostgreSQL data engineering, and test automation.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{footer.statusText}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Explore
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Work & Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/terminal"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Terminal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Connect
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </Link>
              </li>
              {contact.socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
                  >
                    <DynamicIcon name={link.iconName} className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600 ml-auto" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px] font-mono">
          <div>
            © {currentYear} Ayush P Vinod. {footer.techStackNote}
          </div>
          <div>All rights reserved.</div>
        </div>
      </Container>
    </footer>
  );
}
