export function longestExactRun(parcels: number[], target: number): number {
  let best = 0;
  let sum = 0;
  let left = 0;
  for (let right = 0; right < parcels.length; right++) {
    sum += parcels[right];
    while (sum > target) sum -= parcels[left++];
    if (sum === target) best = Math.max(best, right - left + 1);
  }
  return best;
}
