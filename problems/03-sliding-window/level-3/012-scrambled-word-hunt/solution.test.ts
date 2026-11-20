import { describe, it, expect } from "vitest";
import { scrambledWordHunt } from "./solution";

describe("scrambledWordHunt", () => {
  it("finds scrambled copies", () => {
    expect(scrambledWordHunt("cbaebabacd", "abc")).toEqual([0, 6]);
  });

  it("reports overlapping copies", () => {
    expect(scrambledWordHunt("abab", "ab")).toEqual([0, 1, 2]);
  });

  it("returns [] when nothing matches", () => {
    expect(scrambledWordHunt("hello", "xyz")).toEqual([]);
  });

  it("respects letter multiplicity", () => {
    expect(scrambledWordHunt("aabbaab", "aab")).toEqual([0, 3, 4]);
    expect(scrambledWordHunt("abcabc", "aab")).toEqual([]);
  });

  it("handles empty text or word, and word longer than text", () => {
    expect(scrambledWordHunt("", "a")).toEqual([]);
    expect(scrambledWordHunt("abc", "")).toEqual([]);
    expect(scrambledWordHunt("ab", "abc")).toEqual([]);
  });

  it("handles word equal to text and single letters", () => {
    expect(scrambledWordHunt("listen", "silent")).toEqual([0]);
    expect(scrambledWordHunt("aaaa", "a")).toEqual([0, 1, 2, 3]);
  });

  it("finds a copy at the very end", () => {
    expect(scrambledWordHunt("xxxxcab", "abc")).toEqual([4]);
  });

  it("is fast enough on a large input (rejects O(n·m))", () => {
    const text = "ab".repeat(150_000);
    const word = "ab".repeat(1000);
    const start = performance.now();
    const result = scrambledWordHunt(text, word);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
    // 1000 a's + 1000 b's: every window of length 2000 qualifies
    expect(result.length).toBe(text.length - word.length + 1);
    expect(result[0]).toBe(0);
    expect(result[result.length - 1]).toBe(text.length - word.length);
  });
});
