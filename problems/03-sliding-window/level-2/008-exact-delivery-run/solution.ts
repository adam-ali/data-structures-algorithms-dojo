export function longestExactRun(parcels: number[], target: number): number {
  
  let parcelCount=0,l=0
  let most = 0
  for(let r=0;r<parcels.length;r++){
    parcelCount += parcels[r]

    while(parcelCount > target){
      parcelCount -= parcels[l++]
    }
    if(parcelCount === target){
      most = Math.max(r-l+1, most)
    }

  }
  
  return most;
}
