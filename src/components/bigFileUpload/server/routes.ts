// routes/uploadRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { UploadController } from '../controllers/uploadController';

const router = Router();
const uploadController = new UploadController();
const upload = multer({ storage: multer.memoryStorage() });

// 上传分片
router.post('/chunk', upload.single('chunk'), uploadController.uploadChunk);

// 检查文件是否存在（秒传）
router.get('/check/:fileHash', uploadController.checkFile);

// 获取已上传的分片（断点续传）
router.get('/chunks/:fileHash', uploadController.getUploadedChunks);

// 合并分片
router.post('/merge', uploadController.mergeChunks);

export default router;