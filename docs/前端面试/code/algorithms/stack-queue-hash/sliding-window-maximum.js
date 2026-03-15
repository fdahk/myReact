/**
 * 题目：滑动窗口最大值（Sliding Window Maximum）
 * 目标：返回每个大小为 k 的滑动窗口中的最大值。
 * 核心思路：
 * 1. 使用单调队列，队列中存下标，且对应值从大到小排列。
 * 2. 队头始终是当前窗口最大值的下标。
 * 3. 新元素进入前，持续弹出所有比它小或相等的尾部元素，保证队列单调性。
 * 时间复杂度：O(n)，每个元素最多进出队一次。
 * 空间复杂度：O(k)。
 * 易错点 / 面试表达：
 * 1. 队列里要存下标，不存值，这样才能判断元素是否滑出窗口。
 * 2. 先移除过期下标，再维护单调性，顺序不要反。
 * 3. 面试里可强调：单调队列适合解决“滑窗内最值”问题。
 */
function maxSlidingWindow(nums, k) {
  const deque = [];
  const result = [];

  for (let i = 0; i < nums.length; i += 1) {
    // 移除窗口左边界之外的下标。
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }
    // 维护从大到小的单调性，较小值不可能再成为窗口最大值。
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
