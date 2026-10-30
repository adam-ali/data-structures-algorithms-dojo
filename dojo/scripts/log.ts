/**
 * Record an attempt in progress/log.json.
 * Runs the problem's tests itself, so pass/fail is never self-reported.
 *
 *   npm run log -- two-pointers/001 --mins 18 --hints 1 --notes "forgot dup skip"
 *
 * The problem argument can be a prefix: "two-pointers/001" matches
 * "problems/02-two-pointers/level-1/001-pair-sum-sorted".
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";
import { ROOT, appendAttempt, readLog, topicState, CLEAN_SOLVES_TO_LEVEL_UP } from "../lib/progress.ts";

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    mins: { type: "string" },
    hints: { type: "string", default: "0" },
    notes: { type: "string" },
  },
});

const arg = positionals[0];
if (!arg) {
  console.error('Usage: npm run log -- <topic>/<number> [--mins N] [--hints N] [--notes "..."]');
  process.exit(1);
}

const [rawTopic, prefix = ""] = arg.replace(/^problems\//, "").split("/");
// Topic folders are numbered for ordering ("02-two-pointers"); the topic id drops the number.
const topic = rawTopic!.replace(/^\d+-/, "");
const topicFolder = readdirSync(join(ROOT, "problems")).find((d) => d.replace(/^\d+-/, "") === topic);
if (!topicFolder) {
  console.error(`No topic folder for: ${topic}`);
  process.exit(1);
}
const topicDir = join(ROOT, "problems", topicFolder);
// Problems live in level subfolders; NNN is unique across the whole topic.
const found = readdirSync(topicDir)
  .filter((l) => l.startsWith("level-"))
  .flatMap((l) => readdirSync(join(topicDir, l)).map((d) => [l, d] as const))
  .find(([, d]) => d.startsWith(prefix) && d !== ".gitkeep");
if (!found) {
  console.error(`No problem matching "${prefix}" in problems/${topicFolder}`);
  process.exit(1);
}
const [levelFolder, match] = found;

const problemDir = join(topicDir, levelFolder, match);
const meta = JSON.parse(readFileSync(join(problemDir, "meta.json"), "utf8")) as { level: number };

const run = spawnSync("npx", ["vitest", "run", problemDir, "--reporter=json"], {
  cwd: ROOT,
  encoding: "utf8",
});
let passed = 0;
let total = 0;
try {
  const report = JSON.parse(run.stdout.slice(run.stdout.indexOf("{")));
  passed = report.numPassedTests;
  total = report.numTotalTests;
} catch {
  console.error("Couldn't read test results. Run `npm test` to see what's wrong.");
  console.error(run.stderr);
  process.exit(1);
}

const solved = total > 0 && passed === total;
const hints = Number(values.hints);
const before = topicState(readLog(), topic!).level;

appendAttempt({
  date: new Date().toISOString(),
  topic: topic!,
  level: meta.level,
  problem: `${topic}/${match}`,
  passed,
  total,
  solved,
  minutes: values.mins ? Number(values.mins) : null,
  hints,
  ...(values.notes ? { notes: values.notes } : {}),
});

const after = topicState(readLog(), topic!);
console.log(`\n${solved ? "✅ Solved" : "❌ Not yet"}: ${passed}/${total} tests — logged ${topic}/${match}`);
if (after.level > before) {
  console.log(`🎉 Level up! ${topic} is now level ${after.level}.`);
} else if (solved && hints === 0) {
  console.log(`Clean solve ${after.cleanAtLevel}/${CLEAN_SOLVES_TO_LEVEL_UP} toward the next level.`);
}
