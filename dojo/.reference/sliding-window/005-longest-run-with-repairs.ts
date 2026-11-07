export function longestRunWithRepairs(checks: boolean[], k: number): number {
  let best = 0;
  let downs = 0;
  let left = 0;
  for (let right = 0; right < checks.length; right++) {
    if (!checks[right]) downs++;
    while (downs > k) if (!checks[left++]) downs--;
    best = Math.max(best, right - left + 1);
  }
  return best;
}
