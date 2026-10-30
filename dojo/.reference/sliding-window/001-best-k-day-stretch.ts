export function bestStretch(profits: number[], k: number): number {
  if (profits.length < k) return -1;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += profits[i]!;
  let best = sum;
  let bestStart = 0;
  for (let i = k; i < profits.length; i++) {
    sum += profits[i]! - profits[i - k]!;
    if (sum > best) {
      best = sum;
      bestStart = i - k + 1;
    }
  }
  return bestStart;
}
