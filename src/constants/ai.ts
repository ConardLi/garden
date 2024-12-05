import { AITagType, AIWebsite } from '../types/ai';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WorkIcon from '@mui/icons-material/Work';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import SearchIcon from '@mui/icons-material/Search';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TranslateIcon from '@mui/icons-material/Translate';
import GavelIcon from '@mui/icons-material/Gavel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const AI_TAGS: AITagType[] = [
  '全部',
  '写作工具',
  '图像工具',
  '视频工具',
  '办公工具',
  '设计工具',
  '编程工具',
  '搜索引擎',
  '音频工具',
  '开发平台',
  '训练模型',
  '内容检测',
  '语言翻译',
  '法律助手',
  '提示指令',
  '模型评测',
  '学习网站'
];

export const TAG_TO_ICON: { [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string } } = {
  '全部': AllInclusiveIcon,
  '写作工具': CreateIcon,
  '图像工具': ImageIcon,
  '视频工具': VideoLibraryIcon,
  '办公工具': WorkIcon,
  '设计工具': BrushIcon,
  '编程工具': CodeIcon,
  '搜索引擎': SearchIcon,
  '音频工具': AudiotrackIcon,
  '开发平台': DeveloperBoardIcon,
  '训练模型': ModelTrainingIcon,
  '内容检测': VerifiedUserIcon,
  '语言翻译': TranslateIcon,
  '法律助手': GavelIcon,
  '提示指令': LightbulbIcon,
  '模型评测': AssessmentIcon,
  '学习网站': SchoolIcon
};
