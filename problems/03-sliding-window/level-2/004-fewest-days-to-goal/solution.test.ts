import { describe, it, expect } from "vitest";
import { fewestDaysToGoal } from "./solution";

describe("fewestDaysToGoal", () => {
  it("finds the shortest burst", () => {
    expect(fewestDaysToGoal([2, 3, 1, 2, 4, 3], 7)).toBe(2);
    expect(fewestDaysToGoal([2, 3, 1, 2, 4, 3], 11)).toBe(5); // no run of 4 reaches 11 (max is 10), [2,3,1,2,4] = 12 does
  });

  it("returns 0 when the goal is never reached", () => {
    expect(fewestDaysToGoal([1, 1, 1, 1], 10)).toBe(0);
  });

  it("returns 0 for an empty array", () => {
    expect(fewestDaysToGoal([], 5)).toBe(0);
  });

  it("returns 1 when a single day is enough", () => {
    expect(fewestDaysToGoal([1, 2, 9, 3], 8)).toBe(1);
  });

  it("uses the whole array when that is the only way", () => {
    expect(fewestDaysToGoal([1, 2, 3, 4], 10)).toBe(4);
  });

  it("accepts a total that equals the goal exactly", () => {
    expect(fewestDaysToGoal([5, 1, 1, 5], 7)).toBe(3);
  });

  it("handles a short run at the very end", () => {
    expect(fewestDaysToGoal([1, 1, 1, 1, 1, 50], 50)).toBe(1);
  });

  it("is fast enough on a large input (rejects O(n²))", () => {
    const n = 200_000;
    const raised = new Array<number>(n).fill(1);
    const start = performance.now();
    expect(fewestDaysToGoal(raised, n)).toBe(n);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
