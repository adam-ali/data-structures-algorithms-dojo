import { describe, it, expect } from "vitest";
import { warmSpellCount } from "./solution";

describe("warmSpellCount", () => {
  it("counts warm spells", () => {
    expect(warmSpellCount([2, 4, 6, 8, 1], 2, 5)).toBe(2);
    expect(warmSpellCount([-3, 5, 5, -1], 3, 3)).toBe(1);
  });

  it("counts a spell whose average equals the threshold exactly", () => {
    expect(warmSpellCount([2, 4, 1, 5], 2, 3)).toBe(2); // sums 6 (equal), 5, 6 (equal)
  });

  it("returns 0 for an empty array or when there are fewer than k days", () => {
    expect(warmSpellCount([], 1, 0)).toBe(0);
    expect(warmSpellCount([10, 10], 3, 0)).toBe(0);
  });

  it("handles k equal to the length", () => {
    expect(warmSpellCount([4, 6], 2, 5)).toBe(1);
    expect(warmSpellCount([4, 6], 2, 6)).toBe(0);
  });

  it("handles k = 1", () => {
    expect(warmSpellCount([1, 5, 3, 5], 1, 5)).toBe(2);
  });

  it("handles negative readings and a negative threshold", () => {
    expect(warmSpellCount([-5, -4, -6, -2], 2, -5)).toBe(3);
  });

  it("counts every window when all are warm", () => {
    expect(warmSpellCount([7, 7, 7, 7, 7], 3, 7)).toBe(3);
  });

  it("is fast enough on a large input (rejects O(n·k))", () => {
    const n = 200_000;
    const k = 100_000;
    const temps = Array.from({ length: n }, (_, i) => (i % 2 === 0 ? 10 : -10));
    const start = performance.now();
    expect(warmSpellCount(temps, k, 0)).toBe(n - k + 1);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
