/**
 * Ephemeral In-Memory Server Log Stream
 *
 * NOTE: This buffer is intentionally ephemeral and in-memory.
 * It provides live observability for playground events within a running application instance.
 * It does not persist across deployments, cold starts, or multiple serverless instances,
 * and is not intended as a durable production logging system.
 */

export type LogLevel = "INFO" | "WARN" | "ERROR";
export type LogSource = "http" | "db" | "validator" | "server";

export interface ServerLogEntry {
  id: string;
  timestamp: string; // ISO string
  timeDisplay: string; // HH:mm:ss
  level: LogLevel;
  source: LogSource;
  message: string;
  result?: string;
  status?: number;
  durationMs?: number;
}

declare global {
  // eslint-disable-next-line no-var
  var _playgroundLogs: ServerLogEntry[] | undefined;
}

const MAX_LOG_CAPACITY = 100;

function formatTime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function getLogStore(): ServerLogEntry[] {
  if (!global._playgroundLogs) {
    global._playgroundLogs = [];
  }
  return global._playgroundLogs;
}

/**
 * Emits a sanitized public-safe server log event into the in-memory buffer.
 */
export function emitServerLog(
  entry: Omit<ServerLogEntry, "id" | "timestamp" | "timeDisplay">
): ServerLogEntry {
  const store = getLogStore();
  const now = new Date();

  const log: ServerLogEntry = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: now.toISOString(),
    timeDisplay: formatTime(now),
    ...entry,
  };

  store.push(log);
  if (store.length > MAX_LOG_CAPACITY) {
    store.splice(0, store.length - MAX_LOG_CAPACITY);
  }

  return log;
}

/**
 * Retrieves the most recent public server log events.
 */
export function getRecentServerLogs(limit = 50): ServerLogEntry[] {
  const store = getLogStore();
  return store.slice(-limit);
}
