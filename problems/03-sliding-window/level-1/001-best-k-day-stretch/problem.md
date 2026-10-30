# Best k-Day Stretch

**Topic:** Sliding Window · **Level 1** — fixed-size window
**Target:** O(n) time, O(1) extra space

A market stall records its profit for each day in `profits` (a loss is a negative number). The owner wants to know which run of exactly `k` **consecutive** days earned the most.

Return the **start index** of the `k` consecutive days with the **largest total profit**. If several runs tie, return the **smallest** start index. If there are fewer than `k` days, return `-1`.

## Examples

```
profits = [2, -1, 4, 3, -5, 6], k = 2   →  2    (4 + 3 = 7)
profits = [4, 1, -3, 2, 3],     k = 2   →  0    (4 + 1 = 5 ties with 2 + 3 = 5; earliest wins)
```

## Constraints

- `0 <= profits.length <= 200_000`
- `1 <= k`
- `-10^4 <= profits[i] <= 10^4`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Going from the run starting at `i` to the run starting at `i + 1`, most of the days are the same. Which days actually change?
</details>

<details>
<summary>Hint 2</summary>

Keep one running total. Each step, add the day that enters and subtract the day that leaves. Only replace the best when the new total is **strictly** greater, so ties keep the earlier start.
</details>
