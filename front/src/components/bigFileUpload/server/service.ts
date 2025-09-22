// services/uploadService.ts
import fs from 'fs/promises';
import path from 'path';
import { createHash } from 'crypto';
import { ChunkInfo, FileInfo } from '../types/upload';

export class UploadService {
  private uploadDir = path.join(process.cwd(), 'uploads');
  private chunksDir = path.join(this.uploadDir, 'chunks');

  constructor() {
    this.ensureDirectories();
  }

  private async ensureDirectories() {
    await fs.mkdir(this.uploadDir, { recursive: true });
    await fs.mkdir(this.chunksDir, { recursive: true });
  }

  // 保存分片
  async saveChunk(chunkInfo: ChunkInfo, chunkBuffer: Buffer): Promise<void> {
    const chunkDir = path.join(this.chunksDir, chunkInfo.fileHash);
    await fs.mkdir(chunkDir, { recursive: true });
    
    const chunkPath = path.join(chunkDir, `${chunkInfo.index}`);
    await fs.writeFile(chunkPath, chunkBuffer);
  }

  // 检查文件是否存在（秒传）
  async checkFileExists(fileHash: string): Promise<boolean> {
    const filePath = path.join(this.uploadDir, fileHash);
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  // 获取已上传的分片
  async getUploadedChunks(fileHash: string): Promise<number[]> {
    const chunkDir = path.join(this.chunksDir, fileHash);
    try {
      const files = await fs.readdir(chunkDir);
      return files.map(file => parseInt(file)).sort((a, b) => a - b);
    } catch {
      return [];
    }
  }

  // 合并分片
  async mergeChunks(fileHash: string, fileName: string): Promise<string> {
    const chunkDir = path.join(this.chunksDir, fileHash);
    const filePath = path.join(this.uploadDir, `${fileHash}_${fileName}`);
    
    const chunkFiles = await fs.readdir(chunkDir);
    const sortedChunks = chunkFiles
      .map(file => parseInt(file))
      .sort((a, b) => a - b);

    const writeStream = fs.createWriteStream(filePath);
    
    for (const chunkIndex of sortedChunks) {
      const chunkPath = path.join(chunkDir, chunkIndex.toString());
      const chunkBuffer = await fs.readFile(chunkPath);
      writeStream.write(chunkBuffer);
    }

    return new Promise((resolve, reject) => {
      writeStream.end();
      writeStream.on('finish', () => {
        // 清理分片文件
        this.cleanupChunks(fileHash);
        resolve(filePath);
      });
      writeStream.on('error', reject);
    });
  }

  // 清理分片文件
  private async cleanupChunks(fileHash: string): Promise<void> {
    const chunkDir = path.join(this.chunksDir, fileHash);
    try {
      await fs.rmdir(chunkDir, { recursive: true });
    } catch (error) {
      console.error('Failed to cleanup chunks:', error);
    }
  }

  // 计算文件 hash
  calculateHash(buffer: Buffer): string {
    return createHash('md5').update(buffer).digest('hex');
  }
}