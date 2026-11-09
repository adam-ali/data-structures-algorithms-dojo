export function longestAffordableTour(fees: number[], budget: number): number {
  let currentFees = 0, l=0
  let largestRow =0 
  for(let r=0;r<fees.length;r++){
    currentFees+= fees[r]

    while(currentFees > budget ){
      currentFees -= fees[l++]
    }
    largestRow = Math.max(largestRow, r-l+1)

  }

  return largestRow;
}
