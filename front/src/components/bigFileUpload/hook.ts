// hooks/useFileUpload.ts
import { useState, useCallback, useRef } from 'react';
import { UploadFile, UploadConfig, FileChunk } from '../types/upload';

export const useFileUpload = (config: UploadConfig) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  // 计算文件 hash（用于秒传）
  const calculateHash = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const hash = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        resolve(hash);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // 文件分片
  const createFileChunks = (file: File, chunkSize: number): FileChunk[] => {
    const chunks: FileChunk[] = [];
    let cur = 0;
    
    while (cur < file.size) {
      const chunk = file.slice(cur, cur + chunkSize);
      const hash = `${file.name}-${cur}`;
      chunks.push({
        chunk,
        hash,
        index: chunks.length,
        progress: 0
      });
      cur += chunkSize;
    }
    
    return chunks;
  };

  // 压缩文件
  const compressFile = async (file: File): Promise<File> => {
    if (!config.enableCompression || !file.type.startsWith('image/')) {
      return file;
    }

    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            resolve(file);
          }
        }, file.type, 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // 上传单个分片
  const uploadChunk = async (
    chunk: FileChunk, 
    fileHash: string, 
    fileName: string
  ): Promise<void> => {
    const formData = new FormData();
    formData.append('chunk', chunk.chunk);
    formData.append('hash', chunk.hash);
    formData.append('fileHash', fileHash);
    formData.append('fileName', fileName);
    formData.append('index', chunk.index.toString());

    const response = await fetch('/api/upload/chunk', {
      method: 'POST',
      body: formData,
      signal: abortController.current?.signal
    });

    if (!response.ok) {
      throw new Error(`Chunk upload failed: ${response.statusText}`);
    }
  };

  // 合并分片请求
  const mergeChunks = async (fileHash: string, fileName: string): Promise<void> => {
    const response = await fetch('/api/upload/merge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileHash, fileName }),
      signal: abortController.current?.signal
    });

    if (!response.ok) {
      throw new Error(`Merge failed: ${response.statusText}`);
    }
  };

  // 检查文件是否已存在（秒传）
  const checkFileExists = async (fileHash: string): Promise<boolean> => {
    const response = await fetch(`/api/upload/check/${fileHash}`);
    const { exists } = await response.json();
    return exists;
  };

  // 获取已上传的分片
  const getUploadedChunks = async (fileHash: string): Promise<number[]> => {
    const response = await fetch(`/api/upload/chunks/${fileHash}`);
    const { chunks } = await response.json();
    return chunks;
  };

  // 上传文件
  const uploadFile = async (file: File): Promise<void> => {
    const compressedFile = await compressFile(file);
    const fileHash = await calculateHash(compressedFile);
    
    // 检查秒传
    const exists = await checkFileExists(fileHash);
    if (exists) {
      console.log('文件秒传成功');
      return;
    }

    const chunks = createFileChunks(compressedFile, config.chunkSize);
    const uploadedChunks = new Set<number>();

    // 检查断点续传
    if (config.enableResume) {
      const uploadedChunkIndexes = await getUploadedChunks(fileHash);
      uploadedChunkIndexes.forEach(index => uploadedChunks.add(index));
    }

    const uploadFile: UploadFile = {
      file: compressedFile,
      hash: fileHash,
      chunks,
      uploadedChunks,
      status: 'uploading',
      progress: 0,
      speed: 0
    };

    setFiles(prev => [...prev, uploadFile]);

    // 并发上传分片
    const uploadChunks = async () => {
      const pendingChunks = chunks.filter(chunk => !uploadedChunks.has(chunk.index));
      
      const uploadPromises = pendingChunks.map(async (chunk) => {
        try {
          await uploadChunk(chunk, fileHash, compressedFile.name);
          uploadedChunks.add(chunk.index);
          
          // 更新进度
          setFiles(prev => prev.map(f => 
            f.hash === fileHash 
              ? { ...f, uploadedChunks: new Set(uploadedChunks) }
              : f
          ));
        } catch (error) {
          console.error('Chunk upload failed:', error);
          throw error;
        }
      });

      await Promise.all(uploadPromises);
    };

    try {
      await uploadChunks();
      await mergeChunks(fileHash, compressedFile.name);
      
      setFiles(prev => prev.map(f => 
        f.hash === fileHash 
          ? { ...f, status: 'completed', progress: 100 }
          : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.hash === fileHash 
          ? { ...f, status: 'error', error: error.message }
          : f
      ));
    }
  };

  // 批量上传
  const uploadFiles = async (fileList: FileList): Promise<void> => {
    setIsUploading(true);
    abortController.current = new AbortController();

    try {
      const files = Array.from(fileList);
      const uploadPromises = files.map(file => uploadFile(file));
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // 暂停上传
  const pauseUpload = (fileHash: string): void => {
    setFiles(prev => prev.map(f => 
      f.hash === fileHash 
        ? { ...f, status: 'paused' }
        : f
    ));
  };

  // 恢复上传
  const resumeUpload = async (fileHash: string): Promise<void> => {
    const file = files.find(f => f.hash === fileHash);
    if (file) {
      await uploadFile(file.file);
    }
  };

  // 取消上传
  const cancelUpload = (fileHash: string): void => {
    abortController.current?.abort();
    setFiles(prev => prev.filter(f => f.hash !== fileHash));
  };

  return {
    files,
    isUploading,
    uploadFiles,
    uploadFile,
    pauseUpload,
    resumeUpload,
    cancelUpload
  };
};