# Scrambled Word Hunt

**Topic:** Sliding Window · **Level 3** — variable window with a frequency map
**Target:** O(n) time (the alphabet is fixed), O(1) extra space

A puzzle book hides scrambled copies of a secret `word` inside a long lowercase string `text`. A scrambled copy is a stretch of `text` of **exactly** `word.length` consecutive characters that uses the same letters as `word` the same number of times, in any order.

Return the **start indices** of all scrambled copies, in **increasing** order. Copies may overlap. If `word` is empty or longer than `text`, return `[]`.

## Examples

```
text = "cbaebabacd", word = "abc"  →  [0, 6]
  "cba" at 0 and "bac" at 6
text = "abab",       word = "ab"   →  [0, 1, 2]
```

## Constraints

- `0 <= word.length, text.length <= 300_000`
- `text` and `word` contain only lowercase letters `a`–`z`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Order doesn't matter, only how many of each letter. Two stretches match exactly when their letter counts are equal. Re-counting every stretch from scratch is too slow, so think about how the counts change as the stretch moves one step.
</details>

<details>
<summary>Hint 2</summary>

Keep one count per letter for `word` and one for the current stretch (or a single "still needed" count plus a number of letters not yet satisfied). Each step adds one letter and removes one, and updates the number of mismatching letters in O(1).
</details>
