import React from "react";
import { WorldObjectType } from "./worldObjectsRegistry";

interface SpriteProps {
  type: WorldObjectType;
  isInteracting: boolean;
}

export function WorldObjectSprite({ type, isInteracting }: SpriteProps) {
  switch (type) {
    case "toy":
      return <ToySprite isInteracting={isInteracting} />;
    case "vending-machine":
      return <VendingMachineSprite isInteracting={isInteracting} />;
    case "charging-station":
      return <ChargingStationSprite isInteracting={isInteracting} />;
    case "terminal":
      return <MiniTerminalSprite isInteracting={isInteracting} />;
    case "crate":
      return <CrateSprite isInteracting={isInteracting} />;
    case "plant":
      return <PlantSprite isInteracting={isInteracting} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// 1. Toy: Miniature toy robot / block (nudge & visible bounce)
// ---------------------------------------------------------------------------
function ToySprite({ isInteracting }: { isInteracting: boolean }) {
  return (
    <div
      className={`relative select-none pointer-events-none ${
        isInteracting ? "toy-interacting" : ""
      }`}
      style={{ width: 24, height: 24 }}
    >
      {/* Subtle Ground Shadow */}
      <div
        className="toy-shadow"
        style={{
          position: "absolute",
          bottom: 0,
          left: 3,
          width: 18,
          height: 3,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.5)",
          filter: "blur(1px)",
        }}
      />
      <svg
        width="24"
        height="22"
        viewBox="0 0 24 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="toy-svg"
      >
        {/* Antenna with tip bulb */}
        <line x1="12" y1="1" x2="12" y2="4" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="12" cy="1" r="1.2" fill={isInteracting ? "#6ee7b7" : "#34d399"} className="toy-antenna" />
        {/* Head / Body Block */}
        <rect
          x="5"
          y="4"
          width="14"
          height="12"
          rx="2"
          fill="#18181b"
          stroke="#27272a"
          strokeWidth="1"
        />
        {/* Visor / Eye slit */}
        <rect
          x="7.5"
          y="7"
          width="9"
          height="3"
          rx="1"
          fill={isInteracting ? "#34d399" : "#10b981"}
          className="toy-visor"
        />
        {/* Chest Dial / Dot */}
        <circle cx="9.5" cy="13" r="1" fill={isInteracting ? "#34d399" : "#a1a1aa"} />
        <circle cx="14.5" cy="13" r="1" fill="#52525b" />
        {/* Feet / Treads */}
        <rect x="5.5" y="16.5" width="4" height="2" rx="1" fill="#3f3f46" />
        <rect x="14.5" y="16.5" width="4" height="2" rx="1" fill="#3f3f46" />
      </svg>
      <style jsx>{`
        .toy-interacting .toy-svg {
          animation: toyNudgeBounce 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
        .toy-interacting .toy-shadow {
          animation: toyShadowPulse 1.1s ease-in-out infinite;
        }
        .toy-interacting .toy-visor {
          filter: drop-shadow(0 0 6px #34d399);
        }
        .toy-interacting .toy-antenna {
          filter: drop-shadow(0 0 4px #34d399);
        }
        @keyframes toyNudgeBounce {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          18% {
            transform: translateX(4px) translateY(-3.5px) rotate(6deg);
          }
          40% {
            transform: translateX(6px) translateY(0) rotate(-2deg);
          }
          65% {
            transform: translateX(4.5px) translateY(-1.5px) rotate(1.5deg);
          }
          85% {
            transform: translateX(2px) translateY(0) rotate(0deg);
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
        }
        @keyframes toyShadowPulse {
          0%, 100% {
            transform: translateX(0) scaleX(1);
            opacity: 0.5;
          }
          18% {
            transform: translateX(3px) scaleX(0.7);
            opacity: 0.25;
          }
          40% {
            transform: translateX(5px) scaleX(1.1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. Vending Machine: Developer mini snack/soda machine (glow, item drop, hatch pulse)
// ---------------------------------------------------------------------------
function VendingMachineSprite({ isInteracting }: { isInteracting: boolean }) {
  return (
    <div
      className={`relative select-none pointer-events-none ${
        isInteracting ? "vm-interacting" : ""
      }`}
      style={{ width: 30, height: 42 }}
    >
      {/* Ground Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 2,
          width: 26,
          height: 4,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.6)",
          filter: "blur(1.5px)",
        }}
      />
      <svg
        width="30"
        height="40"
        viewBox="0 0 30 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="vm-svg"
      >
        {/* Main Cabinet */}
        <rect
          x="1"
          y="1"
          width="28"
          height="37"
          rx="3"
          fill="#13151c"
          stroke="#27272a"
          strokeWidth="1.2"
        />
        {/* Header Plate */}
        <rect x="3.5" y="3.5" width="23" height="5" rx="1" fill={isInteracting ? "#064e3b" : "#090a0f"} className="vm-header" />
        <text
          x="15"
          y="7.2"
          fontSize="3.8"
          fill={isInteracting ? "#a7f3d0" : "#34d399"}
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.05em"
          className="vm-header-text"
        >
          SNX.SYS
        </text>
        {/* Glass Window Shelf */}
        <rect
          x="3.5"
          y="10.5"
          width="16"
          height="16"
          rx="1.5"
          fill="#0c0e14"
          stroke="#27272a"
          strokeWidth="0.8"
        />
        {/* Mini Item Cans / Snacks */}
        {/* Shelf 1 */}
        <rect x="5.5" y="12.5" width="3" height="4.5" rx="0.6" fill="#10b981" />
        <rect x="10" y="12.5" width="3" height="4.5" rx="0.6" fill="#0ea5e9" />
        {/* Item that animates / drops down during interaction */}
        <g className="vm-dispensing-item">
          <rect x="14.5" y="12.5" width="3" height="4.5" rx="0.6" fill="#f43f5e" />
        </g>
        {/* Shelf divider */}
        <line x1="4.5" y1="18.5" x2="18.5" y2="18.5" stroke="#27272a" strokeWidth="0.8" />
        {/* Shelf 2 */}
        <rect x="5.5" y="20" width="3.5" height="4.5" rx="0.6" fill="#eab308" />
        <rect x="10.5" y="20" width="3.5" height="4.5" rx="0.6" fill="#a855f7" />
        <rect x="15" y="20" width="2.5" height="4.5" rx="0.6" fill="#10b981" />
        {/* Keypad & Coin Column */}
        <rect x="21" y="10.5" width="5.5" height="16" rx="1" fill="#090a0f" />
        {/* LCD indicator */}
        <rect
          x="22"
          y="12"
          width="3.5"
          height="2"
          rx="0.4"
          fill={isInteracting ? "#6ee7b7" : "#065f46"}
          className="vm-lcd"
        />
        {/* Keypad Buttons */}
        <circle cx="22.8" cy="16.5" r="0.7" fill={isInteracting ? "#34d399" : "#52525b"} />
        <circle cx="24.5" cy="16.5" r="0.7" fill="#52525b" />
        <circle cx="22.8" cy="18.5" r="0.7" fill="#52525b" />
        <circle cx="24.5" cy="18.5" r="0.7" fill={isInteracting ? "#34d399" : "#52525b"} />
        <circle cx="23.7" cy="21.5" r="0.8" fill="#10b981" />
        {/* Dispenser Hatch */}
        <rect
          x="4"
          y="29"
          width="22"
          height="6"
          rx="1"
          fill="#090a0f"
          stroke="#27272a"
          strokeWidth="0.8"
        />
        <rect
          x="6.5"
          y="30.5"
          width="17"
          height="3"
          rx="0.5"
          fill={isInteracting ? "#34d399" : "#18181b"}
          className="vm-hatch"
        />
      </svg>
      <style jsx>{`
        .vm-interacting .vm-header {
          filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.7));
          transition: all 0.3s ease;
        }
        .vm-interacting .vm-lcd {
          filter: drop-shadow(0 0 5px #34d399);
          animation: vmLcdFlash 0.35s steps(2, start) infinite;
        }
        .vm-interacting .vm-dispensing-item {
          animation: vmItemDrop 1.2s ease-in-out infinite;
        }
        .vm-interacting .vm-hatch {
          filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.9));
          animation: vmHatchGlow 0.6s ease-in-out infinite alternate;
        }
        @keyframes vmLcdFlash {
          0%, 100% {
            fill: #a7f3d0;
          }
          50% {
            fill: #059669;
          }
        }
        @keyframes vmItemDrop {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          35% {
            transform: translateY(7px);
            opacity: 1;
          }
          50% {
            transform: translateY(11px);
            opacity: 0;
          }
          75% {
            transform: translateY(0);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes vmHatchGlow {
          0% {
            fill: #10b981;
            opacity: 0.7;
          }
          100% {
            fill: #34d399;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Charging Station: Platform, glowing indicator, and energy pulse
// ---------------------------------------------------------------------------
function ChargingStationSprite({ isInteracting }: { isInteracting: boolean }) {
  return (
    <div
      className={`relative select-none pointer-events-none ${
        isInteracting ? "cs-interacting" : ""
      }`}
      style={{ width: 34, height: 26 }}
    >
      {/* Ground Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 1,
          width: 32,
          height: 4,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.55)",
          filter: "blur(1px)",
        }}
      />
      <svg
        width="34"
        height="24"
        viewBox="0 0 34 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Docking Pad */}
        <path
          d="M2 19L6 14H28L32 19H2Z"
          fill="#18181b"
          stroke="#27272a"
          strokeWidth="1"
        />
        {/* Contact Strip Lines on Pad */}
        <line x1="10" y1="16.5" x2="24" y2="16.5" stroke="#27272a" strokeWidth="1" />
        <line
          x1="12"
          y1="18.5"
          x2="22"
          y2="18.5"
          stroke={isInteracting ? "#34d399" : "#3f3f46"}
          strokeWidth="1"
          className="cs-pad-glow"
        />
        {/* Energy beam / pulse travelling outward toward bot */}
        <line
          x1="8"
          y1="16.5"
          x2="28"
          y2="16.5"
          stroke="#6ee7b7"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="cs-energy-pulse"
        />
        {/* Charging Pillar on left side */}
        <rect
          x="5"
          y="4"
          width="6"
          height="11"
          rx="1"
          fill="#13151c"
          stroke="#27272a"
          strokeWidth="0.8"
        />
        {/* Pillar Cap */}
        <rect x="4" y="3" width="8" height="2" rx="0.5" fill="#27272a" />
        {/* Status LED / Lightning Dot */}
        <circle
          cx="8"
          cy="7.5"
          r="1.6"
          fill={isInteracting ? "#6ee7b7" : "#10b981"}
          className="cs-led"
        />
        {/* Connector Cable extending to pad */}
        <path
          d="M8 10C8 13 11 15 14 15"
          stroke={isInteracting ? "#34d399" : "#52525b"}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="cs-cable"
        />
      </svg>
      <style jsx>{`
        .cs-energy-pulse {
          display: none;
        }
        .cs-interacting .cs-energy-pulse {
          display: block;
          filter: drop-shadow(0 0 5px #34d399);
          animation: csPulseWave 0.8s ease-out infinite;
        }
        .cs-interacting .cs-led {
          filter: drop-shadow(0 0 6px #34d399);
          animation: csLedFlash 0.5s ease-in-out infinite alternate;
        }
        .cs-interacting .cs-pad-glow {
          filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.9));
        }
        .cs-interacting .cs-cable {
          filter: drop-shadow(0 0 4px #10b981);
        }
        @keyframes csPulseWave {
          0% {
            opacity: 0.2;
            stroke-dasharray: 2 6;
            stroke-dashoffset: 0;
          }
          50% {
            opacity: 1;
            stroke-dasharray: 6 3;
          }
          100% {
            opacity: 0.2;
            stroke-dasharray: 2 6;
            stroke-dashoffset: -12;
          }
        }
        @keyframes csLedFlash {
          0% {
            r: 1.6;
            fill: #10b981;
          }
          100% {
            r: 2.3;
            fill: #a7f3d0;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. Mini Terminal: Miniature desktop CRT monitor (screen lights up, cascade text)
// ---------------------------------------------------------------------------
function MiniTerminalSprite({ isInteracting }: { isInteracting: boolean }) {
  return (
    <div
      className={`relative select-none pointer-events-none ${
        isInteracting ? "term-interacting" : ""
      }`}
      style={{ width: 28, height: 30 }}
    >
      {/* Ground Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 2,
          width: 24,
          height: 3.5,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.5)",
          filter: "blur(1px)",
        }}
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monitor Housing */}
        <rect
          x="2"
          y="2"
          width="24"
          height="18"
          rx="2.5"
          fill="#18181b"
          stroke="#27272a"
          strokeWidth="1"
        />
        {/* Screen Bezel / CRT Screen */}
        <rect
          x="4.5"
          y="4.5"
          width="19"
          height="13"
          rx="1.5"
          fill={isInteracting ? "#042f2e" : "#0a0c10"}
          stroke={isInteracting ? "#0d9488" : "#1f2937"}
          strokeWidth="0.8"
          className="term-screen"
        />
        {/* Green Terminal Screen content */}
        <text
          x="6.5"
          y="9"
          fontSize="3.8"
          fill={isInteracting ? "#6ee7b7" : "#10b981"}
          fontFamily="monospace"
          fontWeight="bold"
        >
          &gt;
        </text>
        <line
          x1="10"
          y1="8"
          x2="13"
          y2="8"
          stroke={isInteracting ? "#6ee7b7" : "#059669"}
          strokeWidth="1"
          className="term-cursor"
        />
        {/* Active command lines cascading during interaction */}
        <line
          x1="6.5"
          y1="12"
          x2="18"
          y2="12"
          stroke={isInteracting ? "#34d399" : "#1f2937"}
          strokeWidth="0.8"
          strokeDasharray="2 1"
          className="term-line-1"
        />
        <line
          x1="6.5"
          y1="14.5"
          x2="15"
          y2="14.5"
          stroke={isInteracting ? "#34d399" : "#1f2937"}
          strokeWidth="0.8"
          strokeDasharray="1.5 1"
          className="term-line-2"
        />
        {/* Stand / Neck */}
        <rect x="12" y="20" width="4" height="2.5" fill="#27272a" />
        {/* Keyboard Base */}
        <polygon points="6,25 22,25 24,27 4,27" fill="#13151c" stroke="#27272a" strokeWidth="0.6" />
      </svg>
      <style jsx>{`
        .term-cursor {
          animation: termBlink 0.7s steps(2, start) infinite;
        }
        .term-interacting .term-screen {
          filter: drop-shadow(0 0 6px rgba(45, 212, 191, 0.45));
          transition: all 0.3s ease;
        }
        .term-interacting .term-cursor {
          filter: drop-shadow(0 0 4px #34d399);
          animation: termFastBlink 0.28s steps(2, start) infinite;
        }
        .term-interacting .term-line-1 {
          animation: termCascade 0.9s ease-in-out infinite alternate;
        }
        .term-interacting .term-line-2 {
          animation: termCascade 0.9s ease-in-out 0.2s infinite alternate;
        }
        @keyframes termBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes termFastBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes termCascade {
          0% {
            stroke: #10b981;
            stroke-dashoffset: 4;
          }
          100% {
            stroke: #6ee7b7;
            stroke-dashoffset: -4;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. Crate: Reinforced technical package (wobble & reaction during bot hop)
// ---------------------------------------------------------------------------
function CrateSprite({ isInteracting }: { isInteracting: boolean }) {
  return (
    <div
      className={`relative select-none pointer-events-none ${
        isInteracting ? "crate-interacting" : ""
      }`}
      style={{ width: 26, height: 24 }}
    >
      {/* Ground Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 2,
          width: 22,
          height: 3,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.55)",
          filter: "blur(1px)",
        }}
      />
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="crate-svg"
      >
        {/* Main Box */}
        <rect
          x="2"
          y="3"
          width="22"
          height="17"
          rx="1.5"
          fill="#18181b"
          stroke="#27272a"
          strokeWidth="1"
        />
        {/* Metallic Cross Brace */}
        <line x1="3" y1="4" x2="23" y2="19" stroke="#27272a" strokeWidth="0.8" />
        <line x1="23" y1="4" x2="3" y2="19" stroke="#27272a" strokeWidth="0.8" />
        {/* Metal Corner Reinforcements */}
        <rect x="2" y="3" width="3" height="3" fill="#3f3f46" />
        <rect x="21" y="3" width="3" height="3" fill="#3f3f46" />
        <rect x="2" y="17" width="3" height="3" fill="#3f3f46" />
        <rect x="21" y="17" width="3" height="3" fill="#3f3f46" />
        {/* Stencil Label Tag */}
        <rect
          x="8"
          y="9.5"
          width="10"
          height="4.5"
          rx="0.5"
          fill={isInteracting ? "#064e3b" : "#090a0f"}
          stroke={isInteracting ? "#34d399" : "#10b981"}
          strokeWidth="0.5"
          className="crate-tag"
        />
        <text
          x="13"
          y="13"
          fontSize="2.8"
          fill={isInteracting ? "#a7f3d0" : "#34d399"}
          fontFamily="monospace"
          fontWeight="bold"
          textAnchor="middle"
        >
          PKG-01
        </text>
      </svg>
      <style jsx>{`
        .crate-interacting .crate-svg {
          animation: crateWobble 0.5s ease-in-out infinite alternate;
        }
        .crate-interacting .crate-tag {
          filter: drop-shadow(0 0 5px rgba(52, 211, 153, 0.7));
        }
        @keyframes crateWobble {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(1.5px) scale(1.03, 0.97);
          }
          100% {
            transform: translateY(-1.5px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. Plant: Miniature potted succulent (visible leaf sway & tiny spore sparkle)
// ---------------------------------------------------------------------------
function PlantSprite({ isInteracting }: { isInteracting: boolean }) {
  return (
    <div
      className={`relative select-none pointer-events-none ${
        isInteracting ? "plant-interacting" : ""
      }`}
      style={{ width: 22, height: 26 }}
    >
      {/* Ground Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 3,
          width: 16,
          height: 3,
          borderRadius: "50%",
          background: "rgba(0, 0, 0, 0.45)",
          filter: "blur(1px)",
        }}
      />
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="plant-svg"
      >
        {/* Floating Spore / Sparkle particle during interaction */}
        <circle cx="11" cy="2" r="0.9" fill="#a7f3d0" className="plant-spore" />
        {/* Succulent Leaves */}
        {/* Central main leaf */}
        <path
          d="M11 2C9 5 9 10 11 12C13 10 13 5 11 2Z"
          fill={isInteracting ? "#34d399" : "#10b981"}
          stroke="#059669"
          strokeWidth="0.6"
          className="plant-leaf-center"
        />
        {/* Left leaf */}
        <path
          d="M11 9C8 8 5 9 6 13C8 13 10 12 11 10Z"
          fill="#059669"
          stroke="#047857"
          strokeWidth="0.6"
          className="plant-leaf-left"
        />
        {/* Right leaf */}
        <path
          d="M11 9C14 8 17 9 16 13C14 13 12 12 11 10Z"
          fill={isInteracting ? "#6ee7b7" : "#34d399"}
          stroke="#10b981"
          strokeWidth="0.6"
          className="plant-leaf-right"
        />
        {/* Geometric Pot */}
        <polygon
          points="4,12 18,12 16,22 6,22"
          fill="#18181b"
          stroke="#27272a"
          strokeWidth="1"
        />
        {/* Pot Rim Line */}
        <line x1="4.5" y1="14" x2="17.5" y2="14" stroke="#27272a" strokeWidth="0.8" />
        {/* Pot Minimal Line Accent */}
        <line x1="11" y1="16" x2="11" y2="20" stroke="#3f3f46" strokeWidth="0.7" />
      </svg>
      <style jsx>{`
        .plant-spore {
          display: none;
        }
        .plant-interacting .plant-spore {
          display: block;
          filter: drop-shadow(0 0 4px #34d399);
          animation: plantSporeFloat 1.2s ease-out infinite;
        }
        .plant-interacting .plant-svg {
          transform-origin: 11px 22px;
          animation: plantGentleSway 0.9s ease-in-out infinite alternate;
        }
        @keyframes plantGentleSway {
          0% {
            transform: rotate(-4.5deg);
          }
          100% {
            transform: rotate(4.5deg);
          }
        }
        @keyframes plantSporeFloat {
          0% {
            transform: translateY(2px) scale(0.6);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: translateY(-7px) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
