# DSA Dojo — instructions for Claude

This repo is a Kumon-style daily practice playground for data structures & algorithms, used for interview prep.
The user is a very proficient TypeScript developer. **Never write or edit their `solution.ts` after generating it** unless they explicitly ask for help.

## When asked for a new problem

Requests look like: "new two-pointers problem", "give me today's problem", "next sliding window, level 2".

1. **Pick topic + level.** If not given, run `npm run today` and use the "Continue" suggestion. Topic ids and what each level means are in `lib/topics.ts`; the user's current level per topic comes from `npm run stats`. Use the user's current level unless they ask for another.
2. **Avoid repeats.** List existing folders in `problems/<topic>/` and don't reuse a problem idea already there. Vary the framing (story, data shape) so the pattern has to be recognised, especially at levels 3–4.
3. **Create** `problems/<topic>/<NNN>-<kebab-slug>/` (NNN = next number in that topic, zero-padded) containing:
   - `problem.md` — title, `**Topic:** … · **Level N** — <level description>`, target complexity, statement, 2 examples, constraints, then 2 progressive hints in `<details>` blocks. Follow `problems/two-pointers/001-pair-sum-sorted/problem.md` as the template. Don't name the exact technique in the statement at level 3+.
   - `meta.json` — `{ topic, level, title, created }`.
   - `solution.ts` — exported function with a fully typed signature and a `// your code here` body returning a type-correct placeholder. If the problem needs a data structure (ListNode, TreeNode, graph), define and export it here, plus small builder helpers the tests use.
   - `solution.test.ts` — **5–10 `it` blocks** importing from `./solution`: 1–2 happy paths, then edge cases (empty, single element, duplicates, negatives, boundaries), and **one large-input test** sized so an O(n²) solution trips the 2s timeout when the target is O(n) or O(n log n). Make the expected output unambiguous: specify ordering/tie-breaks in the statement, or compare sorted results.
4. **Verify before handing over.** Write a reference solution to `.reference/<topic>/<NNN>-<slug>.ts`. Temporarily copy it over `solution.ts`, run `npx vitest run problems/<topic>/<folder>`, confirm all tests pass, then restore the stub and run again to confirm the tests fail. Also run `npm run typecheck`. Fix tests that are wrong; never ship an unverified problem.
5. **Reply briefly**: the folder path, the one-line problem summary, and the reminder below. Don't reveal the approach.

> Solve in `solution.ts` with `npm run practice` running. When done: `npm run log -- <topic>/<NNN> --mins <m> --hints <h>`

## When the user asks for review after solving

Compare their solution with the reference: correctness, complexity, edge cases, and idiomatic TS. Point out the pattern's general shape so it transfers. Be honest about inefficiencies even if tests pass.

## Progress log

- `progress/log.json` is written by `npm run log` only. Don't edit it by hand unless asked.
- Level-up rule (in `lib/progress.ts`): 3 hint-free solves at a level → next level (max 4).
