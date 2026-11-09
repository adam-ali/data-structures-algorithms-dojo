# Lowest Water Use

**Topic:** Sliding Window · **Level 1** — fixed-size window
**Target:** O(n) time, O(1) extra space

A town records how many litres of water it used each day in `usage` (a day with no use is `0`). The council wants to find its most economical stretch: a run of exactly `k` **consecutive** days.

Return the **smallest total** water use over any run of exactly `k` consecutive days. If there are fewer than `k` days, return `-1`.

## Examples

```
usage = [3, 1, 4, 1, 5, 9, 2, 6], k = 3  →  6    ([1, 4, 1] = 6)
usage = [5, 6],                   k = 3  →  -1   (fewer than 3 days)
```

## Constraints

- `0 <= usage.length <= 200_000`
- `1 <= k <= 200_000`
- `0 <= usage[i] <= 1000`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Add up the first `k` days once. Then think about how the total changes when the run moves one day to the right: how many days leave, and how many enter?
</details>

<details>
<summary>Hint 2</summary>

Keep one running total. For each step, add the new day on the right and subtract the day that fell off the left, then compare with the best total so far. Don't re-add all `k` days each time.
</details>
