import { describe, it, expect } from "vitest";
import { pairSum } from "./solution";

describe("pairSum", () => {
  it("finds a pair at the ends", () => {
    expect(pairSum([1, 3, 4, 6, 9], 10)).toEqual([0, 4]);
  });

  it("finds a pair in the middle", () => {
    expect(pairSum([1, 2, 4, 7, 11], 11)).toEqual([2, 3]);
  });

  it("returns null when no pair exists", () => {
    expect(pairSum([2, 5, 8], 4)).toBeNull();
  });

  it("handles empty and single-element arrays", () => {
    expect(pairSum([], 5)).toBeNull();
    expect(pairSum([5], 10)).toBeNull();
  });

  it("handles negatives and zero", () => {
    expect(pairSum([-7, -3, 0, 2, 5], -1)).toEqual([1, 3]);
  });

  it("uses duplicates as two different elements", () => {
    expect(pairSum([1, 4, 4, 9], 8)).toEqual([1, 2]);
  });

  it("returns the pair with the smallest i, then smallest j", () => {
    expect(pairSum([1, 1, 5, 5, 5], 6)).toEqual([0, 2]);
  });

  it("is fast enough on a large input (rejects O(n²))", () => {
    const n = 100_000;
    const nums = Array.from({ length: n }, (_, i) => i * 2);
    expect(pairSum(nums, nums[n - 2]! + nums[n - 1]!)).toEqual([n - 2, n - 1]);
  });
});
