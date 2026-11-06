# Warm Spell Count

**Topic:** Sliding Window · **Level 1** — fixed-size window
**Target:** O(n) time, O(1) extra space

A weather station logs one temperature reading per day in `temps` (negatives are below zero). A **spell** is any run of exactly `k` **consecutive** days. A spell is *warm* if the **average** of its `k` readings is **at least** `threshold`.

Return how many warm spells there are. Overlapping spells all count separately. If there are fewer than `k` days, return `0`.

## Examples

```
temps = [2, 4, 6, 8, 1], k = 2, threshold = 5   →  2    ([4,6] avg 5 and [6,8] avg 7)
temps = [-3, 5, 5, -1],  k = 3, threshold = 3   →  1    ([-3,5,5] avg 2.33 ✗, [5,5,-1] avg 3 ✓)
```

## Constraints

- `0 <= temps.length <= 200_000`
- `1 <= k`
- `-100 <= temps[i] <= 100`
- `-100 <= threshold <= 100`, an integer

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Comparing an average to an integer is the same as comparing the window **sum** to `threshold * k`, so no floating point is needed. Then ask which days change when the window moves one step.
</details>

<details>
<summary>Hint 2</summary>

Build the first window's sum, then for each new day add it and subtract the day that left. Count each window whose sum is `>= threshold * k`.
</details>
