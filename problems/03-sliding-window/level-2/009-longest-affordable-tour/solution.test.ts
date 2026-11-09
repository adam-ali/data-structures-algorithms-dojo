import { describe, it, expect } from "vitest";
import { longestAffordableTour } from "./solution";

describe("longestAffordableTour", () => {
  it("finds the longest affordable run", () => {
    expect(longestAffordableTour([4, 2, 1, 7, 3, 2, 1], 6)).toBe(3);
    expect(longestAffordableTour([1, 1, 2, 2], 4)).toBe(3);
  });

  it("returns 0 when every single attraction is too expensive", () => {
    expect(longestAffordableTour([8, 9], 5)).toBe(0);
  });

  it("returns 0 for an empty street", () => {
    expect(longestAffordableTour([], 10)).toBe(0);
  });

  it("handles a single attraction", () => {
    expect(longestAffordableTour([3], 3)).toBe(1);
    expect(longestAffordableTour([3], 2)).toBe(0);
  });

  it("uses the whole street when it all fits", () => {
    expect(longestAffordableTour([1, 2, 3], 100)).toBe(3);
  });

  it("treats the budget as inclusive", () => {
    expect(longestAffordableTour([2, 3], 5)).toBe(2);
    expect(longestAffordableTour([2, 3], 4)).toBe(1);
  });

  it("skips attractions that are too expensive on their own", () => {
    expect(longestAffordableTour([9, 1, 1, 9, 2, 2, 2], 6)).toBe(3);
  });

  it("finds a best run in the middle", () => {
    expect(longestAffordableTour([5, 1, 1, 1, 1, 5], 4)).toBe(4);
  });

  it("is fast enough on a large input (rejects O(n²))", () => {
    const n = 200_000;
    const fees = new Array<number>(n).fill(1);
    const start = performance.now();
    expect(longestAffordableTour(fees, 100_000)).toBe(100_000);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
