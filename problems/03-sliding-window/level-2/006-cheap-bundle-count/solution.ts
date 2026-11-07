export function cheapBundleCount(mult: number[], limit: number): number {
  if(limit ==0) return 0

  let l=0,bundles =0, consecutiveItems = 1

  for(let r=0; r<mult.length;r++){
    
  consecutiveItems *= mult[r]
   while(consecutiveItems >= limit && l<=r){
      consecutiveItems = consecutiveItems / mult[l]
      l++
    }
    bundles = bundles + (r-l+1)
  }
  
  return bundles;
}
