type UploadChunk = (index: number) => Promise<void>;

export async function uploadChunks(
  total: number,
  concurrency: number,
  uploadChunk: UploadChunk,
) {
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < total) {
      const current = nextIndex;
      nextIndex += 1;
      await uploadChunk(current);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, total) }, () => worker()),
  );
}

/*
面试讲解点：
1. 这题本质是“大文件切片上传中的并发调度”。
2. 核心状态是 nextIndex，它表示下一个待上传分片。
3. 多个 worker 共享同一个游标，谁先空出来谁就补位。
4. 真项目里通常还会补失败重试、取消、进度汇总、断点续传和秒传校验。
*/
