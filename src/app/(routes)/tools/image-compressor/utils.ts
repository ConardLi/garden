import imageCompression from 'browser-image-compression';

export interface CompressionResult {
  original: number;
  compressed: number;
  compressedFile: File;
}

export interface CompressionOptions {
  quality: number;
}

export const compressImage = async (
  file: File,
  options: CompressionOptions,
  onProgress: (progress: number) => void
): Promise<CompressionResult> => {
  const compressionOptions = {
    maxSizeMB: file.size / (1024 * 1024) * options.quality,
    useWebWorker: true,
    onProgress,
  };

  const compressedFile = await imageCompression(file, compressionOptions);
  
  return {
    original: file.size / 1024 / 1024,
    compressed: compressedFile.size / 1024 / 1024,
    compressedFile,
  };
};

export const downloadFile = (file: File, fileName: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = fileName;
  downloadLink.click();
}; 