import { FC, ChangeEvent } from 'react';
import {
  TextField,
  Stack,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { StyledCard, StyledCardContent } from '../styles';

interface JSONEditorProps {
  input: string;
  setInput: (value: string) => void;
  indentSize: number;
  setIndentSize: (size: number) => void;
  formatJSON: () => void;
  error: string | null;
}

const JSONEditor: FC<JSONEditorProps> = ({
  input,
  setInput,
  indentSize,
  setIndentSize,
  formatJSON,
  error
}) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <Stack spacing={3} sx={{ height: '100%' }}>
          <TextField
            fullWidth
            multiline
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            placeholder="在此输入 JSON..."
            error={!!error}
            helperText={error}
            sx={{
              flex: 1,
              '& .MuiInputBase-root': {
                fontFamily: 'monospace',
                fontSize: '14px',
                height: '100%',
              },
              '& .MuiInputBase-input': {
                height: '100% !important',
                overflow: 'auto !important',
              },
            }}
          />

          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>缩进空格</InputLabel>
              <Select
                value={indentSize}
                label="缩进空格"
                onChange={(e) => setIndentSize(Number(e.target.value))}
              >
                <MenuItem value={2}>2 空格</MenuItem>
                <MenuItem value={4}>4 空格</MenuItem>
                <MenuItem value={8}>8 空格</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={formatJSON}
              disabled={!input?.trim()}
            >
              格式化
            </Button>
          </Stack>
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
};

export default JSONEditor; 