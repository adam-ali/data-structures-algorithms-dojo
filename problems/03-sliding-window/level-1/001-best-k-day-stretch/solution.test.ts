import { describe, it, expect } from "vitest";
import { bestStretch } from "./solution";

describe("bestStretch", () => {
  it("finds the best run in the middle", () => {
    expect(bestStretch([2, -1, 4, 3, -5, 6], 2)).toBe(2);
  });

  it("finds the best run at the end", () => {
    expect(bestStretch([1, 2, 3, 4, 5], 3)).toBe(2);
  });

  it("returns the earliest start on ties", () => {
    expect(bestStretch([4, 1, -3, 2, 3], 2)).toBe(0);
    expect(bestStretch([0, 0, 0, 0], 2)).toBe(0);
  });

  it("returns -1 when there are fewer than k days", () => {
    expect(bestStretch([], 1)).toBe(-1);
    expect(bestStretch([5, 6], 3)).toBe(-1);
  });

  it("handles k equal to the length", () => {
    expect(bestStretch([3, -7, 2], 3)).toBe(0);
  });

  it("handles k = 1 (single best day)", () => {
    expect(bestStretch([-3, 8, 2, 8], 1)).toBe(1);
  });

  it("handles all-negative profits", () => {
    expect(bestStretch([-5, -2, -1, -4, -6], 2)).toBe(1);
  });

  it("is fast enough on a large input (rejects O(n·k))", () => {
    const n = 200_000;
    const k = 100_000;
    const profits = Array.from({ length: n }, (_, i) => ((i * 7919) % 201) - 100);
    profits[n - 1] = 10_000_000; // only runs containing the last day can win; the first is at n - k
    const start = performance.now();
    expect(bestStretch(profits, k)).toBe(n - k);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
