/**
 * 题目：跳跃游戏（Jump Game）
 * 目标：判断是否能够从数组起点跳到最后一个位置。
 * 核心思路：
 * 1. 使用贪心策略，维护“当前最多能跳到的最远下标” `farthest`。
 * 2. 从左到右遍历时，如果当前位置已经超过 `farthest`，说明这一格不可达，直接返回 `false`。
 * 3. 只要当前位置可达，就尝试用 `i + nums[i]` 去更新最远可达边界。
 * 时间复杂度：O(n)。
 * 空间复杂度：O(1)。
 * 易错点 / 面试表达：
 * 1. 这题不需要真的枚举跳法，关键是维护“可达范围”而不是“具体路径”。
 * 2. 一旦发现某个位置不可达，就可以立刻结束，不必继续遍历。
 * 3. 面试中可以补充：这是典型的区间覆盖式贪心思想。
 */
function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i += 1) {
    // 如果当前下标已经落在最远可达范围之外，说明无法继续前进。
    if (i > farthest) {
      return false;
    }
    // 持续扩展“当前已知最远能到哪里”这个边界。
    farthest = Math.max(farthest, i + nums[i]);
  }

  return true;
}

console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));
