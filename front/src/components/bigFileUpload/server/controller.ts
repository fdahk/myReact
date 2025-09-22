// controllers/uploadController.ts
import { Request, Response } from 'express';
import multer from 'multer';
import { UploadService } from '../services/uploadService';

const upload = multer({ storage: multer.memoryStorage() });
const uploadService = new UploadService();

export class UploadController {
  // 上传分片
  async uploadChunk(req: Request, res: Response) {
    try {
      const { hash, fileHash, fileName, index } = req.body;
      const chunkBuffer = req.file?.buffer;

      if (!chunkBuffer) {
        return res.status(400).json({ error: 'No chunk data' });
      }

      const chunkInfo = {
        hash,
        fileHash,
        fileName,
        index: parseInt(index),
        size: chunkBuffer.length
      };

      await uploadService.saveChunk(chunkInfo, chunkBuffer);
      
      res.json({ success: true, message: 'Chunk uploaded successfully' });
    } catch (error) {
      console.error('Upload chunk error:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  }

  // 检查文件是否存在
  async checkFile(req: Request, res: Response) {
    try {
      const { fileHash } = req.params;
      const exists = await uploadService.checkFileExists(fileHash);
      
      res.json({ exists });
    } catch (error) {
      console.error('Check file error:', error);
      res.status(500).json({ error: 'Check failed' });
    }
  }

  // 获取已上传的分片
  async getUploadedChunks(req: Request, res: Response) {
    try {
      const { fileHash } = req.params;
      const chunks = await uploadService.getUploadedChunks(fileHash);
      
      res.json({ chunks });
    } catch (error) {
      console.error('Get chunks error:', error);
      res.status(500).json({ error: 'Get chunks failed' });
    }
  }

  // 合并分片
  async mergeChunks(req: Request, res: Response) {
    try {
      const { fileHash, fileName } = req.body;
      const filePath = await uploadService.mergeChunks(fileHash, fileName);
      
      res.json({ 
        success: true, 
        message: 'File merged successfully',
        filePath 
      });
    } catch (error) {
      console.error('Merge chunks error:', error);
      res.status(500).json({ error: 'Merge failed' });
    }
  }
}