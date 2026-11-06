export function fewestDaysToGoal(raised: number[], goal: number): number {

  let l=0, currentRaised =0 
  let shortestBurst = Infinity

  for(let r=0;r<raised.length; r++){
    currentRaised+= raised[r]
      while(currentRaised>=goal){
        shortestBurst = Math.min(shortestBurst, r-l+1)
        currentRaised-= raised[l]
        l++
      }
  }
  return shortestBurst === Infinity ? 0 : shortestBurst;
}
