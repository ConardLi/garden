import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Pagination } from '@mui/material';
import VirtualGrid from '@/components/workspace/VirtualGrid';
import PromptCard from './PromptCard';
import { Prompt } from '../types';

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  height: "100%",
  overflowY: "auto",
  paddingRight: theme.spacing(2),
  "& > div": {
    width: "100% !important",
    margin: "0 !important",
  },
  "& .virtual-grid-container": {
    display: "grid !important",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr)) !important",
    gap: "16px !important",
    width: "100% !important",
  }
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  "& .MuiPagination-ul": {
    "& .MuiPaginationItem-root": {
      color: "rgba(255, 255, 255, 0.85)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      },
      "&.Mui-selected": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
  },
}));

interface PromptListProps {
  prompts: Prompt[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onPromptClick: (prompt: Prompt) => void;
}

const PromptList: React.FC<PromptListProps> = React.memo(({
  prompts,
  loading,
  page,
  totalPages,
  onPageChange,
  onPromptClick,
}) => {
  const renderItem = React.useCallback(
    (prompt: Prompt, style: React.CSSProperties) => (
      <PromptCard
        prompt={prompt}
        style={style}
        onClick={onPromptClick}
      />
    ),
    [onPromptClick]
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <Typography>加载中...</Typography>
      </Box>
    );
  }

  return (
    <MainContent>
      <VirtualGrid
        items={prompts}
        itemHeight={175}
        minItemWidth={280}
        gap={16}
        renderItem={renderItem}
        // @ts-ignore
        style={{ overflow: "visible" }}
        className="virtual-grid-container"
      />
      <PaginationContainer>
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          size="large"
          shape="rounded"
        />
      </PaginationContainer>
    </MainContent>
  );
});

PromptList.displayName = 'PromptList';

export default PromptList;
