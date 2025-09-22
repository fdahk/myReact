
export interface FileChunk {
    chunk: Blob;
    hash: string;
    index: number;
    progress: number;
  }
  
  export interface UploadFile {
    file: File;
    hash: string;
    chunks: FileChunk[];
    uploadedChunks: Set<number>;
    status: 'pending' | 'uploading' | 'paused' | 'completed' | 'error';
    progress: number;
    speed: number;
    error?: string;
  }
  
  export interface UploadConfig {
    chunkSize: number;
    concurrent: number;
    retryTimes: number;
    enableCompression: boolean;
    enableResume: boolean;
  }