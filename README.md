# DSA Dojo

Kumon-style daily DSA practice in TypeScript. Small problems, 5–10 tests each, levelled per topic, with a progress log.

## Setup

```bash
npm install
git init && git add . && git commit -m "Set up DSA dojo"
```

## Daily loop

1. **See what to practise**
   ```bash
   npm run today
   ```
2. **Get a problem.** In Claude Code, in this folder:
   > give me today's problem
   or "new sliding-window problem", "next two-pointers, level 2". `CLAUDE.md` tells Claude how to generate, verify, and hand it over.
3. **Solve it.** Open `problem.md`, write your code in `solution.ts`, and keep tests running:
   ```bash
   npm run practice
   ```
4. **Log it.** Tests run automatically, so pass/fail is recorded honestly:
   ```bash
   npm run log -- two-pointers/001 --mins 18 --hints 1 --notes "forgot duplicate case"
   ```
5. **Optional review.** Ask Claude to "review my solution", or compare with `.reference/`.

## Levels

Each topic has 4 levels (see `lib/topics.ts`), from the bare pattern up to disguised or combined problems.
**3 hint-free solves at a level moves you up.** Logging a failed attempt is fine: it doesn't count against you, it's just data.

## Commands

| Command | What it does |
|---|---|
| `npm run today` | Suggestions for today, and topics you've started |
| `npm run stats` | Every topic, plus your last 10 attempts |
| `npm run practice` | Vitest in watch mode |
| `npm run log -- <topic>/<num> [--mins N] [--hints N] [--notes "..."]` | Run the problem's tests and record the attempt |
| `npm run typecheck` | Type-check everything |

## Layout

```
problems/<topic>/<NNN>-<slug>/   problem.md · meta.json · solution.ts · solution.test.ts
.reference/<topic>/              reference solutions (spoilers)
progress/log.json                your attempt history
lib/topics.ts                    topics and level definitions
```
