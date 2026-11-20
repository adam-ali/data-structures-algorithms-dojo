# Edge Card Pickup

**Topic:** Sliding Window · **Level 2** — variable window with a simple validity condition
**Target:** O(n) time, O(1) extra space

Cards lie face up in a row; card `i` shows the points `cards[i]` (always at least `1`). On each turn you must take either the **leftmost** or the **rightmost** remaining card. You may stop whenever you like.

You want to finish with **exactly** `target` points. Return the **fewest cards** you need to take to get there, or `-1` if it is impossible.

## Examples

```
cards = [1, 1, 4, 2, 3], target = 5  →  2
  take the 3 from the right, then the 2 from the right
cards = [5, 6, 7, 8, 9], target = 4  →  -1
```

## Constraints

- `0 <= cards.length <= 200_000`
- `1 <= cards[i] <= 1000`
- `1 <= target <= 1_000_000_000`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

The cards you take form a prefix plus a suffix. What do the cards you leave behind look like, and what must they add up to?
</details>

<details>
<summary>Hint 2</summary>

The untouched cards are one contiguous run whose total is `sum(cards) - target`. Taking the fewest cards means leaving the **longest** such run. All values are positive, so grow the window on the right and shrink it from the left while its sum is too large. Mind the case where the run is empty.
</details>
