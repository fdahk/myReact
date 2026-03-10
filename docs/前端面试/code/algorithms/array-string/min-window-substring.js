function minWindow(s, t) {
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) ?? 0) + 1);
  }

  let left = 0;
  let valid = 0;
  let start = 0;
  let minLength = Infinity;
  const windowCount = new Map();

  for (let right = 0; right < s.length; right += 1) {
    const char = s[right];
    if (need.has(char)) {
      windowCount.set(char, (windowCount.get(char) ?? 0) + 1);
      if (windowCount.get(char) === need.get(char)) {
        valid += 1;
      }
    }

    while (valid === need.size) {
      if (right - left + 1 < minLength) {
        start = left;
        minLength = right - left + 1;
      }

      const leftChar = s[left];
      left += 1;
      if (need.has(leftChar)) {
        if (windowCount.get(leftChar) === need.get(leftChar)) {
          valid -= 1;
        }
        windowCount.set(leftChar, windowCount.get(leftChar) - 1);
      }
    }
  }

  return minLength === Infinity ? '' : s.slice(start, start + minLength);
}

console.log(minWindow('ADOBECODEBANC', 'ABC'));
