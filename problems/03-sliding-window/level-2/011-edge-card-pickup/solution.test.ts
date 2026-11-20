import { describe, it, expect } from "vitest";
import { edgeCardPickup } from "./solution";

describe("edgeCardPickup", () => {
  it("mixes cards from both ends", () => {
    expect(edgeCardPickup([1, 1, 4, 2, 3], 5)).toBe(2);
    expect(edgeCardPickup([3, 2, 20, 1, 1, 3], 10)).toBe(5);
  });

  it("returns -1 when the target can't be hit exactly", () => {
    expect(edgeCardPickup([5, 6, 7, 8, 9], 4)).toBe(-1);
    expect(edgeCardPickup([2, 2, 2, 2], 5)).toBe(-1);
  });

  it("returns -1 when the target exceeds the total", () => {
    expect(edgeCardPickup([1, 2, 3], 7)).toBe(-1);
  });

  it("takes everything when the target equals the total", () => {
    expect(edgeCardPickup([1, 2, 3, 4], 10)).toBe(4);
  });

  it("handles empty and single-card rows", () => {
    expect(edgeCardPickup([], 3)).toBe(-1);
    expect(edgeCardPickup([5], 5)).toBe(1);
    expect(edgeCardPickup([5], 3)).toBe(-1);
  });

  it("works when only one side is used", () => {
    expect(edgeCardPickup([1, 2, 3, 10], 6)).toBe(3);
    expect(edgeCardPickup([10, 3, 2, 1], 6)).toBe(3);
  });

  it("prefers the smaller of several valid ways", () => {
    // 4 (1 card) beats 1+1+1+1 from other combos
    expect(edgeCardPickup([1, 1, 1, 9, 1, 4], 4)).toBe(1);
  });

  it("is fast enough on a large input (rejects O(n²))", () => {
    const n = 200_000;
    const cards = new Array<number>(n).fill(1);
    const start = performance.now();
    expect(edgeCardPickup(cards, n - 1)).toBe(n - 1);
    expect(edgeCardPickup(cards, 1)).toBe(1);
    expect(edgeCardPickup(cards, 100_000)).toBe(100_000);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
