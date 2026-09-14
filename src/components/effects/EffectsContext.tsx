"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

// ---------------------------------------------------------------------------
// Types — extensible for visual effects
// ---------------------------------------------------------------------------

export type Intensity = "low" | "medium" | "high";
export type BotAvatarType = "white" | "dark-green" | "light-green";
export type BotInterval = "10" | "15" | "20" | "25" | "30";

export interface EffectsSettings {
  ambientLight: {
    enabled: boolean;
    intensity: Intensity;
  };
  roamingBot: {
    enabled: boolean;
    avatar: BotAvatarType;
    interval: BotInterval;
    behaviour: boolean;
    showOnMobile: boolean;
  };
}

interface EffectsContextValue {
  settings: EffectsSettings;
  updateSetting: <K extends keyof EffectsSettings>(
    key: K,
    value: Partial<EffectsSettings[K]>
  ) => void;
  restoreDefaults: () => void;
  isHydrated: boolean;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_SETTINGS: EffectsSettings = {
  ambientLight: {
    enabled: true,
    intensity: "medium",
  },
  roamingBot: {
    enabled: true,
    avatar: "dark-green",
    interval: "30",
    behaviour: true,
    showOnMobile: true,
  },
};

const STORAGE_KEY = "portfolio-effects-settings";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const EffectsContext = createContext<EffectsContextValue>({
  settings: DEFAULT_SETTINGS,
  updateSetting: () => {},
  restoreDefaults: () => {},
  isHydrated: false,
});

export function useEffects() {
  return useContext(EffectsContext);
}

// ---------------------------------------------------------------------------
// Provider — reads from localStorage after mount to avoid hydration mismatch
// ---------------------------------------------------------------------------

export function EffectsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<EffectsSettings>(DEFAULT_SETTINGS);
  const [isHydrated, setIsHydrated] = useState(false);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<EffectsSettings>;
        setSettings({
          ambientLight: {
            ...DEFAULT_SETTINGS.ambientLight,
            ...(parsed.ambientLight || {}),
          },
          roamingBot: {
            ...DEFAULT_SETTINGS.roamingBot,
            ...(parsed.roamingBot || {}),
          },
        });
      }
    } catch {
      // Silently fall back to defaults
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage whenever settings change (skip first render)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage full or unavailable — ignore
    }
  }, [settings]);

  const updateSetting = useCallback(
    <K extends keyof EffectsSettings>(
      key: K,
      value: Partial<EffectsSettings[K]>
    ) => {
      setSettings((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...value },
      }));
    },
    []
  );

  const restoreDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <EffectsContext.Provider
      value={{ settings, updateSetting, restoreDefaults, isHydrated }}
    >
      {children}
    </EffectsContext.Provider>
  );
}
