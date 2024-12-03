import { Website, WebsiteTagType } from '../types/website';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const WEBSITE_TAGS: WebsiteTagType[] = [
  '搜索引擎',
  '社交媒体',
  '新闻资讯',
  '工具网站',
  '学习教育',
  '娱乐休闲',
  '购物网站',
  'AI工具'
];

export const WEBSITES: Website[] = [
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com',
    description: '全球最大的搜索引擎',
    icon: 'Search',
    tags: ['搜索引擎']
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    description: '全球最大的代码托管平台',
    icon: 'Code',
    tags: ['工具网站']
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI 开发的 AI 聊天助手',
    icon: 'SmartToy',
    tags: ['AI工具']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com',
    description: '全球最大的视频分享平台',
    icon: 'PlayCircle',
    tags: ['娱乐休闲', '社交媒体']
  }
];

type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };

export const TAG_TO_ICON: { [key: string]: IconType } = {
  '搜索引擎': SearchIcon,
  '社交媒体': PeopleIcon,
  '新闻资讯': NewspaperIcon,
  '工具网站': BuildIcon,
  '学习教育': SchoolIcon,
  '娱乐休闲': SportsEsportsIcon,
  '购物网站': ShoppingCartIcon,
  'AI工具': SmartToyIcon,
};
