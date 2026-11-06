export function loudestChunk(s: string, k: number): number {
  if (k > s.length) return 0;
  const v = (c: string) => ("aeiou".includes(c) ? 1 : 0);
  let cur = 0;
  for (let i = 0; i < k; i++) cur += v(s[i]);
  let best = cur;
  for (let i = k; i < s.length; i++) {
    cur += v(s[i]) - v(s[i - k]);
    best = Math.max(best, cur);
  }
  return best;
}
