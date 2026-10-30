/**
 * npm run today  → your suggested topic for today, plus a compact table
 * npm run stats  → same, plus your recent attempts
 */
import { TOPICS } from "../lib/topics.ts";
import { readLog, topicState, CLEAN_SOLVES_TO_LEVEL_UP } from "../lib/progress.ts";

const full = process.argv.includes("--full");
const log = readLog();
const now = Date.now();
const DAY = 86_400_000;

const rows = TOPICS.map((t) => {
  const s = topicState(log, t.id);
  const daysAgo = s.lastPractised ? Math.floor((now - s.lastPractised.getTime()) / DAY) : null;
  return { t, s, daysAgo };
});

const fmtDays = (d: number | null) => (d == null ? "never" : d === 0 ? "today" : `${d}d ago`);

console.log("\nTopic                       Lvl  Clean  Solved  Avg   Last");
console.log("─".repeat(64));
for (const { t, s, daysAgo } of rows) {
  if (!full && s.attempts === 0) continue;
  console.log(
    t.name.padEnd(28) +
      String(s.level).padEnd(5) +
      `${s.cleanAtLevel}/${CLEAN_SOLVES_TO_LEVEL_UP}`.padEnd(7) +
      `${s.solved}/${s.attempts}`.padEnd(8) +
      (s.avgMinutes != null ? `${s.avgMinutes}m` : "–").padEnd(6) +
      fmtDays(daysAgo),
  );
}
if (!full && log.length === 0) console.log("(no attempts yet — `npm run stats` shows every topic)");

// Suggestions: keep the current topic going, and resurface something going stale.
const started = rows.filter((r) => r.s.attempts > 0);
const recent = [...started].sort((a, b) => (a.daysAgo ?? 0) - (b.daysAgo ?? 0))[0];
const stale = started.filter((r) => (r.daysAgo ?? 0) >= 7).sort((a, b) => (b.daysAgo ?? 0) - (a.daysAgo ?? 0))[0];
const next = rows.find((r) => r.s.attempts === 0);

console.log("\nSuggested for today:");
if (recent) {
  const lvl = recent.t.levels[recent.s.level - 1];
  console.log(`  • Continue: ${recent.t.name} — level ${recent.s.level} (${lvl})`);
}
if (stale) console.log(`  • Review:   ${stale.t.name} — last practised ${fmtDays(stale.daysAgo)}`);
if (next && (!recent || recent.s.level >= 3)) console.log(`  • New:      ${next.t.name} — level 1 (${next.t.levels[0]})`);
if (!recent && !next) console.log("  • Everything's started — pick your weakest from the table.");

if (full && log.length) {
  console.log("\nRecent attempts:");
  for (const a of log.slice(-10).reverse()) {
    console.log(
      `  ${a.date.slice(0, 10)}  ${a.solved ? "✅" : "❌"} ${a.problem}  L${a.level}  ` +
        `${a.passed}/${a.total}  ${a.minutes ?? "–"}m  hints:${a.hints}${a.notes ? `  — ${a.notes}` : ""}`,
    );
  }
}
console.log();
