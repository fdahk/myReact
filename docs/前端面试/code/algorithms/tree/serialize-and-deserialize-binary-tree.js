function serialize(root) {
  const result = [];

  function dfs(node) {
    if (!node) {
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
    return { val: Number(value), left: build(), right: build() };
  }

  return build();
}

const serialized = serialize({ val: 1, left: { val: 2, left: null, right: null }, right: null });
console.log(serialized);
console.log(deserialize(serialized));
