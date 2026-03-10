function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let tail = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[tail] = nums1[i];
      i -= 1;
    } else {
      nums1[tail] = nums2[j];
      j -= 1;
    }
    tail -= 1;
  }

  return nums1;
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));
