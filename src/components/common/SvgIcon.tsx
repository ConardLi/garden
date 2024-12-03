import React, { useEffect, useState } from 'react';
import { SvgIcon as MuiSvgIcon, SvgIconProps } from '@mui/material';

interface Props extends Omit<SvgIconProps, 'children'> {
  /**
   * SVG 文件名（不含扩展名），文件应位于 /public/svg/ 目录下
   * @example 'baidu' 对应 /public/svg/baidu.svg
   */
  name: string;
}

export const SvgIcon: React.FC<Props> = ({ name, ...props }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [viewBox, setViewBox] = useState<string>('0 0 24 24');

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/svg/${name}.svg`);
        const svgText = await response.text();
        
        // 解析 SVG 文本
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          // 获取 viewBox
          const vb = svgElement.getAttribute('viewBox');
          if (vb) setViewBox(vb);
          
          // 获取第一个 path 元素
          const pathElement = svgElement.querySelector('path');
          if (pathElement) {
            setSvgContent(pathElement.getAttribute('d') || '');
          }
        }
      } catch (error) {
        console.error(`Error loading SVG ${name}:`, error);
      }
    };

    loadSvg();
  }, [name]);

  if (!svgContent) {
    return null;
  }

  return (
    <MuiSvgIcon {...props} viewBox={viewBox}>
      <path d={svgContent} />
    </MuiSvgIcon>
  );
};

export default SvgIcon;
