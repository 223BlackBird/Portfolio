import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Badge } from "./Badge";
import { ArrowLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  backLink?: {
    label: string;
    href: string;
  };
  children?: React.ReactNode;
}

export function PageHero({
  badge,
  title,
  description,
  breadcrumbs,
  backLink,
  children,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/[0.06] bg-grid-pattern bg-radial-vignette overflow-hidden">
      <Container>
        <div className="max-w-4xl space-y-6">
          {/* Back link or Breadcrumbs */}
          {backLink && (
            <div>
              <Link
                href={backLink.href}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>{backLink.label}</span>
              </Link>
            </div>
          )}

          {breadcrumbs && !backLink && (
            <nav
              aria-label="Breadcrumbs"
              className="flex items-center gap-2 text-xs font-mono text-zinc-500"
            >
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-zinc-700">/</span>}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-zinc-300">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Badge */}
          {badge && (
            <div>
              <Badge variant="accent" size="sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                <span>{badge}</span>
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl">
            {description}
          </p>

          {children && <div className="pt-2">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
