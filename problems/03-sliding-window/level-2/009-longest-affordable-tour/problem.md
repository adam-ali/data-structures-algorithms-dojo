# Longest Affordable Tour

**Topic:** Sliding Window · **Level 2** — variable window with a simple validity condition
**Target:** O(n) time, O(1) extra space

A tourist walks down a street with attractions in a row. Attraction `i` charges an entrance fee of `fees[i]` dollars (every fee is at least `$1`). The tourist picks **one** run of **consecutive** attractions, visits all of them, and pays every fee in the run. The total they pay must not go over `budget`.

Return the **largest number of attractions** in a single run whose total fee is **at most** `budget`. If even the cheapest single attraction is too expensive, return `0`.

Runs are alternative choices for one tour, not separate trips, so they may overlap.

## Examples

```
fees = [4, 2, 1, 7, 3, 2, 1], budget = 6  →  3
  affordable runs include [4, 2] (6), [2, 1] (3), [3, 2, 1] (6)
  the longest is [3, 2, 1], with 3 attractions
fees = [8, 9],                budget = 5  →  0
```

## Constraints

- `0 <= fees.length <= 200_000`
- `1 <= fees[i] <= 1000`
- `1 <= budget <= 1_000_000_000`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Every fee is positive, so adding an attraction can only raise the total and dropping one can only lower it. If a run is affordable, every run inside it is affordable too.
</details>

<details>
<summary>Hint 2</summary>

Add one attraction on the right each step. While the total is over `budget`, drop attractions from the left. Once the window is affordable again, compare its length with the best so far.
</details>
