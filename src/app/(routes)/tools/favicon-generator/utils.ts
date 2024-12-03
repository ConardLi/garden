import pngToIco from 'png-to-ico';

export interface FaviconOptions {
  size: number;
  backgroundColor: string;
  padding: number;
  borderRadius: number;
}

export interface GeneratedFavicon {
  size: number;
  url: string;
  blob: Blob;
}

export const FAVICON_SIZES = [16, 32, 48, 64, 128, 256];

export const generateFavicons = async (
  file: File,
  options: FaviconOptions
): Promise<GeneratedFavicon[]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = async (e) => {
      img.src = e.target?.result as string;
      img.onload = async () => {
        try {
          const favicons = await Promise.all(FAVICON_SIZES.map(async size => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              throw new Error('无法创建 canvas 上下文');
            }

            // 绘制背景
            if (options.backgroundColor) {
              ctx.fillStyle = options.backgroundColor;
              if (options.borderRadius > 0) {
                ctx.beginPath();
                ctx.roundRect(0, 0, size, size, options.borderRadius);
                ctx.fill();
              } else {
                ctx.fillRect(0, 0, size, size);
              }
            }

            // 计算padding和实际绘制尺寸
            const padding = (size * options.padding) / 100;
            const drawSize = size - (padding * 2);

            // 绘制图片
            ctx.drawImage(img, padding, padding, drawSize, drawSize);

            // 转换为 PNG blob
            return new Promise<GeneratedFavicon>((resolve, reject) => {
              canvas.toBlob(async (blob) => {
                if (!blob) {
                  reject(new Error('无法创建图片'));
                  return;
                }
                resolve({
                  size,
                  url: URL.createObjectURL(blob),
                  blob
                });
              }, 'image/png');
            });
          }));

          // 生成 ICO 文件
          const pngBuffers = await Promise.all(
            favicons.map(async favicon => {
              const arrayBuffer = await favicon.blob.arrayBuffer();
              return Buffer.from(arrayBuffer);
            })
          );

          const icoBuffer = await pngToIco(pngBuffers);
          const icoBlob = new Blob([icoBuffer], { type: 'image/x-icon' });
          
          // 添加 ICO 格式到结果中
          favicons.push({
            size: 0, // 特殊标记，表示这是 ICO 文件
            url: URL.createObjectURL(icoBlob),
            blob: icoBlob
          });

          resolve(favicons);
        } catch (error) {
          reject(error);
        }
      };
    };

    reader.readAsDataURL(file);
  });
};

export const downloadFavicon = (favicon: GeneratedFavicon) => {
  const link = document.createElement('a');
  link.href = favicon.url;
  if (favicon.size === 0) {
    link.download = 'favicon.ico';
  } else {
    link.download = `favicon-${favicon.size}x${favicon.size}.png`;
  }
  link.click();
};

export const downloadAllFavicons = (favicons: GeneratedFavicon[]) => {
  favicons.forEach(favicon => {
    downloadFavicon(favicon);
  });
}; 