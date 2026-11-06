export function fewestDaysToGoal(raised: number[], goal: number): number {
  let best = Infinity;
  let sum = 0;
  let left = 0;
  for (let right = 0; right < raised.length; right++) {
    sum += raised[right];
    while (sum >= goal) {
      best = Math.min(best, right - left + 1);
      sum -= raised[left++];
    }
  }
  return best === Infinity ? 0 : best;
}
