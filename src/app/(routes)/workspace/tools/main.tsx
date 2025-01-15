import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import ItemCard from "@/components/workspace/ItemCard";
import TagFilter from "@/components/workspace/TagFilter";
import { TOOLS, TAGS, TAG_TO_ICON } from "@/constants/tools";
import { getFavoriteTools, toggleFavoriteTool } from "@/utils/fe/storage";
import { TagType } from "@/types/tool";
import { useQueryParams } from "@/hooks/useQueryParams";

const ContentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1600px",
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
  searchText = "",
}) => {
  const { params, updateParams } = useQueryParams<{
    toolTag: string;
    page: string;
  }>({
    toolTag: "",
    page: "1",
  });

  const selectedTag = propSelectedTag || params.toolTag || "";
  const currentPage = parseInt(params.page) || 1;
  const itemsPerPage = 24;

  const [favoriteTools, setFavoriteTools] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFavoriteTools(getFavoriteTools());
  }, []);

  const handleTagChange = (newTags: TagType[]) => {
    const newTag = newTags.length > 0 ? newTags[0] : "";
    if (onTagChange) {
      onTagChange(newTag);
    } else {
      updateParams({ toolTag: newTag, page: "1" });
    }
  };

  const handleToolClick = (toolId: string) => {
    window.open(`/tools/${toolId}`, "_blank");
  };

  const handleFavoriteToggle = (toolId: string) => {
    const newFavorites = toggleFavoriteTool(toolId);
    setFavoriteTools(newFavorites);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    updateParams({ ...params, page: value.toString() });
  };

  const filteredTools = React.useMemo(() => {
    let tools = !selectedTag
      ? TOOLS
      : TOOLS.filter((tool) => tool.tags.includes(selectedTag as TagType));

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      tools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowerSearchText) ||
          tool.description.toLowerCase().includes(lowerSearchText)
      );
    }

    return tools;
  }, [selectedTag, searchText]);

  const paginatedTools = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTools.slice(startIndex, endIndex);
  }, [filteredTools, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);

  // 当筛选条件改变时，重置页码
  React.useEffect(() => {
    if (searchText || selectedTag) {
      updateParams({ ...params, page: "1" });
    }
  }, [selectedTag, searchText]);

  return (
    <ContentSection>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mb: 4,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <TagFilter<TagType>
          tags={TAGS}
          selectedTags={selectedTag ? [selectedTag as TagType] : []}
          tagToIcon={TAG_TO_ICON}
          onTagChange={handleTagChange}
          singleSelect
        />
      </Box>
      <Grid container spacing={2}>
        {paginatedTools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={tool.id}>
            <ItemCard
              id={tool.id}
              name={tool.name}
              icon={tool.icon}
              description={tool.description}
              tags={tool.tags}
              isFavorite={favoriteTools.includes(tool.id)}
              onFavoriteToggle={() => handleFavoriteToggle(tool.id)}
              onClick={() => handleToolClick(tool.id)}
            />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Stack
          spacing={2}
          sx={{ mt: 4, display: "flex", alignItems: "center" }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "rgba(255, 255, 255, 0.7)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              },
            }}
          />
        </Stack>
      )}
    </ContentSection>
  );
};

export default WorkspaceTools;
