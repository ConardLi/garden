import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';
import { ChartConfig } from '../types';

interface ChartPreviewProps {
  config: ChartConfig;
  style?: React.CSSProperties;
}

const ChartPreview: React.FC<ChartPreviewProps> = ({ config, style }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        p: 2,
        ...style
      }}
    >
      <ReactECharts
        option={{
          ...config,
          graphic: config.watermark?.show ? (() => {
            const density = config.watermark.density || 2;
            const rotate = config.watermark.rotate || -30;
            const graphics = [];
            const gap = 200 / density; // 根据密度调整间距

            // 创建水印网格
            for (let x = -100; x <= 200; x += gap) {
              for (let y = -100; y <= 200; y += gap) {
                graphics.push({
                  type: 'text',
                  left: `${x}%`,
                  top: `${y}%`,
                  z: -1,
                  rotation: rotate * Math.PI / 180,
                  style: {
                    fill: config.watermark.color || '#e0e0e0',
                    fontSize: config.watermark.fontSize || 20,
                    text: config.watermark.text || '',
                    opacity: config.watermark.opacity || 0.2
                  }
                });
              }
            }
            return graphics;
          })() : undefined
        }}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </Box>
  );
};

export default ChartPreview;
