import React from "react";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`space-y-3 mb-12 sm:mb-16 ${
        centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl"
      } ${className}`}
    >
      {badge && (
        <div>
          <Badge variant="accent" size="sm">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
