import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import { Box } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";

interface VirtualGridProps {
  items: any[];
  itemHeight: number;
  renderItem: (item: any, style: React.CSSProperties) => React.ReactElement;
  gap?: number;
  minItemWidth?: number;
}

const VirtualGrid: React.FC<VirtualGridProps> = memo(
  ({ items, itemHeight, renderItem, gap = 16, minItemWidth = 300 }) => {
    const windowSize = useWindowSize();
    
    // 获取父容器的宽度
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      const updateWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setContainerWidth(width);
        }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // 计算每行可以放置的列数，确保不会出现截断
    const columnCount = Math.max(
      1,
      Math.floor((containerWidth + gap) / (minItemWidth + gap))
    );

    // 计算实际的列宽，确保填满容器
    const columnWidth = (containerWidth - (columnCount - 1) * gap) / columnCount;

    // 计算总行数
    const rowCount = Math.ceil(items.length / columnCount);

    const Cell = useCallback(
      ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
        const index = rowIndex * columnCount + columnIndex;
        if (index >= items.length) return null;

        const item = items[index];
        const adjustedStyle = {
          ...style,
          padding: `${gap / 2}px`,
          height: itemHeight,
        };

        return renderItem(item, adjustedStyle);
      },
      [items, columnCount, gap, itemHeight, renderItem]
    );

    return (
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {containerWidth > 0 && (
          <FixedSizeGrid
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={rowCount * itemHeight}
            rowCount={rowCount}
            rowHeight={itemHeight}
            width={containerWidth}
          >
            {Cell}
          </FixedSizeGrid>
        )}
      </Box>
    );
  }
);

export default VirtualGrid;
