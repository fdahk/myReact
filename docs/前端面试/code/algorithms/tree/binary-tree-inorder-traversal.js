function inorderTraversal(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
}
