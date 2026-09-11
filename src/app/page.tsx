import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechStackGrid } from "@/components/sections/TechStackGrid";
import { FeaturedWorkCard } from "@/components/sections/FeaturedWorkCard";
import { ExperienceSnapshot } from "@/components/sections/ExperienceSnapshot";
import { ContactCtaBanner } from "@/components/sections/ContactCtaBanner";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Core Engineering Stack */}
        <TechStackGrid />

        {/* 3. Featured Work */}
        <section className="py-20 md:py-28 border-b border-white/[0.06] bg-[#090a0f] relative">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl space-y-3">
                <Badge variant="accent" size="sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                  <span>FLAGSHIP ENGINEERING WORK</span>
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Featured Case Study
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Real-world systems engineering focusing on API architecture,
                  database design, and test automation.
                </p>
              </div>

              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors self-start md:self-auto group"
              >
                <span>View all work & capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <FeaturedWorkCard />
          </Container>
        </section>


        {/* 5. Experience Snapshot */}
        <ExperienceSnapshot />


        {/* 7. Contact CTA */}
        <ContactCtaBanner />
      </main>
      <Footer />
    </>
  );
}
