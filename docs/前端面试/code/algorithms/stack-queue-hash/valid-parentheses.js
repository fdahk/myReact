function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const char of s) {
    if (!pairs[char]) {
      stack.push(char);
      continue;
    }

    if (stack.pop() !== pairs[char]) {
      return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid('()[]{}'));
console.log(isValid('(]'));
