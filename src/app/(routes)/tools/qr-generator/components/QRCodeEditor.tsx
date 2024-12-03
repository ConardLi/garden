import { FC, ChangeEvent } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ColorInput } from '../styles';

interface QRCodeEditorProps {
  text: string;
  setText: (text: string) => void;
  size: number;
  setSize: (size: number) => void;
  fgColor: string;
  setFgColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  level: 'L' | 'M' | 'Q' | 'H';
  setLevel: (level: 'L' | 'M' | 'Q' | 'H') => void;
}

const QRCodeEditor: FC<QRCodeEditorProps> = ({
  text,
  setText,
  size,
  setSize,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  level,
  setLevel,
}) => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="输入文本"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={4}
          />

          <Box>
            <Typography gutterBottom>二维码大小</Typography>
            <Slider
              value={size}
              onChange={(_, value) => setSize(value as number)}
              min={128}
              max={512}
              step={32}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>纠错级别</InputLabel>
            <Select
              value={level}
              label="纠错级别"
              onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
            >
              <MenuItem value="L">低 (7%)</MenuItem>
              <MenuItem value="M">中 (15%)</MenuItem>
              <MenuItem value="Q">较高 (25%)</MenuItem>
              <MenuItem value="H">高 (30%)</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Box>
              <Typography gutterBottom>前景色</Typography>
              <ColorInput
                type="color"
                value={fgColor}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFgColor(e.target.value)}
              />
            </Box>
            <Box>
              <Typography gutterBottom>背景色</Typography>
              <ColorInput
                type="color"
                value={bgColor}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBgColor(e.target.value)}
              />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QRCodeEditor; 