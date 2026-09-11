"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { navigation, hero } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-5"
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0d0e15]/85 border border-white/[0.08] backdrop-blur-xl shadow-lg shadow-black/40">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-zinc-100 focus:outline-none pl-1"
            aria-label="Ayush P Vinod Home"
          >
            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-800/90 border border-zinc-700/80 group-hover:border-emerald-500/50 group-hover:bg-zinc-800 transition-colors font-mono text-xs font-semibold text-emerald-400">
              {">_"}
            </span>
            <span className="font-semibold tracking-tight text-base sm:text-lg">
              Ayush
              <span className="text-emerald-400 font-mono">.dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-1.5"
            aria-label="Main Navigation"
          >
            {navigation.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-mono transition-all ${
                    active
                      ? "text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Contact CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                pathname === "/contact"
                  ? "bg-emerald-400 text-zinc-950 font-semibold"
                  : "bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-emerald-500/40"
              }`}
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 hover:text-white focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 px-3 rounded-2xl bg-[#0d0e15]/95 border border-zinc-800/90 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium font-mono transition-colors flex items-center justify-between ${
                  pathname === "/"
                    ? "text-emerald-400 bg-emerald-950/40"
                    : "text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/60"
                }`}
              >
                <span>Home</span>
                <span className="font-mono text-xs text-zinc-600">01</span>
              </Link>

              {navigation.map((item, idx) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium font-mono transition-colors flex items-center justify-between ${
                      active
                        ? "text-emerald-400 bg-emerald-950/40"
                        : "text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-zinc-600">
                      0{idx + 2}
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium font-mono transition-colors flex items-center justify-between ${
                  pathname === "/contact"
                    ? "text-emerald-400 bg-emerald-950/40"
                    : "text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/60"
                }`}
              >
                <span>Contact</span>
                <span className="font-mono text-xs text-zinc-600">→</span>
              </Link>

              <div className="pt-3 mt-2 border-t border-zinc-800/80 flex items-center justify-between px-3">
                <span className="text-xs text-zinc-400 font-mono">
                  {hero.statusBadge.text}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
