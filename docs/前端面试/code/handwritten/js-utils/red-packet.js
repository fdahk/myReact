/*
实现目标：
- 根据红包总数和总金额，随机分配每个红包金额，尽量保证总体公平。

核心思路：
- 常见做法是二倍均值法。
- 每次从“当前平均值的两倍”范围内随机一个金额。
- 最后一个红包拿剩余金额。

易错点：
- 金额要控制到两位小数。
- 每个红包至少保留 0.01。
*/

function divideRedPacket(totalMoney, count) {
  const result = [];
  let restMoney = totalMoney;
  let restCount = count;

  for (let i = 0; i < count - 1; i++) {
    const max = (restMoney / restCount) * 2;
    const money = Math.max(0.01, +(Math.random() * max).toFixed(2));
    result.push(money);
    restMoney = +(restMoney - money).toFixed(2);
    restCount -= 1;
  }

  result.push(+restMoney.toFixed(2));
  return result;
}

console.log(divideRedPacket(10, 5));
