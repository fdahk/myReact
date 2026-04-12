/*
实现目标：
- 动态规划求解“火车旅行最低票价”问题。

核心思路：
- `dp[i]` 表示覆盖到第 i 天的最小成本。
- 每一天可以选择买 1 天票、7 天票、30 天票。
*/

function mincostTickets(days, costs) {
  const lastDay = days[days.length - 1];
  const travelDays = new Set(days);
  const dp = new Array(lastDay + 1).fill(0);

  for (let day = 1; day <= lastDay; day++) {
    if (!travelDays.has(day)) {
      dp[day] = dp[day - 1];
      continue;
    }

    dp[day] = Math.min(
      dp[Math.max(0, day - 1)] + costs[0],
      dp[Math.max(0, day - 7)] + costs[1],
      dp[Math.max(0, day - 30)] + costs[2],
    );
  }

  return dp[lastDay];
}

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]));
