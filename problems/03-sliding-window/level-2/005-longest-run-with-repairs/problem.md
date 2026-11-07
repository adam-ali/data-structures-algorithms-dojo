# Longest Run with Repairs

**Topic:** Sliding Window · **Level 2** — variable window with a simple validity condition
**Target:** O(n) time, O(1) extra space

A monitoring system pings a service every minute and stores the results in `checks`: `true` means the service was up, `false` means it was down.

The on-call team can **retroactively mark at most `k` down minutes as up** (a "repair"). Return the length of the **longest run of consecutive minutes** that can be all up after using at most `k` repairs.

## Examples

```
checks = [true, true, false, true, false, false, true], k = 1  →  4   (repair index 2: [true, true, true, true])
checks = [false, false, false],                         k = 0  →  0
```

## Constraints

- `0 <= checks.length <= 200_000`
- `0 <= k <= checks.length`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

A run is valid as long as it contains at most `k` downs. What single number do you need to track to know if the current run is valid?
</details>

<details>
<summary>Hint 2</summary>

Grow the right end every step. Whenever the window holds more than `k` downs, advance the left end until it holds `k` again. The best window size seen at any point is the answer.
</details>
