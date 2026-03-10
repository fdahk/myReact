function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, pre] of prerequisites) {
    graph[pre].push(course);
    indegree[course] += 1;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i += 1) {
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  let finished = 0;
  while (queue.length) {
    const course = queue.shift();
    finished += 1;
    for (const next of graph[course]) {
      indegree[next] -= 1;
      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return finished === numCourses;
}

console.log(canFinish(2, [[1, 0]]));
console.log(canFinish(2, [[1, 0], [0, 1]]));
