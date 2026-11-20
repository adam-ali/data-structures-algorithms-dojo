export function mostCongestedBlock(cars: number[], limit: number, k: number): number {
  if (cars.length < k) return 0;
  let count = 0;
  for (let i = 0; i < k; i++) if (cars[i] > limit) count++;
  let best = count;
  for (let i = k; i < cars.length; i++) {
    if (cars[i] > limit) count++;
    if (cars[i - k] > limit) count--;
    best = Math.max(best, count);
  }
  return best;
}
