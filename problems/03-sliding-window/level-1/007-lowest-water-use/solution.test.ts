import { describe, it, expect } from "vitest";
import { lowestWaterUse } from "./solution";

describe("lowestWaterUse", () => {
  it("finds the cheapest run in the middle", () => {
    expect(lowestWaterUse([3, 1, 4, 1, 5, 9, 2, 6], 3)).toBe(6);
    expect(lowestWaterUse([5, 2, 8, 1], 2)).toBe(7);
  });

  it("finds the cheapest run at the start", () => {
    expect(lowestWaterUse([1, 9, 9, 9], 2)).toBe(10);
  });

  it("finds the cheapest run at the end", () => {
    expect(lowestWaterUse([9, 9, 9, 1, 0], 2)).toBe(1);
  });

  it("returns -1 when there are fewer than k days", () => {
    expect(lowestWaterUse([], 1)).toBe(-1);
    expect(lowestWaterUse([5, 6], 3)).toBe(-1);
  });

  it("handles k equal to the length", () => {
    expect(lowestWaterUse([3, 7, 2], 3)).toBe(12);
  });

  it("handles k = 1 (single lowest day)", () => {
    expect(lowestWaterUse([4, 8, 2, 8], 1)).toBe(2);
  });

  it("handles runs of zeros", () => {
    expect(lowestWaterUse([5, 0, 0, 0, 7], 3)).toBe(0);
  });

  it("is fast enough on a large input (rejects O(n·k))", () => {
    const n = 200_000;
    const k = 100_000;
    const usage = Array.from({ length: n }, (_, i) => (i * 7919) % 1001);
    // Expected value from prefix sums, so the check is independent of the sliding window.
    const prefix = [0];
    for (const u of usage) prefix.push(prefix[prefix.length - 1] + u);
    let expected = Infinity;
    for (let i = 0; i + k <= n; i++) expected = Math.min(expected, prefix[i + k] - prefix[i]);
    const start = performance.now();
    expect(lowestWaterUse(usage, k)).toBe(expected);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
