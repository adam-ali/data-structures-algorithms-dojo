import { describe, it, expect } from "vitest";
import { cheapBundleCount } from "./solution";

describe("cheapBundleCount", () => {
  it("counts bundles under the limit", () => {
    expect(cheapBundleCount([10, 5, 2, 6], 100)).toBe(8);
    expect(cheapBundleCount([1, 2, 3], 7)).toBe(6);
  });

  it("returns 0 for an empty shelf", () => {
    expect(cheapBundleCount([], 10)).toBe(0);
  });

  it("returns 0 when limit is 0 or 1 (every product is at least 1)", () => {
    expect(cheapBundleCount([1, 2, 3], 0)).toBe(0);
    expect(cheapBundleCount([1, 1], 1)).toBe(0);
  });

  it("treats the limit as strict", () => {
    expect(cheapBundleCount([2, 3], 6)).toBe(2);
    expect(cheapBundleCount([2, 3], 7)).toBe(3);
  });

  it("handles a single item", () => {
    expect(cheapBundleCount([5], 5)).toBe(0);
    expect(cheapBundleCount([5], 6)).toBe(1);
  });

  it("returns 0 when every single item is too expensive", () => {
    expect(cheapBundleCount([7, 8, 9], 7)).toBe(0);
  });

  it("counts every bundle when the whole shelf is cheap", () => {
    expect(cheapBundleCount([2, 2, 2], 100)).toBe(6);
  });

  it("counts equal bundles at different positions separately", () => {
    expect(cheapBundleCount([1, 1, 1, 1], 2)).toBe(10);
  });

  it("is fast enough on a large input (rejects O(n²))", () => {
    const n = 200_000;
    const mult = new Array<number>(n).fill(1);
    const start = performance.now();
    expect(cheapBundleCount(mult, 2)).toBe((n * (n + 1)) / 2);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
