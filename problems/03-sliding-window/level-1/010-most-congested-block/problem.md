# Most Congested Block

**Topic:** Sliding Window · **Level 1** — fixed-size window
**Target:** O(n) time, O(1) extra space

A road sensor logs how many cars passed each minute in `cars`. A minute is *congested* if more than `limit` cars passed (**strictly** more; exactly `limit` is fine).

The traffic office looks at blocks of exactly `k` **consecutive** minutes. Return the **largest number of congested minutes** found in any block of length `k`. If there are fewer than `k` minutes, return `0`.

## Examples

```
cars = [1, 5, 9, 2, 8, 7], limit = 6, k = 3  →  2
  congested minutes: 9, 8, 7 (indices 2, 4, 5)
  blocks: [1,5,9] → 1, [5,9,2] → 1, [9,2,8] → 2, [2,8,7] → 2
cars = [4, 6, 6],          limit = 6, k = 2  →  0
```

## Constraints

- `0 <= cars.length <= 200_000`
- `1 <= k <= 200_000`
- `0 <= cars[i], limit <= 1_000_000`

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

When the block moves one minute to the right, exactly one minute enters and one leaves. You never need to recount the whole block.
</details>

<details>
<summary>Hint 2</summary>

Count the congested minutes in the first `k`. Then for each new index `i`, add 1 if `cars[i]` is congested and subtract 1 if `cars[i - k]` was. Track the maximum.
</details>
