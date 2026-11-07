export function longestRunWithRepairs(checks: boolean[], k: number): number {
  
  let maxUptime =0 , l=0
  let budget =k

  for(let r=0; r<checks.length; r++){
    
    if(checks[r] === false){
      budget -- 
    } 
    
    while (budget < 0 ){
      if(checks[l] === false){
        budget++
      }
      l++
    }
    maxUptime = Math.max(maxUptime,r-l+1)

  }

  return maxUptime;
}
