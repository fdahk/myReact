// types/upload.ts
export interface ChunkInfo {
    hash: string;
    fileHash: string;
    fileName: string;
    index: number;
    size: number;
  }
  
  export interface FileInfo {
    hash: string;
    fileName: string;
    size: number;
    chunks: number;
    uploadedChunks: number[];
  }