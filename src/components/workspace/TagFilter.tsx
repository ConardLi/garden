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
  tagToLabel?: { [key: string]: string };
  onTagChange: (tags: T[]) => void;
  singleSelect?: boolean;
}

const TagFilter = <T extends string>({
  tags,
  selectedTags,
  tagToIcon,
  tagToLabel,
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
        const label = tagToLabel?.[tag] || tag;
        const isSelected = selectedTags.includes(tag);
        return (
          <Chip
            key={tag}
            label={label}
            icon={Icon ? <Icon /> : undefined}
            onClick={() => handleTagClick(tag)}
            color={isSelected ? 'primary' : 'default'}
            variant={isSelected ? 'filled' : 'outlined'}
            sx={{
              height: '32px',
              borderRadius: '16px',
              backgroundColor: isSelected ? 'primary.main' : 'rgba(255, 255, 255, 0.05)',
              borderColor: isSelected ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
              color: isSelected ? 'white' : 'rgba(255, 255, 255, 0.85)',
              '& .MuiChip-label': {
                fontSize: '0.875rem',
                padding: '0 12px',
              },
              '& .MuiChip-icon': {
                fontSize: '1.25rem',
                color: isSelected ? 'white' : 'rgba(255, 255, 255, 0.85)',
                marginLeft: '8px',
              },
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: isSelected ? 'primary.dark' : 'rgba(255, 255, 255, 0.15)',
                borderColor: isSelected ? 'primary.dark' : 'rgba(255, 255, 255, 0.6)',
                color: 'white',
                '& .MuiChip-icon': {
                  color: 'white',
                },
              },
              backdropFilter: 'blur(8px)',
            }}
          />
        );
      })}
    </Container>
  );
};

export default TagFilter;
