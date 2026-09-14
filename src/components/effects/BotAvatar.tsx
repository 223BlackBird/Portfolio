"use client";

import React from "react";
import { BotAvatarType } from "./EffectsContext";

// ---------------------------------------------------------------------------
// Avatar Color Palettes
// ---------------------------------------------------------------------------

export interface AvatarPalette {
  chassisFill: string;
  chassisStroke: string;
  backpackFill: string;
  backpackStroke: string;
  backpackLight: string;
  topSensorFill: string;
  topSensorStroke: string;
  visorFill: string;
  eyesFill: string;
  eyeGlowFill: string;
  legsFill: string;
  legsStroke: string;
}

export const AVATAR_PALETTES: Record<BotAvatarType, AvatarPalette> = {
  white: {
    chassisFill: "#ededf0",
    chassisStroke: "rgba(255, 255, 255, 0.7)",
    backpackFill: "#dedee3",
    backpackStroke: "rgba(0, 0, 0, 0.15)",
    backpackLight: "#10b981",
    topSensorFill: "#dedee3",
    topSensorStroke: "rgba(0, 0, 0, 0.15)",
    visorFill: "#18181b",
    eyesFill: "#10b981",
    eyeGlowFill: "#10b981",
    legsFill: "#a1a1aa",
    legsStroke: "rgba(0, 0, 0, 0.18)",
  },
  "dark-green": {
    chassisFill: "#0c1712",
    chassisStroke: "rgba(52, 211, 153, 0.28)",
    backpackFill: "#08120d",
    backpackStroke: "rgba(52, 211, 153, 0.2)",
    backpackLight: "#34d399",
    topSensorFill: "#11221a",
    topSensorStroke: "rgba(52, 211, 153, 0.2)",
    visorFill: "#030805",
    eyesFill: "#34d399",
    eyeGlowFill: "#34d399",
    legsFill: "#12251c",
    legsStroke: "rgba(52, 211, 153, 0.24)",
  },
  "light-green": {
    chassisFill: "#a7f3d0",
    chassisStroke: "rgba(16, 185, 129, 0.5)",
    backpackFill: "#86efac",
    backpackStroke: "rgba(16, 185, 129, 0.4)",
    backpackLight: "#059669",
    topSensorFill: "#86efac",
    topSensorStroke: "rgba(16, 185, 129, 0.4)",
    visorFill: "#064e3b",
    eyesFill: "#34d399",
    eyeGlowFill: "#34d399",
    legsFill: "#6ee7b7",
    legsStroke: "rgba(16, 185, 129, 0.4)",
  },
};

export const AVATAR_OPTIONS: { id: BotAvatarType; label: string }[] = [
  { id: "white", label: "White" },
  { id: "dark-green", label: "Dark Green" },
  { id: "light-green", label: "Light Green" },
];

// ---------------------------------------------------------------------------
// BotAvatarSvg Component
// ---------------------------------------------------------------------------

export function BotAvatarSvg({
  avatar = "dark-green",
  width = 30,
  height = 24,
  className = "",
  showLegAnimations = false,
}: {
  avatar?: BotAvatarType;
  width?: number;
  height?: number;
  className?: string;
  showLegAnimations?: boolean;
}) {
  const p = AVATAR_PALETTES[avatar] || AVATAR_PALETTES["dark-green"];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block" }}
    >
      {/* Backpack / Small status unit */}
      <rect
        x="3"
        y="6"
        width="4"
        height="8"
        rx="1.5"
        fill={p.backpackFill}
        stroke={p.backpackStroke}
        strokeWidth="1"
      />
      <circle cx="5" cy="8" r="0.75" fill={p.backpackLight} opacity="0.9" />

      {/* Main Chassis */}
      <rect
        x="6"
        y="3"
        width="18"
        height="15"
        rx="4"
        fill={p.chassisFill}
        stroke={p.chassisStroke}
        strokeWidth="1"
      />

      {/* Subtle top sensor */}
      <rect
        x="12"
        y="1.5"
        width="6"
        height="2"
        rx="1"
        fill={p.topSensorFill}
        stroke={p.topSensorStroke}
        strokeWidth="0.75"
      />

      {/* Eye Visor Area */}
      <rect
        x="10"
        y="7"
        width="12"
        height="6"
        rx="2"
        fill={p.visorFill}
      />

      {/* Illuminated Eyes */}
      <g className="roaming-bot-eyes">
        <circle cx="13.5" cy="10" r="1.2" fill={p.eyesFill} />
        <circle cx="18.5" cy="10" r="1.2" fill={p.eyesFill} />
        {/* Soft glow */}
        <circle
          cx="13.5"
          cy="10"
          r="2.2"
          fill={p.eyeGlowFill}
          opacity="0.3"
        />
        <circle
          cx="18.5"
          cy="10"
          r="2.2"
          fill={p.eyeGlowFill}
          opacity="0.3"
        />
      </g>

      {/* Tiny Left Leg / Strut */}
      <g className={showLegAnimations ? "roaming-bot-leg-left" : "roaming-bot-leg-idle"}>
        <rect
          x="10"
          y="17"
          width="2.5"
          height="5.5"
          rx="1.2"
          fill={p.legsFill}
          stroke={p.legsStroke}
          strokeWidth="0.5"
        />
      </g>

      {/* Tiny Right Leg / Strut */}
      <g className={showLegAnimations ? "roaming-bot-leg-right" : "roaming-bot-leg-idle"}>
        <rect
          x="16.5"
          y="17"
          width="2.5"
          height="5.5"
          rx="1.2"
          fill={p.legsFill}
          stroke={p.legsStroke}
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}
