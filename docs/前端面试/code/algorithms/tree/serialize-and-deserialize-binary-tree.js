/**
 * 题目目标：实现二叉树的序列化与反序列化。
 * 核心思路：采用前序遍历序列化，并用 `#` 标记空节点。
 * 这样反序列化时只需按相同遍历顺序消费数组，就能唯一还原树结构。
 * 时间复杂度：O(n)，序列化和反序列化都需要访问每个真实节点及空指针占位。
 * 空间复杂度：O(n)，结果数组与递归栈都需要额外空间。
 * 易错点 / 面试表达点：
 * 1. 只记录节点值不足以还原普通二叉树结构，必须显式记录空节点。
 * 2. 序列化和反序列化必须严格使用同一遍历顺序。
 * 3. `shift()` 在数组上有移动开销，若面试深入可改成指针下标读取。
 */
function serialize(root) {
  const result = [];

  function dfs(node) {
    if (!node) {
      // 空节点也要写入占位符，否则结构信息会丢失。
      result.push('#');
      return;
    }
    result.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(',');
}

function deserialize(data) {
  const values = data.split(',');

  function build() {
    const value = values.shift();
    if (value === '#') {
      return null;
    }
    // 按前序消费顺序递归构建，天然对应序列化时的写入顺序。
    return { val: Number(value), left: build(), right: build() };
  }

  return build();
}

const serialized = serialize({ val: 1, left: { val: 2, left: null, right: null }, right: null });
console.log(serialized);
console.log(deserialize(serialized));
