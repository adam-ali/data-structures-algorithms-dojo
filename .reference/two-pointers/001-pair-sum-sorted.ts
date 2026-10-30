// Reference solution — don't peek until you've logged an attempt.
export function pairSum(nums: number[], target: number): [number, number] | null {
  let i = 0;
  let j = nums.length - 1;
  while (i < j) {
    const sum = nums[i]! + nums[j]!;
    if (sum < target) i++;
    else if (sum > target) j--;
    else {
      // Smallest j for this i: slide left past equal values.
      while (j - 1 > i && nums[j - 1] === nums[j]) j--;
      return [i, j];
    }
  }
  return null;
}
