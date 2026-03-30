/*
实现目标：
- 手写一个版本号比较函数，比较如 `1.2.10` 和 `1.3.0` 的大小关系。
-
核心思路：
- 先按 `.` 切分成数字段。
- 从左到右逐位比较，不足位按 `0` 补齐。
- 某一位先分出大小时立即返回结果。
-
复杂度 / 运行特征：
- 时间复杂度为 O(n)，n 为最大段数。
- 空间复杂度约为 O(n)，来自拆分后的数组。
-
易错点：
- `1.0` 和 `1` 应视为相等。
- 逐段比较时必须转成数字，否则字符串比较会把 `10` 错判成比 `2` 小。
- 如果题目继续追问，可以再补预发布标签如 `alpha`、`beta`、`rc` 的规则。
-
适用场景 / 面试表达点：
- 常见于客户端版本升级、灰度开关、兼容性判断。
- 面试里可以先给纯数字版，再说明语义化版本会更复杂。
*/

function compareVersion(versionA, versionB) {
  const partsA = versionA.split('.');
  const partsB = versionB.split('.');
  const maxLength = Math.max(partsA.length, partsB.length);

  for (let index = 0; index < maxLength; index += 1) {
    const currentA = Number(partsA[index] || 0);
    const currentB = Number(partsB[index] || 0);

    if (currentA > currentB) {
      return 1;
    }

    if (currentA < currentB) {
      return -1;
    }
  }

  return 0;
}

console.log(compareVersion('1.2.10', '1.2.3'));
console.log(compareVersion('2.0', '2'));
