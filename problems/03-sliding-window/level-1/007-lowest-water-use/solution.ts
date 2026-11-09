export function lowestWaterUse(usage: number[], k: number): number {
  if(usage.length < k) return -1

  //find the smallest total, its a fixed size window
  // find the first loop
  // increment from there till end, if shorter set shortest
  let firstWindow = 0
  for(let i =0;i<k;i++){
    firstWindow += usage[i]
  }

  let smallestWindow = firstWindow
  
  for(let i=k; i<usage.length;i++){
    firstWindow += usage[i] - usage[i-k] 

    smallestWindow = Math.min(smallestWindow, firstWindow)
  }


  return smallestWindow;
}
