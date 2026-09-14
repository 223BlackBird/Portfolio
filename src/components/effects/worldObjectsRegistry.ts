export type WorldObjectType =
  | "toy"
  | "vending-machine"
  | "charging-station"
  | "terminal"
  | "crate"
  | "plant";

export interface WorldObjectItem {
  id: string;
  type: WorldObjectType;
  getElement: () => HTMLElement | null;
  triggerInteraction: (durationMs?: number) => void;
  stopInteraction?: () => void;
}

const registry = new Map<string, WorldObjectItem>();

export function registerWorldObject(item: WorldObjectItem): void {
  registry.set(item.id, item);
}

export function unregisterWorldObject(id: string): void {
  registry.delete(id);
}

export function getRegisteredWorldObjects(): WorldObjectItem[] {
  return Array.from(registry.values());
}
