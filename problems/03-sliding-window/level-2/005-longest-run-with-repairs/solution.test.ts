import { describe, it, expect } from "vitest";
import { longestRunWithRepairs } from "./solution";

const T = true;
const F = false;

describe("longestRunWithRepairs", () => {
  it("repairs a down minute to join two runs", () => {
    expect(longestRunWithRepairs([T, T, F, T, F, F, T], 1)).toBe(4);
    expect(longestRunWithRepairs([T, F, T, T, F, T, T, T], 2)).toBe(8);
  });

  it("returns 0 for an empty array", () => {
    expect(longestRunWithRepairs([], 0)).toBe(0);
  });

  it("returns 0 when everything is down and no repairs are allowed", () => {
    expect(longestRunWithRepairs([F, F, F], 0)).toBe(0);
  });

  it("with k = 0 returns the longest natural up run", () => {
    expect(longestRunWithRepairs([T, T, F, T, T, T, F, T], 0)).toBe(3);
  });

  it("can repair everything when k covers all downs", () => {
    expect(longestRunWithRepairs([F, F, F], 3)).toBe(3);
  });

  it("returns the whole length when already all up", () => {
    expect(longestRunWithRepairs([T, T, T, T], 0)).toBe(4);
  });

  it("handles a single element", () => {
    expect(longestRunWithRepairs([F], 1)).toBe(1);
    expect(longestRunWithRepairs([F], 0)).toBe(0);
  });

  it("spends repairs on the best stretch, not the first one", () => {
    expect(longestRunWithRepairs([F, F, T, F, T, T, T, T, F, F, F], 2)).toBe(7);
  });

  it("is fast enough on a large input (rejects O(n²))", () => {
    const n = 200_000;
    const checks = new Array<boolean>(n).fill(true);
    checks[0] = false;
    checks[n - 1] = false;
    const start = performance.now();
    expect(longestRunWithRepairs(checks, 2)).toBe(n);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
