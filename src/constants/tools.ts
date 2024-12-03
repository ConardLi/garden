import { Tool, TagType } from '../types/tool';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import BuildIcon from '@mui/icons-material/Build';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FolderIcon from '@mui/icons-material/Folder';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import LanguageIcon from '@mui/icons-material/Language';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const TAGS: TagType[] = [
  '开发工具',
  '图片工具',
  '文本工具',
  '生活工具',
  '转换工具',
  '文件工具',
  '设计工具',
  '视频工具',
  '网络工具'
];

export const TOOLS: Tool[] = [
  {
    id: 'qr-generator',
    name: '二维码生成',
    description: '快速生成自定义二维码',
    icon: 'QrCode',
    tags: ['图片工具']
  },
  {
    id: 'json-formatter',
    name: 'JSON格式化',
    description: 'JSON数据格式化和验证',
    icon: 'Code',
    tags: ['开发工具']
  },
  {
    id: 'color-palette',
    name: '调色板',
    description: '颜色选择和转换工具',
    icon: 'Palette',
    tags: ['设计工具']
  },
  {
    id: 'image-compressor',
    name: '图片压缩',
    description: '在线压缩图片，支持批量处理',
    icon: 'Image',
    tags: ['图片工具']
  },
  {
    id: 'image-converter',
    name: '图片格式转换',
    description: '在线转换图片格式，支持PNG/JPG/WEBP',
    icon: 'Transform',
    tags: ['图片工具']
  },
  {
    id: 'favicon-generator',
    name: '图标生成',
    description: '生成网站图标（favicon）',
    icon: 'Image',
    tags: ['图片工具']
  },
  {
    id: 'md5',
    name: 'MD5生成',
    description: '快速生成文本的 MD5 哈希值',
    icon: 'Code',
    tags: ['开发工具']
  },
  {
    id: 'timestamp-converter',
    name: '时间戳转换',
    description: 'Unix时间戳与日期时间互转工具',
    icon: 'AccessTime',
    tags: ['开发工具']
  }
]; 

type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };

export const TAG_TO_ICON: { [key: string]: IconType } = {
  '开发工具': CodeIcon,
  '图片工具': ImageIcon,
  '文本工具': TextFieldsIcon,
  '生活工具': BuildIcon,
  '转换工具': SwapHorizIcon,
  '文件工具': FolderIcon,
  '设计工具': ColorLensIcon,
  '视频工具': VideoFileIcon,
  '网络工具': LanguageIcon,
}; 