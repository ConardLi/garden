import { FC } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { DropZoneContainer } from '../styles';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
}

const DropZone: FC<DropZoneProps> = ({ onFileSelect }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles:any) => {
      const file = acceptedFiles[0];
      if (file) onFileSelect(file);
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false
  });

  return (
    <DropZoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack spacing={2} alignItems="center">
        {isDragActive ? (
          <UploadFileIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        ) : (
          <ImageIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        )}
        <Typography variant="h6" color="textSecondary">
          {isDragActive ? '释放文件以上传' : '拖拽图片到这里或点击上传'}
        </Typography>
        <Button variant="contained" component="span">
          选择图片
        </Button>
      </Stack>
    </DropZoneContainer>
  );
};

export default DropZone; 