import { FC, useMemo } from 'react';
import {
  Stack,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { UUIDOptions, UUIDVersion } from '../types';
import { UUID_NAMESPACES, isValidNamespace } from '../utils';

interface UUIDGeneratorProps {
  options: UUIDOptions;
  onOptionsChange: (options: UUIDOptions) => void;
  onGenerate: () => void;
}

const VERSION_DESCRIPTIONS = {
  v1: {
    title: 'Version 1 (基于时间的 UUID)',
    description: '基于时间戳和节点 ID（通常是MAC地址）生成。特点是：\n• 包含生成时间信息\n• 可以保证时间顺序\n• 适用于分布式系统中的时序性场景',
  },
  v4: {
    title: 'Version 4 (随机 UUID)',
    description: '使用随机或伪随机数生成。特点是：\n• 完全随机生成\n• 冲突概率极低\n• 最常用的 UUID 版本\n• 适用于需要唯一标识符的大多数场景',
  },
  v5: {
    title: 'Version 5 (基于名字的 UUID)',
    description: '基于命名空间和名称的 SHA-1 散列值生成。特点是：\n• 相同的命名空间和名称总是生成相同的 UUID\n• 支持自定义命名空间\n• 适用于需要确定性 UUID 的场景',
  },
} as const;

const UUIDGenerator: FC<UUIDGeneratorProps> = ({
  options,
  onOptionsChange,
  onGenerate,
}) => {
  const handleVersionChange = (_: any, newVersion: UUIDVersion | null) => {
    if (newVersion) {
      // 切换版本时重置相关选项
      const newOptions = { 
        ...options, 
        version: newVersion,
        namespace: newVersion === 'v5' ? UUID_NAMESPACES.URL : undefined,
        name: newVersion === 'v5' ? '' : undefined
      };
      onOptionsChange(newOptions);
    }
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(1, Math.min(100, Number(event.target.value)));
    onOptionsChange({ ...options, count });
  };

  const handleNamespaceChange = (event: any) => {
    const namespace = event.target.value;
    if (namespace === 'custom') {
      onOptionsChange({ ...options, namespace: '' });
    } else {
      onOptionsChange({ ...options, namespace: UUID_NAMESPACES[namespace as any] });
    }
  };

  const handleCustomNamespaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const namespace = event.target.value;
    onOptionsChange({ ...options, namespace });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({ ...options, name: event.target.value });
  };

  const isCustomNamespace = useMemo(() => {
    if (!options.namespace) return false;
    // @ts-ignore
    return !Object.values(UUID_NAMESPACES).includes(options.namespace);
  }, [options.namespace]);

  const selectedNamespace = useMemo(() => {
    if (!options.namespace || isCustomNamespace) return 'custom';
    const entry = Object.entries(UUID_NAMESPACES).find(([_, value]) => value === options.namespace);
    return entry ? entry[0] : 'custom';
  }, [options.namespace, isCustomNamespace]);

  const isValidCustomNamespace = useMemo(() => {
    if (!isCustomNamespace || !options.namespace) return true;
    return isValidNamespace(options.namespace);
  }, [isCustomNamespace, options.namespace]);

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          UUID 版本
        </Typography>
        <ToggleButtonGroup
          value={options.version}
          exclusive
          onChange={handleVersionChange}
          aria-label="UUID 版本"
          fullWidth
          size="large"
        >
          <ToggleButton value="v4" aria-label="Version 4">
            Version 4 (随机)
          </ToggleButton>
          <ToggleButton value="v1" aria-label="Version 1">
            Version 1 (时间戳)
          </ToggleButton>
          <ToggleButton value="v5" aria-label="Version 5">
            Version 5 (命名空间)
          </ToggleButton>
        </ToggleButtonGroup>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: 'background.default',
            borderRadius: 1,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight="medium" color="primary">
              {VERSION_DESCRIPTIONS[options.version].title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {VERSION_DESCRIPTIONS[options.version].description}
            </Typography>
          </Stack>
        </Paper>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          选项
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={options.uppercase}
                onChange={(e) =>
                  onOptionsChange({ ...options, uppercase: e.target.checked })
                }
              />
            }
            label="大写"
          />
          <FormControlLabel
            control={
              <Switch
                checked={options.removeDashes}
                onChange={(e) =>
                  onOptionsChange({ ...options, removeDashes: e.target.checked })
                }
              />
            }
            label="移除短横线"
          />
        </Stack>
        
        {options.version === 'v5' && (
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>命名空间</InputLabel>
              <Select
                value={selectedNamespace}
                onChange={handleNamespaceChange}
                label="命名空间"
              >
                <MenuItem value="URL">URL</MenuItem>
                <MenuItem value="DNS">DNS</MenuItem>
                <MenuItem value="OID">OID</MenuItem>
                <MenuItem value="X500">X500</MenuItem>
                <MenuItem value="custom">自定义</MenuItem>
              </Select>
            </FormControl>

            {isCustomNamespace && (
              <TextField
                fullWidth
                label="自定义命名空间"
                value={options.namespace}
                onChange={handleCustomNamespaceChange}
                error={!isValidCustomNamespace}
                helperText={!isValidCustomNamespace ? "请输入有效的 UUID 作为命名空间" : undefined}
              />
            )}

            <TextField
              fullWidth
              label="名称"
              value={options.name || ''}
              onChange={handleNameChange}
              placeholder="输入要生成 UUID 的名称"
            />
          </Stack>
        )}

        <TextField
          label="生成数量"
          type="number"
          value={options.count}
          onChange={handleCountChange}
          inputProps={{ min: 1, max: 100 }}
          helperText="一次最多生成 100 个"
          sx={{ width: 200 }}
        />
      </Stack>

      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={onGenerate}
        size="large"
        disabled={options.version === 'v5' && (!options.namespace || !isValidCustomNamespace)}
      >
        生成 UUID
      </Button>
    </Stack>
  );
};

export default UUIDGenerator; 