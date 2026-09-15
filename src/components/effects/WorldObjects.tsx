"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useEffects } from "./EffectsContext";
import {
  WorldObjectType,
  WorldObjectItem,
  registerWorldObject,
  unregisterWorldObject,
} from "./worldObjectsRegistry";
import { WorldObjectSprite } from "./WorldObjectSprites";

interface ObjectConfig {
  id: string;
  type: WorldObjectType;
  top: number | string;
  left?: string;
  right?: string;
}

// 1–3 sparse objects per page in verified safe whitespace gutters
const PAGE_OBJECTS: Record<string, ObjectConfig[]> = {
  "/": [
    {
      id: "home-toy",
      type: "toy",
      top: 650,
      left: "max(24px, calc(50% - 630px))",
    },
    {
      id: "home-vending",
      type: "vending-machine",
      top: 1580,
      right: "max(24px, calc(50% - 630px))",
    },
    {
      id: "home-charging",
      type: "charging-station",
      top: 2780,
      left: "max(24px, calc(50% - 630px))",
    },
  ],
  "/work": [
    {
      id: "work-terminal",
      type: "terminal",
      top: 360,
      right: "max(24px, calc(50% - 610px))",
    },
    {
      id: "work-crate",
      type: "crate",
      top: 920,
      left: "max(24px, calc(50% - 610px))",
    },
    {
      id: "work-toy",
      type: "toy",
      top: 1650,
      right: "max(24px, calc(50% - 620px))",
    },
  ],
  "/experience": [
    {
      id: "exp-vending",
      type: "vending-machine",
      top: 380,
      right: "max(24px, calc(50% - 590px))",
    },
    {
      id: "exp-terminal",
      type: "terminal",
      top: 980,
      right: "max(24px, calc(50% - 590px))",
    },
  ],
  "/about": [
    {
      id: "about-plant",
      type: "plant",
      top: 400,
      right: "max(24px, calc(50% - 620px))",
    },
    {
      id: "about-toy",
      type: "toy",
      top: 860,
      left: "max(24px, calc(50% - 610px))",
    },
    {
      id: "about-terminal",
      type: "terminal",
      top: 1380,
      right: "max(24px, calc(50% - 620px))",
    },
  ],
  "/playground": [
    {
      id: "playground-terminal",
      type: "terminal",
      top: 380,
      left: "max(24px, calc(50% - 620px))",
    },
    {
      id: "playground-crate",
      type: "crate",
      top: 860,
      right: "max(24px, calc(50% - 620px))",
    },
  ],
  "/contact": [
    {
      id: "contact-toy",
      type: "toy",
      top: 380,
      left: "max(24px, calc(50% - 580px))",
    },
    {
      id: "contact-crate",
      type: "crate",
      top: 760,
      right: "max(24px, calc(50% - 580px))",
    },
  ],
};

function SingleWorldObject({ config }: { config: ObjectConfig }) {
  const elRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const item: WorldObjectItem = {
      id: config.id,
      type: config.type,
      getElement: () => elRef.current,
      triggerInteraction: (durationMs = 2500) => {
        setIsInteracting(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setIsInteracting(false);
        }, durationMs);
      },
      stopInteraction: () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsInteracting(false);
      },
    };

    registerWorldObject(item);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      unregisterWorldObject(config.id);
    };
  }, [config.id, config.type]);

  const style: React.CSSProperties = {
    position: "absolute",
    top: typeof config.top === "number" ? `${config.top}px` : config.top,
    left: config.left,
    right: config.right,
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 15,
  };

  return (
    <div
      ref={elRef}
      id={`world-obj-${config.id}`}
      data-world-object={config.type}
      style={style}
    >
      <WorldObjectSprite type={config.type} isInteracting={isInteracting} />
    </div>
  );
}

export function WorldObjects() {
  const pathname = usePathname();
  const { settings } = useEffects();
  const { enabled } = settings.roamingBot;

  // If Roaming Bot is OFF, completely hide and remove environmental objects
  if (!enabled) {
    return null;
  }

  // Match current route or fallback to empty
  const currentObjects = PAGE_OBJECTS[pathname] || PAGE_OBJECTS["/"] || [];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 bottom-0 overflow-hidden hidden xl:block"
      style={{
        zIndex: 15, // Behind cards (z-20/30) & navbar (z-50), above base page background
      }}
    >
      {currentObjects.map((config) => (
        <SingleWorldObject key={config.id} config={config} />
      ))}
    </div>
  );
}
