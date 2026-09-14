"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  useEffects,
  Intensity,
  BotAvatarType,
  BotInterval,
} from "./EffectsContext";
import { BotAvatarSvg, AVATAR_OPTIONS } from "./BotAvatar";

// ---------------------------------------------------------------------------
// Constants & Options
// ---------------------------------------------------------------------------

const INTENSITY_OPTIONS: { value: Intensity; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Med" },
  { value: "high", label: "High" },
];

const INTERVAL_OPTIONS: { value: BotInterval; label: string }[] = [
  { value: "10", label: "10 seconds" },
  { value: "15", label: "15 seconds" },
  { value: "20", label: "20 seconds" },
  { value: "25", label: "25 seconds" },
  { value: "30", label: "30 seconds" },
];

// ---------------------------------------------------------------------------
// ToggleSwitch Subcomponent
// ---------------------------------------------------------------------------

function ToggleSwitch({
  checked,
  onChange,
  label,
  reducedMotion,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  reducedMotion?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      style={{
        width: 32,
        height: 18,
        borderRadius: 9,
        border: "none",
        padding: 0,
        cursor: "pointer",
        position: "relative",
        background: checked ? "rgb(52, 211, 153)" : "rgb(63, 63, 70)",
        transition: reducedMotion ? "none" : "background 0.2s ease",
        outline: "none",
        flexShrink: 0,
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 2px rgba(52, 211, 153, 0.4)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 16 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "white",
          transition: reducedMotion ? "none" : "left 0.2s ease",
        }}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// EffectsControl Component
// ---------------------------------------------------------------------------

export function EffectsControl() {
  const { settings, updateSetting, restoreDefaults, isHydrated } = useEffects();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Don't render until hydrated to avoid flash of default state
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Check reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClick, true);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  if (!mounted || !isHydrated) return null;

  const { ambientLight, roamingBot } = settings;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      {/* Settings Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Visual effects settings"
          style={{
            position: "absolute",
            bottom: 28,
            right: 0,
            width: 275,
            maxHeight: "calc(100vh - 75px)",
            overflowY: "auto",
            padding: "14px 16px",
            borderRadius: 14,
            background: "rgba(13, 15, 22, 0.94)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            fontFamily: "var(--font-geist-mono), monospace",
            ...(reducedMotion
              ? {}
              : {
                  animation: "effectsPanelIn 0.2s ease-out forwards",
                }),
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgb(161, 161, 170)", // zinc-400
              }}
            >
              Effects Settings
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgb(52, 211, 153)",
                opacity: 0.8,
              }}
            />
          </div>

          {/* ============================================================ */}
          {/* 1. AMBIENT LIGHT SECTION                                     */}
          {/* ============================================================ */}
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: ambientLight.enabled ? 8 : 0,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgb(228, 228, 231)", // zinc-200
                }}
              >
                Ambient Light
              </span>

              <ToggleSwitch
                checked={ambientLight.enabled}
                onChange={() =>
                  updateSetting("ambientLight", {
                    enabled: !ambientLight.enabled,
                  })
                }
                label="Toggle ambient light"
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Intensity Selector */}
            {ambientLight.enabled && (
              <div style={{ marginTop: 6 }}>
                <div
                  style={{
                    fontSize: 9.5,
                    color: "rgb(113, 113, 122)", // zinc-500
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Intensity
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {INTENSITY_OPTIONS.map((opt) => {
                    const isActive = ambientLight.intensity === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`Set ambient light intensity to ${opt.label}`}
                        onClick={() =>
                          updateSetting("ambientLight", {
                            intensity: opt.value,
                          })
                        }
                        style={{
                          flex: 1,
                          padding: "4px 0",
                          fontSize: 10,
                          fontWeight: 500,
                          fontFamily: "inherit",
                          borderRadius: 6,
                          border: isActive
                            ? "1px solid rgba(52, 211, 153, 0.4)"
                            : "1px solid rgba(255, 255, 255, 0.06)",
                          background: isActive
                            ? "rgba(52, 211, 153, 0.12)"
                            : "rgba(24, 24, 27, 0.6)",
                          color: isActive
                            ? "rgb(52, 211, 153)"
                            : "rgb(161, 161, 170)",
                          cursor: "pointer",
                          transition: reducedMotion ? "none" : "all 0.15s ease",
                          outline: "none",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* 2. ROAMING BOT SECTION                                       */}
          {/* ============================================================ */}
          <div
            style={{
              paddingTop: 10,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              marginBottom: 10,
            }}
          >
            {/* Roaming Bot Master Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: roamingBot.enabled ? 10 : 0,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgb(228, 228, 231)",
                }}
              >
                Roaming Bot
              </span>

              <ToggleSwitch
                checked={roamingBot.enabled}
                onChange={() =>
                  updateSetting("roamingBot", {
                    enabled: !roamingBot.enabled,
                  })
                }
                label="Toggle roaming bot"
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Sub-controls when Roaming Bot is ON */}
            {roamingBot.enabled && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* 4. Bot Avatar Selection */}
                <div>
                  <div
                    style={{
                      fontSize: 9.5,
                      color: "rgb(113, 113, 122)",
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Bot Avatar
                  </div>

                  <div style={{ display: "flex", gap: 6 }}>
                    {AVATAR_OPTIONS.map((opt) => {
                      const isSelected = roamingBot.avatar === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          aria-pressed={isSelected}
                          aria-label={`Select avatar ${opt.label}`}
                          onClick={() =>
                            updateSetting("roamingBot", { avatar: opt.id })
                          }
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "6px 2px 5px",
                            borderRadius: 8,
                            border: isSelected
                              ? "1px solid rgb(52, 211, 153)"
                              : "1px solid rgba(255, 255, 255, 0.08)",
                            background: isSelected
                              ? "rgba(52, 211, 153, 0.12)"
                              : "rgba(22, 24, 31, 0.6)",
                            cursor: "pointer",
                            transition: reducedMotion
                              ? "none"
                              : "all 0.15s ease",
                            outline: "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor =
                                "rgba(255, 255, 255, 0.2)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor =
                                "rgba(255, 255, 255, 0.08)";
                            }
                          }}
                        >
                          <div style={{ marginBottom: 4 }}>
                            <BotAvatarSvg
                              avatar={opt.id}
                              width={24}
                              height={19}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: isSelected ? 600 : 500,
                              color: isSelected
                                ? "rgb(52, 211, 153)"
                                : "rgb(161, 161, 170)",
                              whiteSpace: "nowrap",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Appearance Interval */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "rgb(212, 212, 216)",
                      }}
                    >
                      Appearance Interval
                    </span>
                    <span
                      style={{
                        fontSize: 8.5,
                        color: "rgb(113, 113, 122)",
                        marginTop: 1,
                      }}
                    >
                      How often the bot appears (randomized)
                    </span>
                  </div>

                  <div style={{ position: "relative" }}>
                    <select
                      value={roamingBot.interval}
                      onChange={(e) =>
                        updateSetting("roamingBot", {
                          interval: e.target.value as BotInterval,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "5px 8px",
                        fontSize: 10,
                        fontFamily: "inherit",
                        borderRadius: 6,
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(20, 22, 29, 0.9)",
                        color: "rgb(228, 228, 231)",
                        cursor: "pointer",
                        outline: "none",
                        appearance: "none",
                        WebkitAppearance: "none",
                      }}
                    >
                      {INTERVAL_OPTIONS.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          style={{
                            background: "rgb(18, 20, 26)",
                            color: "rgb(228, 228, 231)",
                          }}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {/* Custom Arrow */}
                    <div
                      style={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: 8,
                        color: "rgb(161, 161, 170)",
                      }}
                    >
                      ▼
                    </div>
                  </div>
                </div>

                {/* 6. Behaviour Toggle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 4,
                  }}
                >
                  <div style={{ paddingRight: 8 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "rgb(212, 212, 216)",
                      }}
                    >
                      Behaviour
                    </div>
                    <div
                      style={{
                        fontSize: 8.5,
                        color: "rgb(113, 113, 122)",
                        marginTop: 1,
                      }}
                    >
                      Occasionally pause, look around, or hop.
                    </div>
                  </div>

                  <ToggleSwitch
                    checked={roamingBot.behaviour}
                    onChange={() =>
                      updateSetting("roamingBot", {
                        behaviour: !roamingBot.behaviour,
                      })
                    }
                    label="Toggle bot behaviour"
                    reducedMotion={reducedMotion}
                  />
                </div>

                {/* 7. Show on Mobile Toggle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ paddingRight: 8 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "rgb(212, 212, 216)",
                      }}
                    >
                      Show on Mobile
                    </div>
                    <div
                      style={{
                        fontSize: 8.5,
                        color: "rgb(113, 113, 122)",
                        marginTop: 1,
                      }}
                    >
                      Runs less frequently on mobile devices.
                    </div>
                  </div>

                  <ToggleSwitch
                    checked={roamingBot.showOnMobile}
                    onChange={() =>
                      updateSetting("roamingBot", {
                        showOnMobile: !roamingBot.showOnMobile,
                      })
                    }
                    label="Toggle show on mobile"
                    reducedMotion={reducedMotion}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* 3. ADVANCED (COLLAPSIBLE)                                    */}
          {/* ============================================================ */}
          <div
            style={{
              paddingTop: 8,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={() => setIsAdvancedOpen((prev) => !prev)}
              aria-expanded={isAdvancedOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgb(161, 161, 170)",
                fontSize: 10,
                fontWeight: 500,
                fontFamily: "inherit",
                textAlign: "left",
                outline: "none",
              }}
            >
              <span>Advanced</span>
              <span
                style={{
                  fontSize: 8,
                  transform: isAdvancedOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: reducedMotion ? "none" : "transform 0.2s ease",
                  display: "inline-block",
                }}
              >
                ▼
              </span>
            </button>

            {isAdvancedOpen && (
              <div
                style={{
                  marginTop: 8,
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: "rgba(20, 22, 29, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9.5,
                        fontWeight: 500,
                        color: "rgb(212, 212, 216)",
                      }}
                    >
                      Reduced Motion
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: "rgb(113, 113, 122)",
                        marginTop: 1,
                      }}
                    >
                      System preference
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: 8.5,
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: reducedMotion
                        ? "rgba(245, 158, 11, 0.15)"
                        : "rgba(255, 255, 255, 0.06)",
                      color: reducedMotion
                        ? "rgb(245, 158, 11)"
                        : "rgb(161, 161, 170)",
                      border: reducedMotion
                        ? "1px solid rgba(245, 158, 11, 0.3)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {reducedMotion ? "Active" : "Disabled"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* 4. RESTORE DEFAULTS                                          */}
          {/* ============================================================ */}
          <div
            style={{
              paddingTop: 8,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => restoreDefaults()}
              style={{
                width: "100%",
                padding: "6px 0",
                fontSize: 9.5,
                fontWeight: 500,
                fontFamily: "inherit",
                color: "rgb(161, 161, 170)",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                cursor: "pointer",
                transition: reducedMotion ? "none" : "all 0.15s ease",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgb(228, 228, 231)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgb(161, 161, 170)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <span>↺</span>
              <span>Restore Defaults</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Dot Button */}
      <button
        ref={buttonRef}
        type="button"
        aria-label="Visual effects settings"
        aria-expanded={isOpen}
        onClick={toggle}
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          border: "none",
          padding: 0,
          cursor: "pointer",
          background: "rgb(52, 211, 153)",
          opacity: isOpen ? 0.9 : 0.35,
          transition: reducedMotion
            ? "none"
            : "opacity 0.25s ease, box-shadow 0.25s ease",
          outline: "none",
          display: "block",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.8";
          e.currentTarget.style.boxShadow = "0 0 8px rgba(52, 211, 153, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = isOpen ? "0.9" : "0.35";
          e.currentTarget.style.boxShadow = "none";
        }}
        onFocus={(e) => {
          e.currentTarget.style.opacity = "0.8";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(52, 211, 153, 0.3)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.opacity = isOpen ? "0.9" : "0.35";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      {/* Keyframe animation for panel entrance */}
      <style jsx global>{`
        @keyframes effectsPanelIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
