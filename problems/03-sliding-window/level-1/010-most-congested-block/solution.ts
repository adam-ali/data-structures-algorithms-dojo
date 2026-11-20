export function mostCongestedBlock(cars: number[], limit: number, k: number): number {
  if(cars.length < k) return 0

  let current =0

  for(let i =0; i<k;i++){
    if(cars[i] > limit){
      current++ 
    }
  }
  
  let maxCongestion = current,l=0
  
  for(let r=k;r<cars.length;r++){
    if(cars[r] > limit){
      current++
    }
    if(cars[l++] > limit){
      current -- 
    }

    maxCongestion = Math.max(current,maxCongestion)

  }

  return maxCongestion;
}
