/*
实现目标：
- 手写一个大数相加函数，解决超出 JavaScript 安全整数范围后的加法问题。
-
核心思路：
- 把数字当作字符串处理，从最低位开始逐位相加。
- 每一位都带上进位 `carry`，得到当前位结果后继续向高位推进。
- 最后把结果反转拼回字符串。
-
复杂度 / 运行特征：
- 时间复杂度为 O(n)，n 为较长数字串长度。
- 空间复杂度也为 O(n)，来自结果数组。
-
易错点：
- 不能直接转成 `Number`，否则会丢失精度。
- 两个字符串长度不同，要把缺失位按 `0` 处理。
- 循环结束后若仍有进位，必须补到最高位。
-
适用场景 / 面试表达点：
- 常见于金额、ID、超长整数计算题。
- 面试里可以顺带扩展大数乘法、减法和字符串数值处理。
*/

function addBigNumber(a, b) {
  let indexA = a.length - 1;
  let indexB = b.length - 1;
  let carry = 0;
  const result = [];

  while (indexA >= 0 || indexB >= 0 || carry > 0) {
    const digitA = indexA >= 0 ? Number(a[indexA]) : 0;
    const digitB = indexB >= 0 ? Number(b[indexB]) : 0;
    const sum = digitA + digitB + carry;

    result.push(sum % 10);
    carry = Math.floor(sum / 10);
    indexA -= 1;
    indexB -= 1;
  }

  return result.reverse().join('');
}

console.log(addBigNumber('999999999999999999', '123456789'));
