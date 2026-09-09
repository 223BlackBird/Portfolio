"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const { navigation, hero } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detector based on scroll position
      const sections = navigation.map((item) => item.href.replace("#", ""));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-5"
      }`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-zinc-900/80 border border-white/[0.08] backdrop-blur-xl shadow-lg shadow-black/30">
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-zinc-100 focus:outline-none pl-1"
            aria-label={`${hero.name} Home`}
          >
            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-800 border border-zinc-700/80 group-hover:border-emerald-500/50 transition-colors font-mono text-xs font-semibold text-emerald-400">
              {">_"}
            </span>
            <span className="font-semibold tracking-tight text-base sm:text-lg">
              {hero.name}
              <span className="text-emerald-400">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-1.5"
            aria-label="Main Navigation"
          >
            {navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "text-emerald-400 bg-emerald-950/60 border border-emerald-800/60"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

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
          <div className="md:hidden mt-3 pt-3 pb-4 px-3 rounded-2xl bg-zinc-900/95 border border-zinc-800/90 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/60 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-zinc-600">→</span>
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-zinc-800/80 flex items-center justify-between px-3">
                <span className="text-xs text-zinc-400 font-mono">
                  {hero.statusBadge.text}
                </span>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:underline"
                >
                  Reach out <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
