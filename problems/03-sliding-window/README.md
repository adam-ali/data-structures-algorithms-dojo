# Sliding Window

## What it is

A **window** is a run of items next to each other in an array or string, like `nums[3..7]`.

A **sliding window** moves that run along the array, one step at a time. You don't work out each window from scratch: you **update** the last one. One item enters on the right, and one item leaves on the left.

```
nums = [2, 1, 5, 1, 3, 2],  k = 3

[2  1  5] 1  3  2     sum = 8
 2 [1  5  1] 3  2     sum = 8 - 2 + 1 = 7
 2  1 [5  1  3] 2     sum = 7 - 1 + 3 = 9
 2  1  5 [1  3  2]    sum = 9 - 5 + 2 = 6
```

Each step costs O(1) instead of O(k), so the whole pass is **O(n)** instead of O(n·k).

## When to think of it

Look for these signs in the problem:

- The answer is about a **contiguous** part: a "subarray", "substring", "consecutive days" or "in a row".
- You want the **best** window (max, min, longest, shortest), or you need to **count** windows.
- A slow solution would loop over every start and then every end.

If the items don't have to be next to each other, it's probably not a sliding window.

## The two kinds

### 1. Fixed size (the window is always `k` long)

1. Build the first window from the first `k` items.
2. Slide: add `nums[i]`, remove `nums[i - k]`.
3. After each slide, check whether this window is the best so far.

```ts
let sum = 0;
for (let i = 0; i < k; i++) sum += nums[i];
let best = sum;
for (let i = k; i < nums.length; i++) {
  sum += nums[i] - nums[i - k];
  best = Math.max(best, sum);
}
```

### 2. Variable size (the window grows and shrinks)

Use two pointers, `left` and `right`, that only ever move forward.

1. Move `right` one step to **grow** the window, and add the new item.
2. **While** the window breaks the rule, remove `nums[left]` and move `left` forward to **shrink** it.
3. The window is now valid, so record the answer (for example, its length `right - left + 1`).

```ts
let left = 0;
for (let right = 0; right < nums.length; right++) {
  // add nums[right] to the window state
  while (/* window is invalid */) {
    // remove nums[left] from the window state
    left++;
  }
  // window [left..right] is valid: update the answer
}
```

Each item enters once and leaves once, so this is O(n) too, even with the inner `while` loop.

## What "window state" can be

- A **sum** or **count**: for totals and averages.
- A **Map** or **Set** of what's inside: for "no repeats" or "at most k different" rules.
- A **deque** (a list you can add to or remove from at both ends): for the max or min of each window.

## Common mistakes

- **Off-by-one errors:** the window `[left..right]` has `right - left + 1` items.
- **Fewer than `k` items:** decide early what to return.
- **Ties:** read the problem. Use `>` to keep the first best, and `>=` to keep the last.
- **Negative numbers:** a variable window that grows while the "sum is too small" can break with negatives, because adding an item may make the sum smaller.

## Levels in this folder

1. [Level 1](level-1/): fixed-size window
2. [Level 2](level-2/): variable window with a simple rule
3. [Level 3](level-3/): variable window with a frequency map
4. [Level 4](level-4/): minimum window, or a window with a deque
