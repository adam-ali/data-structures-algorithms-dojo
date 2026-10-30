# Pair Sum in a Sorted Array

**Topic:** Two Pointers · **Level 1** — opposite ends on a sorted array
**Target:** O(n) time, O(1) extra space

Given an array of integers `nums` sorted in **non-decreasing** order and an integer `target`, return the **indices** `[i, j]` (with `i < j`) of two numbers that add up to `target`.

If several pairs work, return the one with the **smallest `i`**, and for that `i` the **smallest `j`**. If no pair exists, return `null`.

## Examples

```
nums = [1, 3, 4, 6, 9], target = 10   →  [0, 4]   (1 + 9)
nums = [2, 5, 8],       target = 4    →  null
```

## Constraints

- `0 <= nums.length <= 100_000`
- `-10^9 <= nums[i], target <= 10^9`
- An element can't be paired with itself.

<details>
<summary>Hint 1 (counts as a hint in the log)</summary>

If the sum of the two ends is too big, which pointer can you move without missing an answer?
</details>

<details>
<summary>Hint 2</summary>

The smallest-`i` rule matters when there are duplicates. When you find a match, can you move `j` left while it still equals the same value?
</details>
