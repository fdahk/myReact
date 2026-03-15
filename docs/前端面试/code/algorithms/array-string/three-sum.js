/**
 * 题目：三数之和（Three Sum）
 * 目标：返回数组中所有和为 0 且不重复的三元组。
 * 核心思路：
 * 1. 先排序，把无序搜索转换成“固定一个数 + 双指针夹逼”。
 * 2. 外层枚举第一个数 nums[i]，内层在区间 [i + 1, n - 1] 中找两数和为 -nums[i]。
 * 3. 排序后可以天然利用大小关系移动指针，也可以顺手完成去重。
 * 时间复杂度：O(n^2)，排序 O(n log n)，双指针主过程 O(n^2)。
 * 空间复杂度：O(1) 到 O(log n)，取决于排序实现栈空间，额外结果集不计入。
 * 易错点 / 面试表达：
 * 1. 去重要做三次：i 去重、left 去重、right 去重，否则结果会重复。
 * 2. 指针在命中答案后要先移动，再跳过重复值，避免死循环。
 * 3. 面试中可以强调：排序把“三数问题”降维成“枚举 + 两数问题”。
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i += 1) {
    // 第一个数去重，避免生成重复三元组。
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left += 1;
        right -= 1;
        // 第二、第三个数也要去重，保证答案集合唯一。
        while (left < right && nums[left] === nums[left - 1]) left += 1;
        while (left < right && nums[right] === nums[right + 1]) right -= 1;
      } else if (sum < 0) {
        // 和偏小，左指针右移以增大总和。
        left += 1;
      } else {
        // 和偏大，右指针左移以减小总和。
        right -= 1;
      }
    }
  }

  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
