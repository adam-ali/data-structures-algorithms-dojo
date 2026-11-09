# Exact Delivery Run

**Topic:** Sliding Window · **Level 2** — variable window with a simple validity condition
**Target:** O(n) time, O(1) extra space

A courier logs how many parcels arrived at the depot each day in `parcels` (every day had at least `1`). A truck is booked that must be loaded with **exactly** `target` parcels, collected over a run of **consecutive** days.

Return the **length of the longest** run of consecutive days whose parcel total is **exactly** `target`. If no run adds up to exactly `target`, return `0`.

The runs are alternative choices for one truck, not separate trips, so they may overlap.

## Examples

```
parcels = [1, 2, 1, 1, 1, 3], target = 4  →  3
  candidate runs that total 4: [1, 2, 1] (days 1–3), [2, 1, 1] (days 2–4), [1, 3] (days 5–6)
  the first two have length 3, the last has length 2, so the answer is 3
parcels = [2, 1, 1, 3, 2],    target = 5  →  3
  candidate runs that total 5: [1, 1, 3] (days 2–4), [3, 2] (days 4–5)
  the first has length 3, the second has length 2, so the answer is 3
parcels = [5, 5],             target = 3  →  0
```

## Constraints

- `0 <= parcels.length <= 200_000`
- `1 <= parcels[i] <= 1000`
- `1 <= target <= 1_000_000_000`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

Every value is positive, so adding a day only raises the total and dropping a day only lowers it. When the total goes above `target`, what must you do to get it back down?
</details>

<details>
<summary>Hint 2</summary>

Grow the right end every step. While the total is above `target`, drop days from the left. Only when the total is exactly `target` is the window a candidate, so compare its length with the best so far then.
</details>
