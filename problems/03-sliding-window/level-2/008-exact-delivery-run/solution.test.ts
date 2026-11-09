import { describe, it, expect } from "vitest";
import { longestExactRun } from "./solution";

describe("longestExactRun", () => {
  it("finds the longest exact run", () => {
    expect(longestExactRun([1, 2, 1, 1, 1, 3], 4)).toBe(3);
    expect(longestExactRun([2, 1, 1, 3, 2], 5)).toBe(3);
  });

  it("returns 0 when no run adds up exactly", () => {
    expect(longestExactRun([5, 5], 3)).toBe(0);
    expect(longestExactRun([2, 4, 6], 5)).toBe(0);
  });

  it("returns 0 for an empty array", () => {
    expect(longestExactRun([], 5)).toBe(0);
  });

  it("handles a single element", () => {
    expect(longestExactRun([4], 4)).toBe(1);
    expect(longestExactRun([3], 4)).toBe(0);
  });

  it("uses the whole array when it totals the target", () => {
    expect(longestExactRun([1, 2, 3], 6)).toBe(3);
  });

  it("picks the longest run, not the first one found", () => {
    expect(longestExactRun([4, 2, 1, 1, 1, 1, 1, 1, 9], 6)).toBe(6);
  });

  it("skips days that are too big on their own", () => {
    expect(longestExactRun([9, 1, 1, 9, 2, 2], 4)).toBe(2);
  });

  it("is fast enough on a large input (rejects O(n²))", () => {
    const n = 200_000;
    const parcels = new Array<number>(n).fill(1);
    const start = performance.now();
    expect(longestExactRun(parcels, 100_000)).toBe(100_000);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
