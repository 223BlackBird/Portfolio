"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEffects, Intensity } from "../effects/EffectsContext";

// ---------------------------------------------------------------------------
// Intensity configuration
// ---------------------------------------------------------------------------

interface IntensityConfig {
  size: number;
  center: number;
  mid: number;
}

const INTENSITY_MAP: Record<Intensity, IntensityConfig> = {
  low: { size: 500, center: 0.05, mid: 0.02 },
  medium: { size: 650, center: 0.09, mid: 0.035 },
  high: { size: 820, center: 0.16, mid: 0.065 },
};

function buildGradient(intensity: Intensity): string {
  const { center, mid } = INTENSITY_MAP[intensity] || INTENSITY_MAP.medium;
  return `radial-gradient(circle, rgba(52, 211, 153, ${center}) 0%, rgba(52, 211, 153, ${mid}) 38%, rgba(52, 211, 153, 0) 70%)`;
}

// ---------------------------------------------------------------------------
// AmbientLight Component
// ---------------------------------------------------------------------------

export function AmbientLight() {
  const { settings } = useEffects();
  const { enabled, intensity } = settings.ambientLight;

  const lightRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);
  const isTouch = useRef(false);
  const hasMouseMoved = useRef(false);

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  // Animation frame loop
  const animate = useCallback(() => {
    if (!enabledRef.current) {
      rafId.current = null;
      return;
    }

    const lerp = 0.09;
    currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
    currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;

    if (lightRef.current) {
      lightRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  // Update size & background styling
  const applyIntensityStyles = useCallback((int: Intensity) => {
    if (!lightRef.current) return;
    const cfg = INTENSITY_MAP[int] || INTENSITY_MAP.medium;
    lightRef.current.style.width = `${cfg.size}px`;
    lightRef.current.style.height = `${cfg.size}px`;
    lightRef.current.style.background = buildGradient(int);
  }, []);

  // Listen to intensity changes
  useEffect(() => {
    applyIntensityStyles(intensity);
  }, [intensity, applyIntensityStyles]);

  // Handle enabled / disabled changes
  useEffect(() => {
    if (!lightRef.current) return;

    if (!enabled) {
      lightRef.current.style.opacity = "0";
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    } else {
      if (hasMouseMoved.current) {
        lightRef.current.style.opacity = "1";
      }
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animate);
      }
    }
  }, [enabled, animate]);

  // Global mouse tracking and touch handling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (lightRef.current) lightRef.current.style.display = "none";
      return;
    }

    const checkTouch = () => {
      isTouch.current = true;
      if (lightRef.current) lightRef.current.style.opacity = "0";
    };

    window.addEventListener("touchstart", checkTouch, { once: true, passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch.current) return;

      const cfg = INTENSITY_MAP[intensityRef.current] || INTENSITY_MAP.medium;
      const halfSize = cfg.size / 2;

      mousePos.current.x = e.clientX - halfSize;
      mousePos.current.y = e.clientY - halfSize;

      if (!hasMouseMoved.current) {
        hasMouseMoved.current = true;
        currentPos.current.x = mousePos.current.x;
        currentPos.current.y = mousePos.current.y;
      }

      if (enabledRef.current && lightRef.current) {
        lightRef.current.style.opacity = "1";
        if (rafId.current === null) {
          rafId.current = requestAnimationFrame(animate);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Initial start if enabled
    if (enabledRef.current && rafId.current === null) {
      rafId.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", checkTouch);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [animate]);

  const initialCfg = INTENSITY_MAP[intensity] || INTENSITY_MAP.medium;

  return (
    <div
      ref={lightRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: initialCfg.size,
        height: initialCfg.size,
        borderRadius: "50%",
        background: buildGradient(intensity),
        pointerEvents: "none",
        zIndex: 25, // Above card backgrounds, below Navbar (z-50) & Settings (z-9999)
        opacity: 0,
        transition: "opacity 0.4s ease, width 0.3s ease, height 0.3s ease",
        willChange: "transform",
        mixBlendMode: "screen",
      }}
    />
  );
}
