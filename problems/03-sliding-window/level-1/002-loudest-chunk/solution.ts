export function loudestChunk(s: string, k: number): number {
  if(s.length < k) return 0
  const vowels = new Set(['a','e','i','o','u']) 
  let currentNoise = 0

  for(let i=0;i<k;i++){
    if(vowels.has(s[i])){
      currentNoise++
    }
  }

  let maxNoise = currentNoise
  for(let r =k; r<s.length; r++){
    if(vowels.has(s[r-k])){
      currentNoise--
    }
    if(vowels.has(s[r])){
      currentNoise++
    }
    maxNoise = Math.max(currentNoise, maxNoise)
  }
  return maxNoise;
}
