import { describe, it, expect } from "vitest";
import { mostCongestedBlock } from "./solution";

describe("mostCongestedBlock", () => {
  it("finds the busiest block", () => {
    expect(mostCongestedBlock([1, 5, 9, 2, 8, 7], 6, 3)).toBe(2);
  });

  it("finds a block at the start", () => {
    expect(mostCongestedBlock([9, 9, 9, 1, 1, 1, 1], 5, 3)).toBe(3);
  });

  it("does not count minutes exactly at the limit", () => {
    expect(mostCongestedBlock([4, 6, 6], 6, 2)).toBe(0);
  });

  it("returns 0 for empty input or when fewer than k minutes", () => {
    expect(mostCongestedBlock([], 5, 3)).toBe(0);
    expect(mostCongestedBlock([9, 9], 1, 3)).toBe(0);
  });

  it("handles k = 1", () => {
    expect(mostCongestedBlock([1, 2, 3], 2, 1)).toBe(1);
    expect(mostCongestedBlock([1, 2, 3], 3, 1)).toBe(0);
  });

  it("handles k equal to the length", () => {
    expect(mostCongestedBlock([7, 1, 8, 2, 9], 5, 5)).toBe(3);
  });

  it("handles a limit of 0 and zero readings", () => {
    expect(mostCongestedBlock([0, 0, 1, 0, 2, 3], 0, 2)).toBe(2);
    expect(mostCongestedBlock([0, 0, 0], 0, 2)).toBe(0);
  });

  it("is fast enough on a large input (rejects O(n·k))", () => {
    const n = 200_000;
    const cars = Array.from({ length: n }, (_, i) => (i % 3 === 0 ? 10 : 1));
    const start = performance.now();
    // every block of 100_000 holds 33_334 or 33_333 congested minutes (indices ≡ 0 mod 3)
    expect(mostCongestedBlock(cars, 5, 100_000)).toBe(33_334);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
