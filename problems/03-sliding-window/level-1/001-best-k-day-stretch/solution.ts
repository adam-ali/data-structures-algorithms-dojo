export function bestStretch(profits: number[], k: number): number {
  if (k > profits.length) return -1;
  let currentProfit = 0

  //get the first window
  for (let i = 0; i < k; i++) {
    currentProfit += profits[i];
  }

  let maxProfit = currentProfit;
  let bestStart = 0;

  for (let i = k ; i < profits.length; i++) {
    currentProfit = currentProfit - profits[i-k] + profits[i];
    if (currentProfit > maxProfit) {
      maxProfit = currentProfit;
      bestStart = i-k+1;
    }
  }

  return bestStart;
}
