# Loudest Chunk

**Topic:** Sliding Window · **Level 1** — fixed-size window
**Target:** O(n) time, O(1) extra space

A radio transcript is stored as a lowercase string `s`. The editor cuts it into chunks of exactly `k` **consecutive** characters (chunks may overlap, so every start position counts). A chunk's *loudness* is the number of vowels (`a`, `e`, `i`, `o`, `u`) in it.

Return the **highest loudness** of any chunk of length `k`. If `s` is shorter than `k`, return `0`.

## Examples

```
s = "abciiidef", k = 3   →  3    ("iii")
s = "rhythm",    k = 4   →  0    (no vowels anywhere)
```

## Constraints

- `0 <= s.length <= 200_000`
- `1 <= k`
- `s` contains only lowercase English letters

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Moving from the chunk starting at `i` to the one at `i + 1` changes exactly two characters. Do you need to recount the other `k - 2`?
</details>

<details>
<summary>Hint 2</summary>

Keep a running vowel count. Each step, add 1 if the entering character is a vowel and subtract 1 if the leaving character is a vowel. Track the maximum seen.
</details>
