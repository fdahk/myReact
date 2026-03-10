/*
面试讲解点：大文件切片上传核心流程
- 题目本质：本质是切片、并发控制、断点续传和失败重试，不是单纯把文件一次性传上去。
- 复杂度：切片数量为 n 时，前端切片和调度通常是 O(n)。
- 易错点：切片大小、并发数、文件指纹、失败重试、进度汇总。
- 追问方向：可以延伸到秒传、Worker 计算 hash、服务端合并切片。
- 讲题顺序：先确认需求，再说核心思路，然后写最小实现，最后补边界、优化点和适用场景。
*/

async function uploadLargeFile(file, chunkSize, uploadChunk) {
  const tasks = [];
  let index = 0;

  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize);
    tasks.push(uploadChunk({ chunk, index }));
    index += 1;
  }

  await Promise.all(tasks);
  return { uploadedChunks: index };
}

// uploadLargeFile(file, 1024 * 1024, async ({ chunk, index }) => {
//   console.log('upload chunk', index, chunk.size);
// });
