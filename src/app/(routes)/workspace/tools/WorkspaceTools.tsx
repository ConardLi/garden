import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import ItemCard from '@/components/workspace/ItemCard';
import TagFilter from '@/components/workspace/TagFilter';
import { TOOLS, TAGS, TAG_TO_ICON } from '@/constants/tools';
import { getFavoriteTools, toggleFavoriteTool } from '@/utils/storage';
import { TagType } from '@/types/tool';
import { useQueryParams } from '@/hooks/useQueryParams';

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1600px',
  padding: theme.spacing(0, 2),
}));

interface WorkspaceToolsProps {
  selectedTag?: string;
  onTagChange?: (tag: string) => void;
  searchText?: string;
}

const WorkspaceTools: React.FC<WorkspaceToolsProps> = ({
  selectedTag: propSelectedTag,
  onTagChange,
  searchText = '',
}) => {
  const { params, updateParams } = useQueryParams<{ toolTag: string }>({
    toolTag: '',
  });

  const selectedTag = propSelectedTag || params.toolTag || '';

  const [favoriteTools, setFavoriteTools] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFavoriteTools(getFavoriteTools());
  }, []);

  const handleTagChange = (newTags: TagType[]) => {
    const newTag = newTags.length > 0 ? newTags[0] : '';
    if (onTagChange) {
      onTagChange(newTag);
    } else {
      updateParams({ toolTag: newTag });
    }
  };

  const handleToolClick = (toolId: string) => {
    window.open(`/tools/${toolId}`, '_blank');
  };

  const handleFavoriteToggle = (toolId: string) => {
    const newFavorites = toggleFavoriteTool(toolId);
    setFavoriteTools(newFavorites);
  };

  const filteredTools = React.useMemo(() => {
    let tools = !selectedTag ? TOOLS : TOOLS.filter(tool => 
      tool.tags.includes(selectedTag as TagType)
    );

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      tools = tools.filter(tool =>
        tool.name.toLowerCase().includes(lowerSearchText) ||
        tool.description.toLowerCase().includes(lowerSearchText)
      );
    }

    return tools;
  }, [selectedTag, searchText]);

  return (
    <ContentSection>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', 
        mb: 4,
        px: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '100%',
        overflow: 'auto',
      }}>
        <TagFilter<TagType>
          tags={TAGS}
          selectedTags={selectedTag ? [selectedTag as TagType] : []}
          tagToIcon={TAG_TO_ICON}
          onTagChange={handleTagChange}
          singleSelect
        />
      </Box>
      <Grid container spacing={2}>
        {filteredTools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={tool.id}>
            <ItemCard
              id={tool.id}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
              tags={tool.tags}
              onClick={() => handleToolClick(tool.id)}
              onFavoriteToggle={() => handleFavoriteToggle(tool.id)}
              isFavorite={favoriteTools.includes(tool.id)}
            />
          </Grid>
        ))}
      </Grid>
    </ContentSection>
  );
};

export default WorkspaceTools;
