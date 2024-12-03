import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

interface TagFilterProps<T extends string> {
  tags: T[];
  selectedTags: T[];
  tagToIcon?: { [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string } };
  onTagChange: (tags: T[]) => void;
  singleSelect?: boolean;
}

const TagFilter = <T extends string>({
  tags,
  selectedTags,
  tagToIcon,
  onTagChange,
  singleSelect = false,
}: TagFilterProps<T>) => {
  const handleTagClick = (tag: T) => {
    if (selectedTags.includes(tag)) {
      // 如果标签已经被选中，则取消选中
      onTagChange(selectedTags.filter(t => t !== tag));
    } else {
      // 如果是单选模式，直接替换选中的标签
      // 如果是多选模式，添加到已选中的标签列表中
      onTagChange(singleSelect ? [tag] : [...selectedTags, tag]);
    }
  };

  return (
    <Container>
      {tags.map((tag) => {
        const Icon = tagToIcon?.[tag];
        return (
          <Chip
            key={tag}
            label={tag}
            icon={Icon ? <Icon /> : undefined}
            onClick={() => handleTagClick(tag)}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '& .MuiChip-icon': {
                color: 'inherit',
              },
              '&.MuiChip-colorPrimary': {
                backgroundColor: 'rgba(25, 118, 210, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.8)',
                },
              },
            }}
          />
        );
      })}
    </Container>
  );
};

export default TagFilter;
