import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import TagFilter from '@/components/workspace/TagFilter';

const Sidebar = styled(Box)(({ theme }) => ({
  width: "252px",
  flexShrink: 0,
  position: "sticky",
  top: theme.spacing(4),
  height: "fit-content",
  maxHeight: `calc(100vh - ${theme.spacing(8)})`,
  overflowY: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
}));

interface PromptSidebarProps {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

const PromptSidebar: React.FC<PromptSidebarProps> = React.memo(({
  tags,
  selectedTag,
  onTagChange,
}) => {
  const handleTagChange = (newTags: string[]) => {
    onTagChange(newTags[0] || "");
  };

  return (
    <Sidebar>
      <TagFilter<string>
        tags={tags}
        selectedTags={selectedTag ? [selectedTag] : []}
        onTagChange={handleTagChange}
        singleSelect
      />
    </Sidebar>
  );
});

PromptSidebar.displayName = 'PromptSidebar';

export default PromptSidebar;
