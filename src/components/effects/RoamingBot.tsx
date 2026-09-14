"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useEffects, BotInterval } from "./EffectsContext";
import { BotAvatarSvg } from "./BotAvatar";
import { getNextDeveloperTip } from "@/data/developerTips";
import {
  getRegisteredWorldObjects,
  WorldObjectItem,
  WorldObjectType,
} from "./worldObjectsRegistry";

// ---------------------------------------------------------------------------
// Constants & Interval Helpers
// ---------------------------------------------------------------------------

const BOT_WIDTH = 32;
const BOT_SPEED_PPS = 120; // pixels per second

const INTERVAL_RANGES: Record<BotInterval, [number, number]> = {
  "10": [10_000, 10_000],
  "15": [15_000, 15_000],
  "20": [20_000, 20_000],
  "25": [25_000, 25_000],
  "30": [30_000, 30_000],
};

const OBJECT_INTERACTION_DURATIONS: Record<WorldObjectType, number> = {
  "vending-machine": 2500,
  "charging-station": 3000,
  toy: 2000,
  crate: 1800,
  terminal: 2600,
  plant: 2000,
};

const MAX_INTERACTION_DURATION = 5000; // Defensive hard safety limit (never > 5s)

function getIntervalDelay(
  intervalKey: BotInterval,
  isMobile: boolean,
  isInitial = false
): number {
  if (isInitial) {
    // Initial spawn: 4 to 8 seconds so user sees it without waiting 60s
    return Math.floor(4000 + Math.random() * 4000);
  }
  const [min, max] = INTERVAL_RANGES[intervalKey] || [30_000, 60_000];
  const base = min + Math.random() * (max - min);
  return Math.floor(isMobile ? base * 1.5 : base);
}

export type BotState =
  | "waiting"
  | "wandering"
  | "approaching"
  | "interacting"
  | "paused-for-tip"
  | "exiting";

type Direction = "ltr" | "rtl";
type BotPhase =
  | "running"
  | "looking"
  | "hop"
  | "idle"
  | "tip_paused"
  | "interacting";

type BotAction =
  | "wandering"
  | "seeking_object"
  | "interacting"
  | "paused_looking"
  | "paused_hop"
  | "exiting";

interface TipPosition {
  left: number;
  top: number;
  isAbove: boolean;
  tailOffset: number;
}

interface AnimState {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  direction: Direction;
  phase: BotPhase;
  action: BotAction;
  botState: BotState;
  targetObject: WorldObjectItem | null;
  sessionEndTime: number;
  lastTime: number;
}

// ---------------------------------------------------------------------------
// RoamingBot Component
// ---------------------------------------------------------------------------

export function RoamingBot() {
  const { settings } = useEffects();
  const { enabled, avatar, interval, behaviour, showOnMobile } =
    settings.roamingBot;

  const [active, setActive] = useState(false);
  const [botState, setBotState] = useState<BotState>("waiting");
  const [direction, setDirection] = useState<Direction>("ltr");
  const [phase, setPhase] = useState<BotPhase>("running");
  const [interactingObjType, setInteractingObjType] =
    useState<WorldObjectType | null>(null);
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const [tipPosition, setTipPosition] = useState<TipPosition | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  activeRef.current = active;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tipTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const updateFrameRef = useRef<(now: number) => void>(() => {});

  // Synchronized settings ref to avoid stale closures in frame loops
  const settingsRef = useRef({
    enabled,
    avatar,
    interval,
    behaviour,
    showOnMobile,
  });
  settingsRef.current = { enabled, avatar, interval, behaviour, showOnMobile };

  // Mutable animation state (no React re-renders per frame)
  const animState = useRef<AnimState>({
    currentX: -BOT_WIDTH - 30,
    currentY: 300,
    targetX: 1000,
    targetY: 300,
    direction: "ltr",
    phase: "running",
    action: "wandering",
    botState: "waiting",
    targetObject: null,
    sessionEndTime: 0,
    lastTime: 0,
  });

  // Clear all pending timeouts and animation frames
  const cleanupRun = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
    if (tipTimerRef.current) {
      clearTimeout(tipTimerRef.current);
      tipTimerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (animState.current.targetObject?.stopInteraction) {
      animState.current.targetObject.stopInteraction();
    }
    animState.current.targetObject = null;
    animState.current.botState = "waiting";
    setBotState("waiting");
    setInteractingObjType(null);
    setActiveTip(null);
    setTipPosition(null);
    setActive(false);
    setPhase("running");
  }, []);

  // Helper to pick a safe localized or open wander point in viewport
  const pickRandomWanderTarget = useCallback(() => {
    const s = animState.current;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    const safeMinX = 40;
    const safeMaxX = vw - 40 - BOT_WIDTH;
    const safeMinY = 75; // below navbar
    const safeMaxY = vh - 60; // above bottom UI

    // Natural wander with random angle and distance step (140px to 380px)
    const angle = Math.random() * Math.PI * 2;
    const stepDist = 140 + Math.random() * 240;
    let nextX = s.currentX + Math.cos(angle) * stepDist;
    let nextY = s.currentY + Math.sin(angle) * stepDist;

    // Clamp within viewport safe area
    nextX = Math.max(safeMinX, Math.min(safeMaxX, nextX));
    nextY = Math.max(safeMinY, Math.min(safeMaxY, nextY));

    // If clamped too close to current position, pick a fresh safe point
    if (Math.hypot(nextX - s.currentX, nextY - s.currentY) < 70) {
      nextX = safeMinX + Math.random() * (safeMaxX - safeMinX);
      nextY = safeMinY + Math.random() * (safeMaxY - safeMinY);
    }

    s.targetX = Math.round(nextX);
    s.targetY = Math.round(nextY);
    s.targetObject = null;
    s.action = "wandering";
    s.botState = "wandering";
    s.phase = "running";
    s.lastTime = performance.now();
    setBotState("wandering");
    setPhase("running");
    setInteractingObjType(null);
  }, []);

  const pickRandomWanderTargetRef = useRef(pickRandomWanderTarget);
  pickRandomWanderTargetRef.current = pickRandomWanderTarget;

  // Decide next destination / behavior
  const chooseNextDestination = useCallback(() => {
    const s = animState.current;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    // Check if session lifetime (15-30s) is complete
    if (performance.now() >= s.sessionEndTime) {
      // Time to leave! Pick nearest screen edge to exit cleanly
      s.action = "exiting";
      s.botState = "exiting";
      s.phase = "running";
      s.targetObject = null;
      const exitLeft = s.currentX < vw / 2;
      s.targetX = exitLeft ? -BOT_WIDTH - 35 : vw + BOT_WIDTH + 35;
      s.targetY = Math.max(
        70,
        Math.min(vh - 60, s.currentY + (Math.random() * 80 - 40))
      );
      s.lastTime = performance.now();
      setBotState("exiting");
      setPhase("running");
      setInteractingObjType(null);
      return;
    }

    // Query visible registered environmental objects in current viewport
    const allObjects = getRegisteredWorldObjects();
    const visibleObjects = allObjects.filter((obj) => {
      const el = obj.getElement();
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top >= 30 &&
        rect.bottom <= vh - 30 &&
        rect.left >= 30 &&
        rect.right <= vw - 30
      );
    });

    const roll = Math.random();

    // Behavior distribution matching specification:
    // When Behaviour ON: ~60% wander, ~25% environmental object, ~15% special pause/look/hop
    // When Behaviour OFF: ~80% wander, ~20% environmental object
    if (settingsRef.current.behaviour) {
      if (roll < 0.15) {
        // Special pause / curious look or hop
        const isHop = Math.random() > 0.5;
        s.action = isHop ? "paused_hop" : "paused_looking";
        s.phase = isHop ? "hop" : "looking";
        setPhase(s.phase);
        pauseTimerRef.current = setTimeout(() => {
          if (
            animState.current.phase === "looking" ||
            animState.current.phase === "hop"
          ) {
            pickRandomWanderTargetRef.current();
          }
        }, isHop ? 900 : 1500);
        return;
      } else if (roll < 0.4 && visibleObjects.length > 0) {
        // Move toward environmental object!
        const chosen =
          visibleObjects[Math.floor(Math.random() * visibleObjects.length)];
        s.targetObject = chosen;
        s.action = "seeking_object";
        s.botState = "approaching";
        s.phase = "running";
        s.lastTime = performance.now();
        setBotState("approaching");
        setPhase("running");
        return;
      } else {
        // Wander somewhere random
        pickRandomWanderTargetRef.current();
      }
    } else {
      // Behaviour OFF:
      if (roll < 0.2 && visibleObjects.length > 0) {
        const chosen =
          visibleObjects[Math.floor(Math.random() * visibleObjects.length)];
        s.targetObject = chosen;
        s.action = "seeking_object";
        s.botState = "approaching";
        s.phase = "running";
        s.lastTime = performance.now();
        setBotState("approaching");
        setPhase("running");
        return;
      } else {
        pickRandomWanderTargetRef.current();
      }
    }
  }, []);

  const chooseNextDestinationRef = useRef(chooseNextDestination);
  chooseNextDestinationRef.current = chooseNextDestination;

  // Resumes wandering cleanly after environmental interaction ends
  const finishInteraction = useCallback(() => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    const s = animState.current;
    if (s.botState !== "interacting") return;

    if (s.targetObject?.stopInteraction) {
      s.targetObject.stopInteraction();
    }
    s.targetObject = null;
    setInteractingObjType(null);

    // Retain current position, pick a wander target to walk away naturally
    pickRandomWanderTargetRef.current();

    // Resume requestAnimationFrame loop
    s.lastTime = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame((now) => updateFrameRef.current(now));
  }, []);

  const finishInteractionRef = useRef(finishInteraction);
  finishInteractionRef.current = finishInteraction;

  // Frame update loop
  const updateFrame = useCallback(
    (now: number) => {
      const s = animState.current;
      if (!s.lastTime) s.lastTime = now;
      const dt = Math.min((now - s.lastTime) / 1000, 0.1);
      s.lastTime = now;

      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const isMobile = vw < 640;
      const speed = isMobile ? 85 : 105;

      // Check session expiration if wandering
      if (
        now >= s.sessionEndTime &&
        s.action !== "exiting" &&
        s.botState !== "interacting" &&
        s.phase !== "tip_paused"
      ) {
        s.action = "exiting";
        s.botState = "exiting";
        s.phase = "running";
        s.targetObject = null;
        const exitLeft = s.currentX < vw / 2;
        s.targetX = exitLeft ? -BOT_WIDTH - 35 : vw + BOT_WIDTH + 35;
        s.targetY = Math.max(
          70,
          Math.min(vh - 60, s.currentY + (Math.random() * 80 - 40))
        );
        setBotState("exiting");
        setPhase("running");
      }

      if (s.phase === "running") {
        // Dynamic target update if seeking an environmental object
        if (s.action === "seeking_object" && s.targetObject) {
          const el = s.targetObject.getElement();
          if (!el) {
            // Object disappeared / unmounted
            s.targetObject = null;
            pickRandomWanderTargetRef.current();
            return;
          }

          const rect = el.getBoundingClientRect();
          // Abandon if scrolled off screen
          if (
            rect.bottom < 5 ||
            rect.top > vh - 5 ||
            rect.right < 5 ||
            rect.left > vw - 5
          ) {
            s.targetObject = null;
            pickRandomWanderTargetRef.current();
            return;
          }

          // Convert to viewport interaction point
          const objCenterX = rect.left + rect.width / 2;
          const isToLeft = s.currentX < objCenterX;
          s.targetX = isToLeft ? rect.left - BOT_WIDTH - 4 : rect.right + 4;
          s.targetY = rect.bottom - 26;
        }

        // Calculate 2D delta & distance
        const dx = s.targetX - s.currentX;
        const dy = s.targetY - s.currentY;
        const dist = Math.hypot(dx, dy);

        // Update horizontal facing direction smoothly
        if (Math.abs(dx) > 1.8) {
          const moveDir: Direction = dx > 0 ? "ltr" : "rtl";
          if (moveDir !== s.direction) {
            s.direction = moveDir;
            setDirection(moveDir);
          }
        }

        const step = speed * dt;

        // Check arrival
        if (dist <= 8 || step >= dist) {
          s.currentX = s.targetX;
          s.currentY = s.targetY;

          // 1. If exiting, complete the session cleanly
          if (s.action === "exiting") {
            cleanupRun();
            if (settingsRef.current.enabled) {
              const delay = getIntervalDelay(
                settingsRef.current.interval,
                isMobile,
                false
              );
              timerRef.current = setTimeout(() => {
                startRunRef.current();
              }, delay);
            }
            return;
          }

          // 2. If seeking object, enter INTERACTING state
          if (s.action === "seeking_object" && s.targetObject) {
            const targetObj = s.targetObject;
            s.botState = "interacting";
            s.phase = "interacting";
            s.action = "interacting";
            setBotState("interacting");
            setPhase("interacting");
            setInteractingObjType(targetObj.type);

            const el = targetObj.getElement();
            if (el) {
              const rect = el.getBoundingClientRect();
              const faceDir: Direction =
                s.currentX < rect.left + rect.width / 2 ? "ltr" : "rtl";
              s.direction = faceDir;
              setDirection(faceDir);
            }

            // Immediately cancel RAF movement loop so bot is 100% stationary
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }

            // Object-specific interaction duration
            const duration =
              OBJECT_INTERACTION_DURATIONS[targetObj.type] || 2500;
            targetObj.triggerInteraction(duration);

            // Primary completion timer
            pauseTimerRef.current = setTimeout(() => {
              finishInteractionRef.current();
            }, duration);

            // Defensive hard safety timeout: NEVER stuck > 5000ms
            safetyTimerRef.current = setTimeout(() => {
              finishInteractionRef.current();
            }, MAX_INTERACTION_DURATION);

            return;
          }

          // 3. If wandering, brief pause or choose next waypoint
          if (s.action === "wandering") {
            if (settingsRef.current.behaviour && Math.random() < 0.25) {
              s.phase = "looking";
              setPhase("looking");
              pauseTimerRef.current = setTimeout(() => {
                if (animState.current.phase === "looking") {
                  chooseNextDestinationRef.current();
                }
              }, 1000);
            } else {
              chooseNextDestinationRef.current();
            }
          }
        } else {
          // Advance along 2D movement vector
          s.currentX += (dx / dist) * step;
          s.currentY += (dy / dist) * step;
        }

        // Direct DOM transform
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${s.currentX}px, ${s.currentY}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(updateFrame);
    },
    [cleanupRun]
  );
  updateFrameRef.current = updateFrame;

  // Start a new free-roaming session
  const startRun = useCallback(() => {
    // Check reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const isMobile = vw < 640;

    // Check showOnMobile setting
    if (isMobile && !settingsRef.current.showOnMobile) {
      if (settingsRef.current.enabled) {
        const delay = getIntervalDelay(
          settingsRef.current.interval,
          isMobile,
          false
        );
        timerRef.current = setTimeout(() => startRun(), delay);
      }
      return;
    }

    // Spawn at a random edge of the screen
    const edge = Math.floor(Math.random() * 4);
    let startX = 0;
    let startY = 0;

    if (edge === 0) {
      // Left edge
      startX = -BOT_WIDTH - 20;
      startY = Math.floor(vh * (0.2 + Math.random() * 0.6));
    } else if (edge === 1) {
      // Right edge
      startX = vw + BOT_WIDTH + 20;
      startY = Math.floor(vh * (0.2 + Math.random() * 0.6));
    } else if (edge === 2) {
      // Bottom edge
      startX = Math.floor(vw * (0.2 + Math.random() * 0.6));
      startY = vh + BOT_WIDTH + 10;
    } else {
      // Top edge (below navbar)
      startX = Math.floor(vw * (0.2 + Math.random() * 0.6));
      startY = 40;
    }

    // Pick first destination in safe area
    const safeMinX = 50;
    const safeMaxX = vw - 50 - BOT_WIDTH;
    const safeMinY = 80;
    const safeMaxY = vh - 60;

    const firstTargetX = Math.floor(
      safeMinX + Math.random() * (safeMaxX - safeMinX)
    );
    const firstTargetY = Math.floor(
      safeMinY + Math.random() * (safeMaxY - safeMinY)
    );
    const initialDir: Direction = firstTargetX >= startX ? "ltr" : "rtl";

    // Session duration: 18–28 seconds of natural wandering before exit
    const sessionDuration = 18000 + Math.random() * 10000;

    animState.current = {
      currentX: startX,
      currentY: startY,
      targetX: firstTargetX,
      targetY: firstTargetY,
      direction: initialDir,
      phase: "running",
      action: "wandering",
      botState: "wandering",
      targetObject: null,
      sessionEndTime: performance.now() + sessionDuration,
      lastTime: performance.now(),
    };

    setDirection(initialDir);
    setPhase("running");
    setBotState("wandering");
    setInteractingObjType(null);
    setActiveTip(null);
    setTipPosition(null);
    setActive(true);

    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateFrame);
  }, [updateFrame]);

  // Keep a ref to startRun so updateFrame and timers can call it without circular dependencies
  const startRunRef = useRef(startRun);
  startRunRef.current = startRun;

  // Handle click on the bot: stop movement, show developer tip, then resume
  // Priority rule: developer tip immediately overrides any environmental interaction!
  const handleBotClick = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const s = animState.current;
    if (s.phase === "tip_paused" || !activeRef.current) return;

    // Immediately cancel primary interaction timer and safety timeout
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    // Cancel active object interaction
    if (s.targetObject?.stopInteraction) {
      s.targetObject.stopInteraction();
    }
    s.targetObject = null;

    s.botState = "paused-for-tip";
    s.phase = "tip_paused";
    setBotState("paused-for-tip");
    setPhase("tip_paused");
    setInteractingObjType(null);

    // Cancel RAF loop during tip display
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Select tip from shuffle-bag
    const tip = getNextDeveloperTip();
    setActiveTip(tip);

    // Calculate viewport-aware tooltip position
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const botX = s.currentX;
    const botY = s.currentY;

    const tipWidth = 230;
    const tipHeight = 55;

    const idealLeft = botX + 15 - tipWidth / 2;
    const clampedLeft = Math.max(12, Math.min(idealLeft, vw - tipWidth - 12));
    const tailOffset = Math.max(
      16,
      Math.min(botX + 15 - clampedLeft, tipWidth - 16)
    );

    const isAbove = botY > 110;
    const tipTop = isAbove ? botY - tipHeight - 12 : botY + 36;

    setTipPosition({
      left: clampedLeft,
      top: tipTop,
      isAbove,
      tailOffset,
    });

    const duration = 3000 + Math.random() * 2000;

    if (tipTimerRef.current) clearTimeout(tipTimerRef.current);
    tipTimerRef.current = setTimeout(() => {
      setActiveTip(null);
      setTipPosition(null);

      // Resume wandering from exact current position
      pickRandomWanderTargetRef.current();

      s.lastTime = performance.now();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame((now) => updateFrameRef.current(now));
    }, duration);
  }, []);

  const handleBotClickRef = useRef(handleBotClick);
  handleBotClickRef.current = handleBotClick;

  // Primary lifecycle effect: schedule runs and listen to tab visibility
  useEffect(() => {
    if (!enabled) {
      cleanupRun();
      return;
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Schedule initial run (short 4-8s delay so user sees it right away)
    if (timerRef.current) clearTimeout(timerRef.current);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const delay = getIntervalDelay(
      settingsRef.current.interval,
      isMobile,
      true
    );
    timerRef.current = setTimeout(() => {
      startRunRef.current();
    }, delay);

    // Handle tab visibility (cancel or reschedule)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cleanupRun();
      } else if (settingsRef.current.enabled) {
        if (timerRef.current) clearTimeout(timerRef.current);
        const curMobile =
          typeof window !== "undefined" && window.innerWidth < 640;
        const curDelay = getIntervalDelay(
          settingsRef.current.interval,
          curMobile,
          false
        );
        timerRef.current = setTimeout(() => {
          startRunRef.current();
        }, curDelay);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cleanupRun();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, cleanupRun]);

  // Reschedule if interval changes while currently idle/waiting
  const prevIntervalRef = useRef(interval);
  useEffect(() => {
    if (prevIntervalRef.current !== interval) {
      prevIntervalRef.current = interval;
      if (enabled && !activeRef.current) {
        if (timerRef.current) clearTimeout(timerRef.current);
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 640;
        const delay = getIntervalDelay(interval, isMobile, false);
        timerRef.current = setTimeout(() => {
          startRunRef.current();
        }, delay);
      }
    }
  }, [interval, enabled]);

  // Expose global window triggers for developer testing (attached once on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      (
        window as unknown as { __triggerRoamingBot?: () => void }
      ).__triggerRoamingBot = () => {
        cleanupRun();
        startRunRef.current();
      };
      (
        window as unknown as { __triggerBotTip?: () => void }
      ).__triggerBotTip = () => {
        handleBotClickRef.current();
      };
      (
        window as unknown as { __triggerObjectInteraction?: () => boolean }
      ).__triggerObjectInteraction = () => {
        cleanupRun();
        const allObjects = getRegisteredWorldObjects();
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const visibleObjects = allObjects.filter((obj) => {
          const el = obj.getElement();
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.top >= 20 &&
            rect.bottom <= vh - 20 &&
            rect.left >= 20 &&
            rect.right <= vw - 20
          );
        });
        if (visibleObjects.length === 0) return false;

        const target = visibleObjects[0];
        const dir: Direction = Math.random() > 0.5 ? "ltr" : "rtl";
        const startX = dir === "ltr" ? -BOT_WIDTH - 20 : vw + BOT_WIDTH + 20;
        const startY = Math.floor(vh * 0.4);

        animState.current = {
          currentX: startX,
          currentY: startY,
          targetX: startX,
          targetY: startY,
          direction: dir,
          phase: "running",
          action: "seeking_object",
          botState: "approaching",
          targetObject: target,
          sessionEndTime: performance.now() + 25000,
          lastTime: performance.now(),
        };

        setDirection(dir);
        setPhase("running");
        setBotState("approaching");
        setInteractingObjType(target.type);
        setActiveTip(null);
        setTipPosition(null);
        setActive(true);

        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
        }

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateFrame);
        return true;
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as unknown as { __triggerRoamingBot?: () => void })
          .__triggerRoamingBot;
        delete (window as unknown as { __triggerBotTip?: () => void })
          .__triggerBotTip;
        delete (
          window as unknown as { __triggerObjectInteraction?: () => boolean }
        ).__triggerObjectInteraction;
      }
    };
  }, [cleanupRun, updateFrame]);

  // Render container always (so containerRef is persistently in the DOM)
  return (
    <div
      aria-hidden={!active}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 35, // Above page cards & content, below Navbar (z-50) & Settings (z-9999)
        display: enabled ? "block" : "none",
      }}
    >
      {/* Bot Position Container */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 32,
          height: 28,
          willChange: "transform",
          pointerEvents: "none",
          visibility: active ? "visible" : "hidden",
        }}
      >
        {/* Oriented Interactive Sprite Button */}
        <button
          type="button"
          aria-label="Developer debugging tip"
          onClick={handleBotClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBotClick();
            }
          }}
          className={`roaming-bot-sprite ${direction} phase-${phase} state-${botState} ${
            interactingObjType ? `interact-${interactingObjType}` : ""
          }`}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transform: direction === "rtl" ? "scaleX(-1)" : "scaleX(1)",
            transformOrigin: "center center",
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            pointerEvents: active ? "auto" : "none", // Only the bot element receives clicks!
            outline: "none",
          }}
        >
          {/* Subtle Ground Shadow */}
          <div className="roaming-bot-shadow" />

          {/* Character Body & Motion */}
          <div className="roaming-bot-body-wrapper">
            <BotAvatarSvg
              avatar={avatar}
              width={30}
              height={24}
              showLegAnimations={
                (botState === "wandering" ||
                  botState === "approaching" ||
                  botState === "exiting") &&
                phase === "running"
              }
            />
          </div>
        </button>
      </div>

      {/* Developer Tip Speech Bubble Tooltip */}
      {active && activeTip && tipPosition && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            left: tipPosition.left,
            top: tipPosition.top,
            width: 230,
            padding: "8px 12px",
            borderRadius: 9,
            background: "rgba(13, 15, 22, 0.96)",
            border: "1px solid rgba(52, 211, 153, 0.35)",
            boxShadow:
              "0 8px 30px rgba(0, 0, 0, 0.75), 0 0 14px rgba(52, 211, 153, 0.15)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            pointerEvents: "none",
            zIndex: 36,
            fontFamily: "var(--font-geist-mono), monospace",
            animation: "tipPopIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Header with status dot */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 4,
              userSelect: "none",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgb(52, 211, 153)",
                boxShadow: "0 0 6px rgba(52, 211, 153, 0.8)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgb(52, 211, 153)",
              }}
            >
              Dev Tip
            </span>
          </div>

          {/* Tip text */}
          <div
            style={{
              fontSize: 10.5,
              lineHeight: 1.45,
              color: "rgb(228, 228, 231)",
              fontWeight: 450,
            }}
          >
            &ldquo;{activeTip}&rdquo;
          </div>

          {/* Speech bubble tail pointer */}
          <div
            style={{
              position: "absolute",
              left: tipPosition.tailOffset,
              ...(tipPosition.isAbove
                ? {
                    bottom: -6,
                    borderTop: "6px solid rgba(13, 15, 22, 0.96)",
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                  }
                : {
                    top: -6,
                    borderBottom: "6px solid rgba(13, 15, 22, 0.96)",
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                  }),
              width: 0,
              height: 0,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}

      {/* Scoped CSS Keyframe Animations for Natural Movement */}
      <style jsx>{`
        /* Running Bob - ONLY active while running & moving */
        .state-wandering.phase-running .roaming-bot-body-wrapper,
        .state-approaching.phase-running .roaming-bot-body-wrapper,
        .state-exiting.phase-running .roaming-bot-body-wrapper {
          animation: botRunningBob 0.24s ease-in-out infinite alternate;
        }

        /* Legs Swing Alternation - ONLY active while running & moving */
        .state-wandering.phase-running :global(.roaming-bot-leg-left),
        .state-approaching.phase-running :global(.roaming-bot-leg-left),
        .state-exiting.phase-running :global(.roaming-bot-leg-left) {
          transform-origin: 11.25px 17px;
          animation: botLegSwingLeft 0.24s ease-in-out infinite alternate;
        }

        .state-wandering.phase-running :global(.roaming-bot-leg-right),
        .state-approaching.phase-running :global(.roaming-bot-leg-right),
        .state-exiting.phase-running :global(.roaming-bot-leg-right) {
          transform-origin: 17.75px 17px;
          animation: botLegSwingRight 0.24s ease-in-out infinite alternate;
        }

        /* Dynamic Ground Shadow while running */
        .roaming-bot-shadow {
          position: absolute;
          bottom: 1px;
          left: 6px;
          width: 18px;
          height: 3px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.45);
          filter: blur(1px);
        }

        .state-wandering.phase-running .roaming-bot-shadow,
        .state-approaching.phase-running .roaming-bot-shadow,
        .state-exiting.phase-running .roaming-bot-shadow {
          animation: botShadowPulse 0.24s ease-in-out infinite alternate;
        }

        /* Pause & Look Around */
        .phase-looking .roaming-bot-body-wrapper {
          animation: botLookTilt 1.6s ease-in-out infinite;
        }

        .phase-looking :global(.roaming-bot-eyes) {
          animation: botEyeScan 1.6s ease-in-out infinite;
        }

        /* Curious Hop */
        .phase-hop .roaming-bot-body-wrapper {
          animation: botCuriousHop 0.9s ease-out;
        }

        .phase-hop .roaming-bot-shadow {
          animation: botHopShadow 0.9s ease-out;
        }

        /* While paused during tip: standing posture with subtle eye look */
        .state-paused-for-tip .roaming-bot-body-wrapper,
        .phase-tip_paused .roaming-bot-body-wrapper {
          transform: translateY(0);
          animation: none !important;
        }

        .state-paused-for-tip :global(.roaming-bot-eyes),
        .phase-tip_paused :global(.roaming-bot-eyes) {
          animation: botTipEyes 1.8s ease-in-out infinite;
        }

        /* CRITICAL: When INTERACTING, completely freeze legs, body bob, and shadow */
        .state-interacting .roaming-bot-body-wrapper,
        .phase-interacting .roaming-bot-body-wrapper {
          animation: none !important;
          transform: translateY(0) !important;
        }

        .state-interacting :global(.roaming-bot-leg-left),
        .state-interacting :global(.roaming-bot-leg-right),
        .phase-interacting :global(.roaming-bot-leg-left),
        .phase-interacting :global(.roaming-bot-leg-right),
        :global(.roaming-bot-leg-idle) {
          animation: none !important;
          transform: none !important;
        }

        .state-interacting .roaming-bot-shadow,
        .phase-interacting .roaming-bot-shadow {
          animation: none !important;
          transform: scaleX(1) !important;
          opacity: 0.45 !important;
        }

        /* While interacting with Crate: the bot performs a cute hop over it */
        .state-interacting.interact-crate .roaming-bot-body-wrapper {
          animation: botCrateHop 1.6s ease-in-out forwards !important;
        }

        .state-interacting.interact-crate .roaming-bot-shadow {
          animation: botCrateShadow 1.6s ease-in-out forwards !important;
        }

        /* Eyes looking toward the object during other interactions */
        .state-interacting:not(.interact-crate) :global(.roaming-bot-eyes) {
          animation: botInteractEyes 1.6s ease-in-out infinite;
        }

        @keyframes botCrateHop {
          0% {
            transform: translateY(0);
          }
          20% {
            transform: translateY(1.5px) scale(0.96);
          }
          50% {
            transform: translateY(-13px) scale(1.05);
          }
          75% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes botCrateShadow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.45;
          }
          20% {
            transform: scale(1.1);
            opacity: 0.55;
          }
          50% {
            transform: scale(0.5);
            opacity: 0.2;
          }
          75% {
            transform: scale(1);
            opacity: 0.45;
          }
        }

        @keyframes botInteractEyes {
          0%,
          100% {
            transform: translateX(0);
          }
          35%,
          65% {
            transform: translateX(1.5px);
          }
        }

        @keyframes botTipEyes {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-0.75px);
          }
        }

        @keyframes tipPopIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(4px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes botRunningBob {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-1.8px);
          }
        }

        @keyframes botLegSwingLeft {
          0% {
            transform: rotate(24deg);
          }
          100% {
            transform: rotate(-24deg);
          }
        }

        @keyframes botLegSwingRight {
          0% {
            transform: rotate(-24deg);
          }
          100% {
            transform: rotate(24deg);
          }
        }

        @keyframes botShadowPulse {
          0% {
            transform: scaleX(0.85);
            opacity: 0.5;
          }
          100% {
            transform: scaleX(1.1);
            opacity: 0.3;
          }
        }

        @keyframes botLookTilt {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-3deg) translateY(-0.5px);
          }
          75% {
            transform: rotate(3deg) translateY(-0.5px);
          }
        }

        @keyframes botEyeScan {
          0%,
          100% {
            transform: translateX(0);
          }
          30% {
            transform: translateX(-1.5px);
          }
          70% {
            transform: translateX(1.5px);
          }
        }

        @keyframes botCuriousHop {
          0%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4.5px);
          }
          55% {
            transform: translateY(0);
          }
          70% {
            transform: translateY(-1.5px);
          }
        }

        @keyframes botHopShadow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.45;
          }
          30% {
            transform: scale(0.65);
            opacity: 0.2;
          }
          55% {
            transform: scale(1);
            opacity: 0.45;
          }
        }
      `}</style>
    </div>
  );
}
