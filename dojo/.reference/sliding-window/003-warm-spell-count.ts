export function warmSpellCount(temps: number[], k: number, threshold: number): number {
  if (temps.length < k) return 0;
  const need = threshold * k;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += temps[i];
  let count = sum >= need ? 1 : 0;
  for (let i = k; i < temps.length; i++) {
    sum += temps[i] - temps[i - k];
    if (sum >= need) count++;
  }
  return count;
}
