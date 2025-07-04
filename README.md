# Personal Admin

一个基于 Vue 3 + TypeScript + Element Plus 的现代化个人管理系统，提供完整的日记管理功能，支持白天黑夜模式和国际化。

## ✨ 特性

- 📝 **完整的日记管理** - 列表、日历、那年今日、统计四个子模块
- 🌓 **主题切换** - 支持白天黑夜模式，流畅的切换动画
- 🌍 **国际化** - 中英文双语支持，完整的语言包
- 📱 **响应式设计** - 适配不同屏幕尺寸
- ⚡ **现代化技术栈** - Vue 3 + TypeScript + Element Plus
- 🎨 **优秀用户体验** - 流畅动画、直观操作、完善反馈

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 📁 项目结构

```
src/
├── api/                    # API 接口层
├── components/             # 公共组件
├── config/                 # 配置文件
├── hooks/                  # 组合式函数
├── layouts/                # 布局组件
├── locales/                # 国际化文件
├── router/                 # 路由配置
├── stores/                 # 状态管理
├── utils/                  # 工具函数
├── views/                  # 页面组件
│   ├── diary/             # 日记模块
│   ├── workspace/         # 工作台
│   └── error/             # 错误页面
└── main.ts                # 应用入口
```

## 🎯 核心功能

### 日记管理

#### 日记列表
- 关键字搜索和日期范围筛选
- 标签系统，支持点击筛选
- 分页列表展示
- 响应式设计

#### 日历视图
- 年月切换导航
- 点击日期添加/查看日记
- 可视化日记分布
- 流畅的交互动画

#### 那年今日
- 选择任意日期查看历史日记
- 快速日期选择功能
- 按年份分组显示
- 时间轴展示

#### 统计分析
- 年度写作频率热力图
- 标签使用统计
- 总体数据概览
- 类似 GitHub 贡献图

### 主题系统

- 基于 CSS 变量的主题切换
- 使用 `@vueuse/core` 的 `useDark`
- Element Plus 组件自动适配
- 流畅的切换动画

### 国际化支持

- 中英文双语支持
- 路由、菜单、页面内容全面国际化
- 使用 vue-i18n 实现多语言切换
- 本地存储语言偏好

## 🛠️ 技术栈

### 前端框架
- **Vue 3.5.17** - 渐进式 JavaScript 框架
- **TypeScript 5.8.3** - 类型安全的 JavaScript 超集
- **Vite 7.0.0** - 下一代前端构建工具

### UI 组件库
- **Element Plus 2.10.2** - Vue 3 的组件库
- **@element-plus/icons-vue 2.3.1** - Element Plus 图标库

### 状态管理
- **Pinia 3.0.3** - Vue 的状态管理库

### 路由
- **Vue Router 4.5.1** - Vue.js 官方路由管理器

### 工具库
- **@vueuse/core 13.4.0** - Vue 组合式 API 工具集
- **dayjs 1.11.13** - 轻量级日期处理库
- **lodash-es 4.17.21** - JavaScript 实用工具库
- **axios 1.10.0** - HTTP 客户端
- **vue-i18n 9** - Vue.js 国际化插件

### 开发工具
- **ESLint 9.29.0** - 代码质量检查工具
- **Prettier** - 代码格式化工具
- **Sass 1.89.2** - CSS 预处理器
- **unplugin-auto-import 19.3.0** - 自动导入插件
- **unplugin-vue-components 28.7.0** - 自动导入组件插件

## 📖 使用指南

### 日记管理

1. **创建日记**
   - 点击"写日记"按钮
   - 选择日期和填写内容
   - 添加标签（可选）
   - 保存日记

2. **查看日记**
   - 在日记列表中点击日记项
   - 在日历中点击有日记的日期
   - 查看日记详情和编辑选项

3. **搜索和筛选**
   - 使用关键字搜索日记内容
   - 选择日期范围进行筛选
   - 点击标签进行标签筛选

4. **那年今日**
   - 选择任意日期查看历史日记
   - 使用快速选择功能
   - 按年份浏览历史记录

5. **统计分析**
   - 查看年度写作频率热力图
   - 浏览标签使用统计
   - 了解总体数据概览

### 主题切换

- 点击右上角的主题切换按钮
- 在白天和黑夜模式之间切换
- 主题设置会自动保存

### 语言切换

- 点击右上角的语言下拉菜单
- 选择中文或英文
- 语言设置会自动保存

## 🔧 开发指南

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint + Prettier 进行代码格式化
- 组件命名使用 PascalCase
- 文件名使用 kebab-case

### 组件开发

- 组件职责单一，功能明确
- 使用 Props 和 Events 进行组件通信
- 提供完整的 TypeScript 类型定义
- 支持组件的复用和扩展

### 状态管理

- 使用 Pinia 进行状态管理
- 按功能模块划分 store
- 提供完整的 CRUD 操作
- 支持状态持久化和缓存

### 样式开发

- 基于 CSS 变量的主题系统
- 使用 CSS Grid 和 Flexbox 实现响应式布局
- 流畅的动画效果
- 适配白天黑夜模式

## 📚 文档

- [技术栈文档](.docs/tech-stack.md) - 技术选择和配置说明
- [项目路线图](.docs/project-road-map.md) - 项目规划和进度跟踪
- [代码库预览](.docs/code-base-summary.md) - 项目结构和架构概述
- [开发总结](.docs/development-summary.md) - 开发过程和技术实现
- [API 文档](API_README.md) - API 接口说明

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 参与讨论

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
