import imageCompression from 'browser-image-compression';

export type OutputFormat = 'avif' | 'jpeg' | 'jxl' | 'png' | 'webp';

export interface CompressionResult {
  original: number;
  compressed: number;
  compressedFile: File;
  format: OutputFormat;
}

export interface CompressionOptions {
  quality: number;
  outputFormat: OutputFormat;
}

export const DEFAULT_OPTIONS: CompressionOptions = {
  quality: 0.75,
  outputFormat: 'webp',
};

export const OUTPUT_FORMATS: { value: OutputFormat; label: string }[] = [
  { value: 'avif', label: 'AVIF' },
  { value: 'jpeg', label: 'JPEG' },
  { value: 'jxl', label: 'JPEG XL' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WebP' },
];

export const compressImage = async (
  file: File,
  options: CompressionOptions,
  onProgress: (progress: number) => void
): Promise<CompressionResult> => {
  const compressionOptions = {
    maxSizeMB: file.size / (1024 * 1024) * options.quality,
    useWebWorker: true,
    onProgress,
    fileType: `image/${options.outputFormat}`,
  };

  const compressedFile = await imageCompression(file, compressionOptions);
  
  return {
    original: file.size / 1024 / 1024,
    compressed: compressedFile.size / 1024 / 1024,
    compressedFile,
    format: options.outputFormat,
  };
};

export const downloadFile = (file: File, fileName: string, format: OutputFormat) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(file);
  
  // 确保文件扩展名正确
  const baseName = fileName.replace(/\.[^\.]+$/, '');
  downloadLink.download = `${baseName}.${format}`;
  
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
}; 