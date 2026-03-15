/**
 * 题目目标：判断一棵二叉树是否关于中心轴对称。
 * 核心思路：递归比较左右子树是否互为镜像。镜像比较要求：
 * 1. 当前两个节点值相等；
 * 2. 左子树的左节点对应右子树的右节点；
 * 3. 左子树的右节点对应右子树的左节点。
 * 时间复杂度：O(n)，每个节点最多参与一次镜像比较。
 * 空间复杂度：O(h)，h 为树高，主要来自递归栈。
 * 易错点 / 面试表达点：
 * 1. 对称不是比较“同侧孩子”，而是比较“交叉孩子”。
 * 2. 递归终止条件要先处理同时为空、单边为空和值不等三种情况。
 * 3. 面试里可顺带说明也可以用队列做迭代镜像检查。
 */
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function isSymmetric(root) {
  function isMirror(left, right) {
    if (!left && !right) {
      return true;
    }
    if (!left || !right || left.val !== right.val) {
      return false;
    }
    // 左左对右右、左右对右左，才符合“镜像”定义。
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  return isMirror(root?.left ?? null, root?.right ?? null);
}

const root = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(2, new TreeNode(4), new TreeNode(3)));
console.log(isSymmetric(root));
