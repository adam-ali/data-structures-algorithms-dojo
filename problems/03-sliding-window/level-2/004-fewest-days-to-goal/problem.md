# Fewest Days to Goal

**Topic:** Sliding Window · **Level 2** — variable window with a simple validity condition
**Target:** O(n) time, O(1) extra space

A charity records how many dollars it raised on each day in `raised` (every day brought in at least `$1`). It wants to hit a fundraising `goal` using the **shortest burst** of **consecutive** days.

Return the **length** of the shortest run of consecutive days whose total is **at least** `goal`. If no run reaches the goal, return `0`.

## Examples

```
raised = [2, 3, 1, 2, 4, 3], goal = 7   →  2    ([4, 3] = 7)
raised = [1, 1, 1, 1],       goal = 10  →  0    (everything together is only 4)
```

## Constraints

- `0 <= raised.length <= 200_000`
- `1 <= raised[i] <= 10_000`
- `1 <= goal <= 10^9`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Every value is positive, so adding a day can only raise the total and removing a day can only lower it. Once a run reaches the goal, what could you drop to see if a shorter run still works?
</details>

<details>
<summary>Hint 2</summary>

Expand the right end one day at a time. While the current total is `>= goal`, record the length and shrink from the left. Each index enters and leaves the window at most once.
</details>
