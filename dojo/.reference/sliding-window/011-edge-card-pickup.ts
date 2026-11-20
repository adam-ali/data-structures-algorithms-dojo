export function edgeCardPickup(cards: number[], target: number): number {
  const n = cards.length;
  const total = cards.reduce((a, b) => a + b, 0);
  const need = total - target;
  if (need < 0) return -1;
  if (need === 0) return n;
  let best = -1;
  let left = 0;
  let sum = 0;
  for (let r = 0; r < n; r++) {
    sum += cards[r];
    while (sum > need) sum -= cards[left++];
    if (sum === need) best = Math.max(best, r - left + 1);
  }
  return best === -1 ? -1 : n - best;
}
