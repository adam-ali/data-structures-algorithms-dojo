# Cheap Bundle Count

**Topic:** Sliding Window · **Level 2** — variable window with a simple validity condition
**Target:** O(n) time, O(1) extra space

A shop sells items in a fixed row on a shelf. Item `i` has a price multiplier `mult[i]` (always a whole number, at least `1`). A **bundle** is any non-empty run of **consecutive** items, and its cost is the **product** of the multipliers in it.

Return how many bundles cost **strictly less** than `limit`. Two bundles are different if they start or end at different positions, even when they contain the same values.

## Examples

```
mult = [10, 5, 2, 6], limit = 100  →  8
  [10] [5] [2] [6] [10,5]=50 [5,2]=10 [2,6]=12 [5,2,6]=60   ([10,5,2] = 100 is not < 100)
mult = [1, 2, 3],     limit = 0    →  0
```

## Constraints

- `0 <= mult.length <= 200_000`
- `1 <= mult[i] <= 1000`
- `0 <= limit <= 1_000_000`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Every multiplier is at least 1, so extending a run can never make its product smaller. If a run is cheap enough, every run inside it is cheap too.
</details>

<details>
<summary>Hint 2</summary>

For each right end, find the furthest-left start that still works. Every start between that point and the right end gives a valid bundle ending there, so you can add them all at once instead of one by one.
</details>
