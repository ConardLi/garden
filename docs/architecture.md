# 当前项目架构文档

## 1. 技术栈

- **框架**: Next.js (App Router)
- **UI**: Material-UI (MUI)
- **数据库**: MongoDB
- **存储**: 腾讯云 COS
- **认证**: JWT + QR Code 登录
- **API 安全**: 请求签名验证

## 2. 项目结构

```
src/
├── app/                    # Next.js App Router 目录
│   ├── (routes)/          # 前端路由页面
│   ├── admin/             # 管理后台页面
│   ├── api/               # API 路由
│   └── layout.tsx         # 根布局
├── components/            # 共享组件
├── config/               # 配置文件
├── constants/            # 常量定义
├── hooks/               # 自定义 Hooks
├── lib/                 # 基础库
├── models/              # 数据模型
├── providers/           # 全局 Provider
├── styles/             # 样式文件
├── types/              # TypeScript 类型定义
└── utils/              # 工具函数
    ├── common/         # 通用工具
    ├── fe/            # 前端工具
    ├── hoc/           # 高阶组件
    └── server/        # 服务端工具
```

## 3. 开发规范

### 3.1 目录结构
- 页面组件放在 app/(routes) 目录
- 共享组件放在 components 目录
- API 路由放在 app/api 目录
- 工具函数按前后端分类，
    - utils/fe：仅前端使用的工具函数，如路由跳转、前端请求库
        - 前端统一请求库 (@/utils/fe/request)
    - utils/server：仅 Server 使用的工具函数，如数据库操作
        - 数据库访问：(@/utils/server/db)
    - utils/common：通用工具函数，如日期格式化等
    - utils/hoc：服务端 API 的高阶组件，如鉴权、签名
        - 权限控制高阶组件 (@/utils/hoc/auth)
        - 签名验证高阶组件 (@/utils/hoc/verify-sign)
- 常量定义在 constants 目录
- 数据库模型在 models 目录
    - 用户管理 (User)
    - AI 站点管理 (AISite)
    - 网站管理 (Website)
    - 提示词管理 (Prompt)
    - 收藏管理 (Favorite)
    - 二维码会话 (QRCodeSession)  
- 全局通用 hooks 在 hooks 目录  

### 3.2 命名规范
- 文件名：小写中划线
- 组件名：大驼峰
- 函数名：小驼峰
- 常量名：大写下划线

### 3.3 代码组织
- 相关功能就近放置
- 共享代码提取到合适层级
- 使用 TypeScript 类型定义
- 保持单一职责原则

### 3.4 环境变量管理
- `.env`：基础环境变量，所有环境通用，可提交到仓库
- `.env.local`：本地环境变量，存放敏感信息，不提交到仓库
- `.env.development`：开发环境专用变量
- `.env.production`：生产环境专用变量
- `.env.example`：环境变量示例文件，说明需要配置哪些变量

### 3.5 UI 规范
- 全屏响应式设计，适配不同设备
- 现代化、简洁、美观的界面风格
- 丰富的色彩运用，但是保持整体和谐
- 流畅的交互动画，提升用户体验
- 在按钮和需要的地方添加图标
- 参考灵感：结合苹果官方的设计美学