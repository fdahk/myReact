/*
实现目标：
- 给两个无限输入流，持续找出两个流中都出现过的共同元素。

核心思路：
- 用两个 `Set` 分别记录两个流已出现的值。
- 新元素进来时检查它是否已在另一边出现过。
- 若出现过且没输出过，就产出结果。
*/

class CommonElementsFromStreams {
  constructor() {
    this.seenA = new Set();
    this.seenB = new Set();
    this.output = new Set();
  }

  pushFromA(value) {
    this.seenA.add(value);
    return this.tryEmit(value);
  }

  pushFromB(value) {
    this.seenB.add(value);
    return this.tryEmit(value);
  }

  tryEmit(value) {
    if (this.seenA.has(value) && this.seenB.has(value) && !this.output.has(value)) {
      this.output.add(value);
      return value;
    }
    return undefined;
  }
}

const matcher = new CommonElementsFromStreams();
console.log(matcher.pushFromA(1));
console.log(matcher.pushFromB(1));


// ### 1. 位图（Bitmap）

// 适用前提是：元素值域有限，比如元素都是 `0 ~ 10^8` 之间的整数。

// 做法：

// 1. 准备两个位图 `bitmapA`、`bitmapB`。
// 2. 流 A 来一个数 `x`，就把 `bitmapA[x]` 置为 `1`。
// 3. 流 B 来一个数 `x` 时，先检查 `bitmapA[x]` 是否为 `1`，如果是，说明它在 A 中出现过。

// 底层原理是：用 1 bit 表示一个元素是否出现过，比 `Set` 节省很多空间。因为 `Set` 至少要存对象结构和哈希开销，而位图只占 1 bit。

// ### 2. 布隆过滤器（Bloom Filter）

// 适用前提是：数据量特别大，可以接受“可能误判存在，但不会漏判存在”。

// 做法：

// 1. 准备一个较大的 bit array。
// 2. 选择多个哈希函数。
// 3. 流 A 来一个元素 `x`，就用多个哈希函数算出多个位置，把这些位置都置为 `1`。
// 4. 流 B 来一个元素 `x`，也算出多个位置：
//    - 如果有任意一个位置为 `0`，说明它一定没在 A 中出现过。
//    - 如果所有位置都为 `1`，说明它“可能”在 A 中出现过。

// 底层原理是：布隆过滤器不直接存元素，只存“哈希后打点”的痕迹，所以空间效率很高。