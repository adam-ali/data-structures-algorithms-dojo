export function cheapBundleCount(mult: number[], limit: number): number {
  let count = 0;
  let product = 1;
  let left = 0;
  for (let right = 0; right < mult.length; right++) {
    product *= mult[right];
    while (left <= right && product >= limit) product /= mult[left++];
    count += right - left + 1;
  }
  return count;
}
