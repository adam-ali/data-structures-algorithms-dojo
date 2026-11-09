export function longestAffordableTour(fees: number[], budget: number): number {
  let best = 0;
  let sum = 0;
  let left = 0;
  for (let right = 0; right < fees.length; right++) {
    sum += fees[right];
    while (sum > budget) sum -= fees[left++];
    best = Math.max(best, right - left + 1);
  }
  return best;
}
