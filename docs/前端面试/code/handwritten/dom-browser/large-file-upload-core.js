/*
 * 实现目标：
 * - 提供一个大文件切片上传的核心骨架：把文件按固定大小切片，并把每个切片交给外部上传函数处理。
 * - 该示例聚焦“前端如何拆分与调度切片”，不包含哈希、断点续传、重试与并发上限等完整能力。
 *
 * 核心思路：
 * - 通过 `for` 循环按 `chunkSize` 逐段切出 `Blob` 子片段。
 * - 为每个切片构造上传任务，并把切片内容和切片序号交给 `uploadChunk`。
 * - 使用 `Promise.all` 等待所有切片上传完成，最后返回总切片数作为简单结果。
 *
 * 复杂度 / 运行特征：
 * - 切片遍历是 O(n)，其中 n 为切片数量。
 * - 当前实现会一次性创建全部上传任务，实际并发度取决于 `uploadChunk` 的执行策略。
 *
 * 易错点：
 * - 大文件场景若不限制并发，可能瞬间占用过多网络连接和内存。
 * - 切片序号、切片大小和服务端合并协议必须严格对齐。
 * - 真正生产方案通常还要加入 hash、秒传校验、失败重试、断点续传和进度聚合。
 *
 * 适用场景 / 面试表达点：
 * - 适合讲大文件上传的最小前端模型，以及“为什么不能直接整文件一次上传”。
 * - 面试里可以继续展开分片并发控制、Worker 计算文件指纹、服务端切片合并方案。
 */

async function uploadLargeFile(file, chunkSize, uploadChunk) {
  const tasks = [];
  let index = 0;

  for (let start = 0; start < file.size; start += chunkSize) {
    // 按固定大小切出当前分片，最后一个分片可能不足 chunkSize。
    const chunk = file.slice(start, start + chunkSize);
    tasks.push(uploadChunk({ chunk, index }));
    index += 1;
  }

  // 这里直接并发等待全部任务完成，示例中不额外实现并发池。
  await Promise.all(tasks);
  return { uploadedChunks: index };
}
