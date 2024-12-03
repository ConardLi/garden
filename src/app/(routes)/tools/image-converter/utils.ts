export type ImageFormat = 'PNG' | 'JPEG' | 'WEBP';

export interface ConversionOptions {
  format: ImageFormat;
  quality: number; // 0-1, 仅对 JPEG 和 WEBP 有效
}

export interface ConversionResult {
  original: {
    size: number;
    format: string;
  };
  converted: {
    size: number;
    format: ImageFormat;
    url: string;
  };
}

export const convertImage = async (
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建 canvas 上下文'));
          return;
        }

        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${options.format.toLowerCase()}`;
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('转换失败'));
              return;
            }

            resolve({
              original: {
                size: file.size / 1024, // KB
                format: file.type.split('/')[1].toUpperCase(),
              },
              converted: {
                size: blob.size / 1024, // KB
                format: options.format,
                url: URL.createObjectURL(blob),
              },
            });
          },
          mimeType,
          options.format === 'PNG' ? undefined : options.quality
        );
      };
    };

    reader.readAsDataURL(file);
  });
};

export const downloadConvertedImage = (url: string, originalName: string, format: ImageFormat) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = `${originalName.split('.')[0]}.${format.toLowerCase()}`;
  link.click();
}; 