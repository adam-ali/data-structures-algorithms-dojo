import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["problems/**/*.test.ts"],
    // A per-test timeout catches accidental O(n²) on the "large input" case
    // and infinite loops without hanging your watch session.
    testTimeout: 2000,
  },
});
