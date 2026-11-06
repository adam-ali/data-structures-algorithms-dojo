export function warmSpellCount(temps: number[], k: number, threshold: number): number {
  if(temps.length<k) return 0
  
  const windowSize = k*threshold
  let spells = 0
  let total = 0
  for(let i =0; i<temps.length;i++){
    total+= temps[i]
    if(i>=k){total -= temps[i-k]}
    if(i>=k-1 && total >= windowSize ){
      spells++
    }
  }


  return spells;
}
