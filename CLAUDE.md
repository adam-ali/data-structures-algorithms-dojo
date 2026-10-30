# DSA Dojo — instructions for Claude

This repo is a Kumon-style daily practice playground for data structures & algorithms, used for interview prep.
The user is a very proficient TypeScript developer. **Never write or edit their `solution.ts` after generating it** unless they explicitly ask for help.

## Levels

Every topic has 4 levels. Each problem goes in its level's folder: `problems/<NN>-<topic>/level-<L>/`.
The exact meaning per topic is in `dojo/lib/topics.ts`; the general idea is:

- **Level 1: Bare pattern.** The textbook form, with the technique plain to see from the statement (e.g. two pointers on a sorted array). The aim is to get the template into muscle memory.
- **Level 2: Variation.** The same pattern with a twist: a different pointer or window movement, an in-place edit, bounds or first/last occurrence. The setup still points to the technique.
- **Level 3: Recognition.** The pattern needs a preparation step (sort first, a frequency map, a monotonic invariant), or the story hides the technique. Don't name the technique in the statement.
- **Level 4: Disguised or combined.** Interview-hard: the pattern is fully disguised or combined with another one (e.g. hashing + sequences, trie + grid backtracking, union-find + shortest paths).

## When asked for a new problem

Requests look like: "new two-pointers problem", "give me today's problem", "next sliding window, level 2".

1. **Pick topic + level.** If not given, run `npm run today` and use the "Continue" suggestion. Topic ids and what each level means are in `dojo/lib/topics.ts`; the user's current level per topic comes from `npm run stats`. Use the user's current level unless they ask for another.
2. **Avoid repeats.** List existing problems in every `problems/<NN>-<topic>/level-*/` folder and don't reuse a problem idea already there. Vary the framing (story, data shape) so the pattern has to be recognised, especially at levels 3–4.
3. **Create** `problems/<NN>-<topic>/level-<L>/<NNN>-<kebab-slug>/` (NNN = next number across the whole topic, all levels, zero-padded; delete that level's `.gitkeep` if present) containing:
   - `problem.md` — title, `**Topic:** … · **Level N** — <level description>`, target complexity, statement, 2 examples, constraints, then 2 progressive hints in `<details>` blocks. Follow `problems/02-two-pointers/level-1/001-pair-sum-sorted/problem.md` as the template. Don't name the exact technique in the statement at level 3+.
   - `meta.json` — `{ topic, level, title, created }`.
   - `solution.ts` — exported function with a fully typed signature and a `// your code here` body returning a type-correct placeholder. If the problem needs a data structure (ListNode, TreeNode, graph), define and export it here, plus small builder helpers the tests use.
   - `solution.test.ts` — **5–10 `it` blocks** importing from `./solution`: 1–2 happy paths, then edge cases (empty, single element, duplicates, negatives, boundaries), and **one large-input test** sized so an O(n²) solution fails when the target is O(n) or O(n log n). Vitest can't interrupt synchronous code, so the timeout alone never fails it: time the call with `performance.now()` and `expect(elapsed).toBeLessThan(500)`, and confirm a naive solution actually fails that test. Make the expected output unambiguous: specify ordering/tie-breaks in the statement, or compare sorted results.
4. **Verify before handing over.** Write a reference solution to `dojo/.reference/<topic>/<NNN>-<slug>.ts`. Temporarily copy it over `solution.ts`, run `npx vitest run problems/<NN>-<topic>/level-<L>/<folder>`, confirm all tests pass, then restore the stub and run again to confirm the tests fail. Also run `npm run typecheck`. Fix tests that are wrong; never ship an unverified problem.
5. **Reply briefly**: the folder path, the one-line problem summary, and the reminder below. Don't reveal the approach.

> Solve in `solution.ts` with `npm run practice` running. When done: `npm run log -- <topic>/<NNN> --mins <m> --hints <h>`

## When the user asks for review after solving

Compare their solution with the reference: correctness, complexity, edge cases, and idiomatic TS. Point out the pattern's general shape so it transfers. Be honest about inefficiencies even if tests pass.

## Progress log

- `dojo/progress/log.json` is written by `npm run log` only. Don't edit it by hand unless asked.
- Level-up rule (in `dojo/lib/progress.ts`): 3 hint-free solves at a level → next level (max 4).
