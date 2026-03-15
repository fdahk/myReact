/**
 * 题目目标：判断在给定先修课程关系的前提下，是否能够完成全部课程。
 * 核心思路：把课程依赖建成有向图，再用拓扑排序（Kahn 算法）处理入度为 0 的课程。
 * 每弹出一个入度为 0 的课程，就相当于完成它，并减少其后继课程的入度；
 * 最终若能处理完所有课程，说明图中无环，可以修完全部课程。
 * 时间复杂度：O(V + E)，V 为课程数，E 为依赖边数。
 * 空间复杂度：O(V + E)，图、入度数组和队列都需要额外空间。
 * 易错点 / 面试表达点：
 * 1. `prerequisites` 中 `[course, pre]` 表示 `pre -> course`，方向别写反。
 * 2. 能否完成课程本质上就是判断有向图是否存在环。
 * 3. 除拓扑排序外，也可以用 DFS 染色法做环检测。
 */
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
    // 当前课程被“修完”后，释放它指向的后续课程。
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
