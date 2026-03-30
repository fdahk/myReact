/*
实现目标：
- 手写一个千分位格式化函数，把数字转成带逗号的字符串。
-
核心思路：
- 先把数字转成字符串，再拆出整数部分和小数部分。
- 对整数部分从右向左每三位插入一个逗号。
- 最后把格式化后的整数部分和原小数部分拼回去。
-
复杂度 / 运行特征：
- 时间复杂度约为 O(n)，n 为数字字符串长度。
- 当前实现不依赖 `toLocaleString`，更适合解释底层处理思路。
-
易错点：
- 负数和小数都要考虑。
- 面试里要先确认输入是 number 还是字符串，以及是否需要保留原始小数精度。
-
适用场景 / 面试表达点：
- 常见于金额展示、统计报表和字符串处理题。
*/

function formatThousands(value) {
  const stringValue = String(value);
  const negative = stringValue.startsWith('-') ? '-' : '';
  const normalized = negative ? stringValue.slice(1) : stringValue;
  const [integerPart, decimalPart] = normalized.split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart === undefined
    ? `${negative}${formattedInteger}`
    : `${negative}${formattedInteger}.${decimalPart}`;
}

console.log(formatThousands(1234567890.56));
console.log(formatThousands(-9876543));
