import { Tool, TagType } from "../types/tool";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import BuildIcon from "@mui/icons-material/Build";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FolderIcon from "@mui/icons-material/Folder";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import LanguageIcon from "@mui/icons-material/Language";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import LockIcon from "@mui/icons-material/Lock";
import BarChartIcon from "@mui/icons-material/BarChart";

export const TAGS: TagType[] = [
  "开发工具",
  "编码加密",
  "图片工具",
  "文本工具",
  "生活工具",
  "转换工具",
  "文件工具",
  "设计工具",
  "视频工具",
  "网络工具",
  "数据图表",
];

export const TOOLS: Tool[] = [
  {
    id: "qr-generator",
    name: "二维码生成",
    description: "快速生成自定义二维码",
    detailDescription:
      "支持自定义Logo、颜色和纠错等级设置，适用于各类营销推广场景，可批量生成不同内容的二维码",
    icon: "QrCode",
    tags: ["图片工具"],
  },
  {
    id: "json-formatter",
    name: "JSON格式化",
    description: "JSON数据格式化和验证",
    detailDescription:
      "支持JSON的格式化、压缩、验证和编辑，提供语法高亮和错误提示，方便开发调试",
    icon: "Code",
    tags: ["开发工具"],
  },
  {
    id: "color-palette",
    name: "调色板",
    description: "颜色选择和转换工具",
    detailDescription:
      "支持色彩搭配推荐、色值格式转换、调色板生成和主题配色方案导出，适用于UI设计",
    icon: "Palette",
    tags: ["设计工具"],
  },
  {
    id: "image-compressor",
    name: "图片压缩",
    description: "在线压缩图片，支持批量处理",
    detailDescription:
      "智能压缩算法，在保持图片质量的同时大幅减小文件体积，支持JPG、PNG等多种格式批量处理",
    icon: "Image",
    tags: ["图片工具"],
  },
  {
    id: "image-converter",
    name: "图片格式转换",
    description: "在线转换图片格式，支持PNG/JPG/WEBP",
    detailDescription:
      "支持PNG/JPG/WEBP/AVIF等多种格式互转，保持原图质量，可自定义压缩参数和输出选项",
    icon: "Transform",
    tags: ["图片工具"],
  },
  {
    id: "favicon-generator",
    name: "图标生成",
    description: "生成网站图标（favicon）",
    detailDescription:
      "一键生成多尺寸网站图标，支持PWA图标，自动适配各种浏览器和设备要求，确保最佳显示效果",
    icon: "Image",
    tags: ["图片工具"],
  },
  {
    id: "md5",
    name: "MD5生成",
    description: "快速生成文本的 MD5 哈希值",
    detailDescription:
      "支持文本和文件的MD5计算，提供批量处理和结果对比验证功能，用于确保数据完整性",
    icon: "Code",
    tags: ["编码加密", "开发工具", "文本工具"],
  },
  {
    id: "timestamp-converter",
    name: "时间戳转换",
    description: "Unix时间戳与日期时间互转工具",
    detailDescription:
      "支持毫秒/秒级时间戳转换，提供多种日期格式和时区设置，方便开发调试和日志分析",
    icon: "AccessTime",
    tags: ["开发工具"],
  },
  // 开发工具
  {
    id: "code-formatter",
    name: "代码格式化",
    description: "支持多种编程语言的代码格式化工具",
    detailDescription:
      "支持HTML、CSS、JavaScript、Python等多种语言的代码格式化，可自定义格式化规则和代码风格",
    icon: "Code",
    tags: ["开发工具"],
  },
  {
    id: "base64",
    name: "Base64 转换",
    description: "文本和图片的 Base64 编解码工具",
    detailDescription:
      "支持文本、图片、文件的Base64编解码，适用于数据传输和嵌入式资源处理，提供批量转换功能",
    icon: "DataObject",
    tags: ["编码加密", "开发工具", "文本工具"],
  },
  {
    id: "regex-tester",
    name: "正则测试",
    description: "正则表达式在线测试工具",
    detailDescription:
      "支持实时匹配测试、替换预览，提供常用正则表达式库和语法说明，帮助快速验证和调试正则表达式",
    icon: "Code",
    tags: ["开发工具"],
  },
  // 图片工具
  {
    id: "image-background-remover",
    name: "图片背景移除",
    description: "AI 智能抠图工具",
    detailDescription:
      "使用先进的AI算法自动识别前景，精准去除背景，支持批量处理，可进行细节调整和后期优化",
    icon: "FilterNone",
    tags: ["图片工具"],
  },
  // 设计工具
  {
    id: "gradient-generator",
    name: "渐变生成器",
    description: "CSS 渐变配色工具",
    detailDescription:
      "支持线性渐变、径向渐变、多点渐变，提供可视化编辑界面，可直接导出CSS代码",
    icon: "Gradient",
    tags: ["设计工具", "开发工具"],
  },
  {
    id: "shadow-generator",
    name: "阴影生成器",
    description: "CSS Box-shadow 可视化编辑工具",
    detailDescription:
      "可视化编辑CSS阴影效果，支持多层阴影、内外阴影、颜色渐变，快速创建立体效果",
    icon: "Layers",
    tags: ["设计工具", "开发工具"],
  },
  {
    id: "easing-wizard",
    name: "缓动动画生成",
    description: "CSS 动画缓动函数生成器",
    detailDescription:
      "可视化编辑CSS动画缓动函数，支持贝塞尔曲线调节，提供常用预设，实时预览动画效果",
    icon: "Animation",
    tags: ["设计工具", "开发工具"],
  },
  // 文件工具
  {
    id: "pdf-tools",
    name: "PDF 工具集",
    description: "PDF 合并、分割、转换等功能",
    detailDescription:
      "支持PDF合并、分割、压缩、格式转换、页面提取、OCR文字识别等功能，保持文档格式",
    icon: "PictureAsPdf",
    tags: ["文件工具"],
  },
  {
    id: "file-converter",
    name: "文件转换",
    description: "音频、视频、文档格式转换工具",
    detailDescription:
      "支持音频、视频、文档等多种格式转换，保持原始质量，提供批量处理和自定义转换参数",
    icon: "SwapHoriz",
    tags: ["转换工具"],
  },
  // 网络工具
  {
    id: "website-analyzer",
    name: "网站分析",
    description: "网站性能和 SEO 检测工具",
    detailDescription:
      "全面分析网站性能、SEO、安全性、移动适配等指标，提供详细的优化建议和改进方案",
    icon: "Speed",
    tags: ["网络工具"],
  },
  {
    id: "charts/bar",
    name: "柱状图",
    description: "在线生成美观的柱状图",
    detailDescription:
      "支持自定义数据、样式、动画效果，可导出为图片格式，适用于数据可视化展示",
    icon: "BarChart",
    tags: ["数据图表", "设计工具"],
  },
  {
    id: "charts/group-bar",
    name: "分组柱状图",
    description: "在线生成分组柱状图",
    detailDescription:
      "支持多组数据对比展示，自定义样式和动画效果，适用于多维度数据分析",
    icon: "BarChart",
    tags: ["数据图表", "设计工具"],
  },
  {
    id: "charts/line",
    name: "折线图",
    description: "在线生成专业的折线图",
    detailDescription:
      "支持多系列数据、平滑曲线、面积填充、自定义样式，适用于趋势分析和数据对比",
    icon: "ShowChart",
    tags: ["数据图表", "设计工具"],
  },
  {
    id: "charts/radar",
    name: "雷达图",
    description: "在线生成多维数据雷达图",
    detailDescription:
      "支持多维度数据展示、自定义指标、样式调整，适用于多维度数据分析和对比",
    icon: "RadarChart",
    tags: ["数据图表", "设计工具"],
  },
  {
    id: "charts/stacked-bar",
    name: "堆叠柱状图",
    description: "在线堆叠柱状图生成工具",
    detailDescription:
      "支持多系列数据堆叠显示，可自定义样式、动画效果，适用于展示分组数据的累积关系",
    icon: "BarChart",
    tags: ["数据图表"],
  },
  {
    id: "charts/stacked-area",
    name: "堆叠面积图",
    description: "在线堆叠面积图生成工具",
    detailDescription:
      "支持多系列数据堆叠显示，展示数据随时间的累积变化趋势，适用于时间序列数据分析",
    icon: "BarChart",
    tags: ["数据图表"],
  },
  {
    id: "charts/pie",
    name: "饼图",
    description: "在线饼图生成工具",
    detailDescription:
      "展示部分与整体的关系，支持自定义样式、标签和动画效果，适用于占比数据的可视化",
    icon: "BarChart",
    tags: ["数据图表"],
  },
  {
    id: "charts/donut",
    name: "环形图",
    description: "在线环形图生成工具",
    detailDescription:
      "基于饼图的变体，中心区域可添加额外信息，支持自定义样式和动画效果",
    icon: "BarChart",
    tags: ["数据图表"],
  },
  {
    id: "ssl-checker",
    name: "SSL 证书检测",
    description: "检查网站 SSL 证书状态",
    detailDescription:
      "检测SSL证书有效性、加密算法、过期时间等信息，评估安全等级，提供更新建议",
    icon: "Security",
    tags: ["网络工具"],
  },
  // 生活工具
  {
    id: "unit-converter",
    name: "单位换算",
    description: "常用单位换算工具",
    detailDescription:
      "支持长度、面积、体积、重量、温度等多种计量单位换算，提供常用单位快速转换",
    icon: "Calculate",
    tags: ["转换工具"],
  },
  {
    id: "random-generator",
    name: "随机生成器",
    description: "生成随机密码、UUID等",
    detailDescription:
      "生成随机密码、UUID、数字序列等，可自定义生成规则和格式，支持批量生成",
    icon: "Casino",
    tags: ["开发工具"],
  },
  {
    id: "url-codec",
    name: "URL编码解码",
    description: "URL编码与解码转换工具",
    detailDescription:
      "支持URL编码解码转换，处理特殊字符，支持批量转换和编码规则配置",
    icon: "Link",
    tags: ["开发工具"],
  },
  {
    id: "code-diff",
    name: "代码对比",
    description: "对比两段代码的差异",
    detailDescription:
      "支持多种编程语言的代码对比，显示行级差异，提供合并和导出功能",
    icon: "Compare",
    tags: ["开发工具"],
  },
  {
    id: "uuid",
    name: "UUID生成",
    description: "批量生成UUID",
    detailDescription:
      "生成标准格式的UUID，支持批量生成、自定义版本和格式，提供复制和导出功能",
    icon: "Guid",
    tags: ["开发工具", "文本工具"],
  },
  {
    id: "guid",
    name: "GUID生成",
    description: "批量生成GUID",
    detailDescription:
      "生成全局唯一标识符GUID，支持不同格式输出，提供批量生成和验证功能",
    icon: "Guid",
    tags: ["开发工具", "文本工具"],
  },
  {
    id: "aes",
    name: "AES加解密",
    description: "在线 AES 加解密工具",
    detailDescription:
      "支持多种加密模式和密钥长度，提供文本和文件加解密，适用于数据安全传输",
    icon: "Lock",
    tags: ["编码加密", "开发工具", "文本工具"],
  },
];

type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

export const TAG_TO_ICON: { [key: string]: IconType } = {
  开发工具: CodeIcon,
  图片工具: ImageIcon,
  文本工具: TextFieldsIcon,
  数据图表: BarChartIcon,
  生活工具: BuildIcon,
  转换工具: SwapHorizIcon,
  文件工具: FolderIcon,
  设计工具: ColorLensIcon,
  视频工具: VideoFileIcon,
  网络工具: LanguageIcon,
  编码加密: LockIcon,
};
