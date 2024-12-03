import { FC } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Card,
  CardContent,
  Box,
  Button,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface QRCodePreviewProps {
  text: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  handleDownload: () => void;
}

const QRCodePreview: FC<QRCodePreviewProps> = ({
  text,
  size,
  fgColor,
  bgColor,
  level,
  handleDownload,
}) => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box
            id="qr-code"
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <QRCodeSVG
              value={text || '请输入文本'}
              size={size}
              level={level}
              fgColor={fgColor}
              bgColor={bgColor}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={!text}
          >
            下载二维码
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QRCodePreview; 