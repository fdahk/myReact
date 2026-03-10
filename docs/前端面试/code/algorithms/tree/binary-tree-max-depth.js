function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function maxDepth(root) {
  if (!root) {
    return 0;
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

const root = new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3));
console.log(maxDepth(root));
