import React, { useCallback, memo } from 'react';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { Box } from '@mui/material';
import useWindowSize from '../../hooks/useWindowSize';

interface VirtualGridProps {
  items: any[];
  itemHeight: number;
  renderItem: (item: any, style: React.CSSProperties) => React.ReactElement;
  gap?: number;
  minItemWidth?: number;
}

const VirtualGrid: React.FC<VirtualGridProps> = memo(({
  items,
  itemHeight,
  renderItem,
  gap = 16,
  minItemWidth = 300,
}) => {
  const windowSize = useWindowSize();
  const containerWidth = Math.min(windowSize.width - 48, 1600);

  // 计算每行可以放置的列数
  const columnCount = Math.max(1, Math.floor((containerWidth + gap) / (minItemWidth + gap)));
  const columnWidth = (containerWidth - (columnCount - 1) * gap) / columnCount;
  
  // 计算总行数
  const rowCount = Math.ceil(items.length / columnCount);

  const Cell = useCallback(({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= items.length) return null;

    const item = items[index];
    const adjustedStyle = {
      ...style,
      padding: `${gap/2}px`,
      height: itemHeight,
    };

    return renderItem(item, adjustedStyle);
  }, [items, columnCount, gap, itemHeight, renderItem]);

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 1600, 
      margin: '0 auto',
    }}>
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={windowSize.height - 200}
        rowCount={rowCount}
        rowHeight={itemHeight}
        width={containerWidth}
      >
        {Cell}
      </FixedSizeGrid>
    </Box>
  );
});

export default VirtualGrid;
