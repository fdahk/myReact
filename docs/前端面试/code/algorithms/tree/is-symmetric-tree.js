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
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  return isMirror(root?.left ?? null, root?.right ?? null);
}

const root = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(2, new TreeNode(4), new TreeNode(3)));
console.log(isSymmetric(root));
