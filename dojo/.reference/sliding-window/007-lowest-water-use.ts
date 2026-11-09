export function lowestWaterUse(usage: number[], k: number): number {
  if (k > usage.length) return -1;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += usage[i];
  let best = sum;
  for (let i = k; i < usage.length; i++) {
    sum += usage[i] - usage[i - k];
    best = Math.min(best, sum);
  }
  return best;
}
