import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
  TextField, 
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  ClickAwayListener,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';
import * as MuiIcons from '@mui/icons-material';
import SvgIcon from '@/components/common/SvgIcon';
import { TOOLS } from '@/constants/tools';
import { AI_WEBSITES_UNIQUE } from '@/constants/ai';
import { SEARCH_ENGINES, getSearchUrl, getSearchEngineName } from '@/constants/searchEngines';
import { getStoredSearchEngine, setStoredSearchEngine } from '@/utils/storage';

const SearchBar = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 2,
    color: 'white',
    '& fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '& .MuiInputAdornment-root': {
    color: 'white',
  },
}));

const SearchEngineSelect = styled(Select)({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const SearchContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  position: 'relative',
}));

const SuggestionsList = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  width: '100%',
  maxHeight: '300px',
  overflowY: 'auto',
  marginTop: theme.spacing(1),
  '& .MuiListItem-root': {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

interface Props {
  onSearchEngineChange?: (engine: string) => void;
  onSearchTextChange?: (text: string) => void;
  searchText?: string;
}

const WorkspaceSearch: React.FC<Props> = ({
  onSearchEngineChange,
  onSearchTextChange,
  searchText: controlledSearchText,
}) => {
  const [searchEngine, setSearchEngine] = useState(() => getStoredSearchEngine() || 'google');
  const [internalSearchText, setInternalSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const searchText = controlledSearchText !== undefined ? controlledSearchText : internalSearchText;

  useEffect(() => {
    onSearchEngineChange?.(searchEngine);
  }, [searchEngine, onSearchEngineChange]);

  const handleSearchEngineChange = (event: SelectChangeEvent) => {
    const newEngine = event.target.value;
    setSearchEngine(newEngine);
    setStoredSearchEngine(newEngine);
  };

  const generateSuggestions = (query: string) => {
    if (!query.trim()) return [];
    
    const suggestions = [];
    
    // 第一条：当前搜索引擎搜索
    suggestions.push({
      type: 'search',
      engine: searchEngine,
      query: query.trim(),
    });

    // 第二条：火山翻译
    suggestions.push({
      type: 'translate',
      query: query.trim(),
    });

    // 工具搜索建议
    const toolSuggestions = TOOLS
      .filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(tool => ({
        type: 'tool',
        id: tool.id,
        icon: tool.icon,
        title: tool.name,
        description: tool.description,
      }));

    // AI 工具搜索建议
    const aiSuggestions = AI_WEBSITES_UNIQUE
      .filter(website =>
        website.title.toLowerCase().includes(query.toLowerCase()) ||
        website.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(website => ({
        type: 'ai',
        id: website.title,
        icon: website.icon || SearchIcon,
        title: website.title,
        description: website.description,
        url: website.url,
      }));

    return [...suggestions, ...toolSuggestions, ...aiSuggestions];
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (controlledSearchText === undefined) {
      setInternalSearchText(value);
    }
    onSearchTextChange?.(value);
    setSuggestions(generateSuggestions(value));
    setAnchorEl(event.currentTarget);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'translate') {
      handleTranslate(suggestion.query);
    } else if (suggestion.type === 'search') {
      handleSearchSubmit(suggestion.query);
    } else if (suggestion.type === 'tool') {
      // 打开工具页面
      window.open(`/tools/${suggestion.id}`, '_blank');
    } else if (suggestion.type === 'ai') {
      // 打开 AI 工具页面
      window.open(suggestion.url, '_blank');
    }
    if (controlledSearchText === undefined) {
      setInternalSearchText('');
    }
    setSuggestions([]);
    setAnchorEl(null);
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      window.open(getSearchUrl(searchEngine, query.trim()), '_blank');
    }
  };

  const handleTranslate = (query: string) => {
    if (query.trim()) {
      window.open(`https://translate.volcengine.com/?category=&home_language=zh&text=${encodeURIComponent(query.trim())}`, '_blank');
    }
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchText) {
      if (suggestions.length > 0) {
        const suggestion = suggestions[0];
        if (suggestion.type === 'search') {
          handleSearchSubmit(suggestion.query);
        } else if (suggestion.type === 'translate') {
          handleTranslate(suggestion.query);
        } else if (suggestion.type === 'tool') {
          window.open(`/tools/${suggestion.id}`, '_blank');
        } else if (suggestion.type === 'ai') {
          window.open(suggestion.url, '_blank');
        }
      } else {
        handleSearchSubmit(searchText);
      }
      if (controlledSearchText === undefined) {
        setInternalSearchText('');
      }
      setSuggestions([]);
    }
  };

  const handleClickAway = () => {
    setSuggestions([]);
    setAnchorEl(null);
  };

  return (
    <SearchContainer>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <SearchBar
            value={searchText}
            onChange={handleSearchChange}
            onKeyPress={handleSearch}
            placeholder="搜索工具、AI 工具或网页内容..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <SearchEngineSelect
                    value={searchEngine}
                    onChange={handleSearchEngineChange}
                    variant="outlined"
                    size="small"
                  >
                    {SEARCH_ENGINES.map((engine) => (
                      <MenuItem key={engine.key} value={engine.key}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SvgIcon name={engine.icon} sx={{ fontSize: 20 }} />
                          {engine.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </SearchEngineSelect>
                </InputAdornment>
              ),
            }}
          />
          <Popper
            open={Boolean(anchorEl) && suggestions.length > 0}
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ width: anchorEl?.clientWidth, zIndex: 1300 }}
          >
            <SuggestionsList>
              <List>
                {suggestions.map((suggestion, index) => {
                  let icon;
                  if (suggestion.type === 'tool') {
                    const Icon = (MuiIcons as any)[suggestion.icon];
                    icon = <Icon sx={{ fontSize: 'inherit' }} />;
                  } else if (suggestion.type === 'translate') {
                    icon = <TranslateIcon sx={{ fontSize: 'inherit' }} />;
                  } else if (suggestion.type === 'ai') {
                    icon = suggestion.icon ? (
                      <Box
                        component="img"
                        src={`/ai/${suggestion.icon}`}
                        alt={suggestion.title}
                        sx={{
                          width: 18,
                          height: 18,
                          borderRadius: '12px',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <SearchIcon sx={{ fontSize: 'inherit' }} />
                    );
                  } else {
                    // 使用搜索引擎配置
                    const engine = SEARCH_ENGINES.find(e => e.key === suggestion.engine);
                    icon = engine ? (
                      <SvgIcon name={engine.icon} sx={{ fontSize: 'inherit' }} />
                    ) : (
                      <SearchIcon sx={{ fontSize: 'inherit' }} />
                    );
                  }

                  return (
                    <ListItem
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                    >
                      <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          suggestion.type === 'search'
                            ? `${getSearchEngineName(suggestion.engine)} 搜索：${suggestion.query}`
                            : suggestion.type === 'translate'
                            ? `火山翻译：${suggestion.query}`
                            : suggestion.type === 'tool'
                            ? `站内工具：${suggestion.title}`
                            : `AI 工具：${suggestion.title}`
                        }
                        secondary={suggestion.description}
                        secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </SuggestionsList>
          </Popper>
        </div>
      </ClickAwayListener>
    </SearchContainer>
  );
};

export default WorkspaceSearch;
