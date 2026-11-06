export function warmSpellCount(temps: number[], k: number, threshold: number): number {
  if(k<0) return 0
  
  let initalTotal =0  
  let spells = 0
  for(let i=0;i<k;i++){
    initalTotal += temps[i]
  }

  if(initalTotal/k >= threshold){
    spells++
  }

  for(let j=k;j<temps.length;j++){
    initalTotal = initalTotal + temps[j]
    initalTotal = initalTotal - temps[j-k] 

    if(initalTotal/k >= threshold){
      spells++
    }
  }

  return spells;
}
