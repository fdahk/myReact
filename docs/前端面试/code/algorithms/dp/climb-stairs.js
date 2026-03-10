function climbStairs(n) {
  if (n <= 2) {
    return n;
  }

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i += 1) {
    const next = first + second;
    first = second;
    second = next;
  }

  return second;
}

console.log(climbStairs(5));
