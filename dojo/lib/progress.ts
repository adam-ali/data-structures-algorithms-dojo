import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const LOG_PATH = join(ROOT, "progress", "log.json");

export interface Attempt {
  date: string; // ISO timestamp
  topic: string;
  level: number;
  problem: string; // e.g. "two-pointers/001-pair-sum-sorted"
  passed: number;
  total: number;
  solved: boolean; // all tests green
  minutes: number | null;
  hints: number;
  notes?: string;
}

export function readLog(): Attempt[] {
  if (!existsSync(LOG_PATH)) return [];
  return JSON.parse(readFileSync(LOG_PATH, "utf8")) as Attempt[];
}

export function appendAttempt(a: Attempt): void {
  const log = readLog();
  log.push(a);
  writeFileSync(LOG_PATH, JSON.stringify(log, null, 2) + "\n");
}

/** A level counts as "cleared" after this many solves at that level with no hints. */
export const CLEAN_SOLVES_TO_LEVEL_UP = 3;

export interface TopicState {
  level: number; // level to practise next
  attempts: number;
  solved: number;
  cleanAtLevel: number;
  lastPractised: Date | null;
  avgMinutes: number | null;
}

export function topicState(log: Attempt[], topic: string): TopicState {
  const rows = log.filter((a) => a.topic === topic);
  let level = 1;
  let cleanAtLevel = 0;
  for (const a of rows) {
    if (a.level !== level) continue;
    if (a.solved && a.hints === 0) cleanAtLevel++;
    if (cleanAtLevel >= CLEAN_SOLVES_TO_LEVEL_UP && level < 4) {
      level++;
      cleanAtLevel = 0;
    }
  }
  const timed = rows.filter((a) => a.solved && a.minutes != null);
  const last = rows.at(-1);
  return {
    level,
    attempts: rows.length,
    solved: rows.filter((a) => a.solved).length,
    cleanAtLevel,
    lastPractised: last ? new Date(last.date) : null,
    avgMinutes: timed.length
      ? Math.round(timed.reduce((s, a) => s + (a.minutes ?? 0), 0) / timed.length)
      : null,
  };
}
