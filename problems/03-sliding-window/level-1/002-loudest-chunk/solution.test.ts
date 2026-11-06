import { describe, it, expect } from "vitest";
import { loudestChunk } from "./solution";

describe("loudestChunk", () => {
  it("finds the loudest chunk", () => {
    expect(loudestChunk("abciiidef", 3)).toBe(3);
    expect(loudestChunk("leetcode", 3)).toBe(2);
  });

  it("returns 0 when there are no vowels", () => {
    expect(loudestChunk("rhythm", 4)).toBe(0);
  });

  it("returns 0 for an empty string or when s is shorter than k", () => {
    expect(loudestChunk("", 1)).toBe(0);
    expect(loudestChunk("ae", 3)).toBe(0);
  });

  it("handles k equal to the length", () => {
    expect(loudestChunk("banana", 6)).toBe(3);
  });

  it("handles k = 1", () => {
    expect(loudestChunk("xyzb", 1)).toBe(0);
    expect(loudestChunk("xyez", 1)).toBe(1);
  });

  it("handles a window at the very end", () => {
    expect(loudestChunk("bcdfaeiou", 5)).toBe(5);
  });

  it("handles all vowels", () => {
    expect(loudestChunk("aeiouaeiou", 4)).toBe(4);
  });

  it("is fast enough on a large input (rejects O(n·k))", () => {
    const n = 200_000;
    const k = 100_000;
    const s = "b".repeat(n - k) + "a".repeat(k); // only the last chunk is all vowels
    const start = performance.now();
    expect(loudestChunk(s, k)).toBe(k);
    // Vitest can't interrupt synchronous code, so check the time ourselves.
    expect(performance.now() - start).toBeLessThan(500);
  });
});
