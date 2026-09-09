import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "muted";
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  className = "",
  size = "md",
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  }[size];

  const variantStyles = {
    default:
      "bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono tracking-tight",
    accent:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono tracking-tight",
    outline:
      "bg-transparent text-zinc-400 border border-zinc-800 hover:border-zinc-700 font-mono",
    muted:
      "bg-zinc-900/90 text-zinc-400 border border-zinc-800/80 font-mono",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-medium transition-colors ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}
