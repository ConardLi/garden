import { Website, WebsiteTagType } from '../types/website';
import LanguageIcon from '@mui/icons-material/Language';
import AppsIcon from '@mui/icons-material/Apps';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ComputerIcon from '@mui/icons-material/Computer';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type WebsiteType = 
  | '全部'
  | 'browser'
  | 'app'
  | 'news'
  | 'music'
  | 'tech'
  | 'photos'
  | 'life'
  | 'education'
  | 'entertainment'
  | 'shopping'
  | 'social'
  | 'read'
  | 'sports'
  | 'finance'
  | 'others';

export const WEBSITE_TYPES: WebsiteType[] = [
  '全部',
  'browser',
  'app',
  'news',
  'music',
  'tech',
  'photos',
  'life',
  'education',
  'entertainment',
  'shopping',
  'social',
  'read',
  'sports',
  'finance',
  'others'
];

export const TYPE_TO_LABEL: { [key in WebsiteType]: string } = {
  '全部': '全部',
  'browser': '浏览器',
  'app': '应用',
  'news': '新闻资讯',
  'music': '影音视听',
  'tech': '科技',
  'photos': '图片',
  'life': '效率',
  'education': '学习教育',
  'entertainment': '游戏娱乐',
  'shopping': '购物',
  'social': '社交',
  'read': '阅读',
  'sports': '交通出行',
  'finance': '金融',
  'others': '其他'
};

export const TYPE_TO_ICON: { [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string } } = {
  '全部': AllInclusiveIcon,
  'browser': LanguageIcon,
  'app': AppsIcon,
  'news': NewspaperIcon,
  'music': AudiotrackIcon,
  'tech': ComputerIcon,
  'photos': ImageIcon,
  'life': WorkIcon,
  'education': SchoolIcon,
  'entertainment': SportsEsportsIcon,
  'shopping': ShoppingCartIcon,
  'social': PeopleIcon,
  'read': MenuBookIcon,
  'sports': DirectionsCarIcon,
  'finance': AccountBalanceIcon,
  'others': MoreHorizIcon
};

export const WEBSITES: Website[] = [
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com',
    description: '全球最大的搜索引擎',
    icon: 'Language',
    tags: ['browser']
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    description: '全球最大的代码托管平台',
    icon: 'Apps',
    tags: ['app']
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI 开发的 AI 聊天助手',
    icon: 'Computer',
    tags: ['tech']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com',
    description: '全球最大的视频分享平台',
    icon: 'Audiotrack',
    tags: ['music', 'entertainment']
  }
];
