# 技术栈文档

## 核心技术栈

### 前端框架
- **Vue 3.5.17** - 渐进式 JavaScript 框架，使用 Composition API
- **TypeScript 5.8.3** - 类型安全的 JavaScript 超集
- **Vite 7.0.0** - 下一代前端构建工具，提供快速的开发体验

### UI 组件库
- **Element Plus 2.10.2** - Vue 3 的组件库，提供丰富的 UI 组件
- **@element-plus/icons-vue 2.3.1** - Element Plus 图标库

### 状态管理
- **Pinia 3.0.3** - Vue 的状态管理库，替代 Vuex，提供更好的 TypeScript 支持

### 路由
- **Vue Router 4.5.1** - Vue.js 官方路由管理器，支持懒加载和路由守卫

### 工具库
- **@vueuse/core 13.4.0** - Vue 组合式 API 工具集，提供 useDark 等实用工具
- **dayjs 1.11.13** - 轻量级日期处理库，替代 moment.js
- **lodash-es 4.17.21** - JavaScript 实用工具库
- **axios 1.10.0** - HTTP 客户端，用于 API 请求
- **nprogress 0.2.0** - 进度条组件，提供页面加载反馈

### 国际化
- **vue-i18n 9** - Vue.js 国际化插件，支持多语言切换

### 开发工具
- **ESLint 9.29.0** - 代码质量检查工具，配置了 Vue 3 和 TypeScript 规则
- **Prettier** - 代码格式化工具，确保代码风格一致
- **Sass 1.89.2** - CSS 预处理器，支持变量和嵌套
- **unplugin-auto-import 19.3.0** - 自动导入插件，减少手动导入
- **unplugin-vue-components 28.7.0** - 自动导入组件插件，自动注册 Element Plus 组件

## 项目配置

### 构建配置
- 使用 Vite 作为构建工具，支持热重载和快速构建
- 配置了 TypeScript 编译，提供类型检查
- 配置了自动导入和组件自动注册，提高开发效率
- 支持 SCSS 样式预处理，使用 CSS 变量实现主题切换

### 代码规范
- ESLint 配置了 Vue 3 和 TypeScript 规则，确保代码质量
- Prettier 用于代码格式化，保持代码风格一致
- 使用 TypeScript 严格模式，提供更好的类型安全

### 开发环境
- Node.js 环境，支持现代 JavaScript 特性
- 包管理器：pnpm，提供更快的安装速度
- 编辑器配置：VS Code，支持 Vue 3 和 TypeScript

## 架构设计

### 目录结构
```
src/
├── api/          # API 接口层
│   ├── auth.ts   # 认证相关接口
│   ├── diary.ts  # 日记相关接口
│   └── user.ts   # 用户相关接口
├── assets/       # 静态资源
│   ├── images/   # 图片资源
│   └── styles/   # 样式文件
├── components/   # 公共组件
│   ├── common/   # 通用组件
│   └── layout/   # 布局组件
├── config/       # 配置文件
│   ├── api.ts    # API 配置
│   ├── constants.ts # 常量定义
│   └── settings.ts  # 应用设置
├── hooks/        # 组合式函数
│   ├── useAuth.ts    # 认证相关逻辑
│   ├── useTheme.ts   # 主题相关逻辑
│   └── useI18n.ts    # 国际化相关逻辑
├── layouts/      # 布局组件
│   ├── DefaultLayout.vue # 默认布局
│   └── AuthLayout.vue    # 认证页面布局
├── locales/      # 国际化文件
│   ├── en-US.ts  # 英文语言包
│   ├── zh-CN.ts  # 中文语言包
│   └── index.ts  # 语言包入口
├── router/       # 路由配置
│   ├── index.ts  # 路由主文件
│   ├── guards.ts # 路由守卫
│   └── routes/   # 路由模块
├── stores/       # 状态管理
│   ├── auth.ts   # 认证状态
│   ├── diary.ts  # 日记状态
│   ├── theme.ts  # 主题状态
│   └── user.ts   # 用户状态
├── utils/        # 工具函数
│   ├── request.ts    # HTTP 请求封装
│   ├── storage.ts    # 本地存储工具
│   ├── date.ts       # 日期处理工具
│   └── validate.ts   # 验证工具
├── views/        # 页面组件
│   ├── auth/     # 认证页面
│   ├── diary/    # 日记页面
│   ├── workspace/ # 工作台页面
│   ├── error/    # 错误页面
│   └── settings/ # 设置页面
├── App.vue       # 根组件
├── main.ts       # 应用入口
└── vite-env.d.ts # Vite 环境类型
```

### 设计原则
- **组件化开发** - 将功能拆分为可复用的组件
- **类型安全** - 全面使用 TypeScript，提供类型检查
- **响应式设计** - 使用 CSS Grid 和 Flexbox 实现响应式布局
- **国际化支持** - 完整的 i18n 支持，便于多语言扩展
- **主题切换** - 基于 CSS 变量的主题系统，支持白天黑夜模式

## 核心特性

### 主题系统
- 基于 CSS 变量的主题切换
- 支持白天黑夜模式
- 使用 `@vueuse/core` 的 `useDark` 实现主题切换
- Element Plus 组件自动适配主题

### 国际化系统
- 支持中文和英文
- 路由、菜单、页面内容全面国际化
- 使用 vue-i18n 实现多语言切换
- 本地存储语言偏好

### 状态管理
- 使用 Pinia 进行状态管理
- 按功能模块划分 store
- 支持持久化存储
- 提供完整的 TypeScript 类型支持

### 路由系统
- 支持路由守卫
- 懒加载优化性能
- 嵌套路由结构
- 错误页面处理

### 组件系统
- 基于 Element Plus 的组件库
- 自定义业务组件
- 组件自动导入
- 响应式设计

## 开发规范

### 代码风格
- 使用 TypeScript 严格模式
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint + Prettier 进行代码格式化
- 组件命名使用 PascalCase
- 文件名使用 kebab-case

### 文件组织
- 按功能模块组织文件
- 相关文件放在同一目录下
- 使用 index.ts 作为模块入口
- 组件按功能和复用性分类

### 性能优化
- 路由级别的懒加载
- 组件级别的动态导入
- 第三方库的按需引入
- 图片资源优化

### 测试策略
- 单元测试使用 Vitest
- E2E 测试使用 Cypress
- 测试覆盖率目标 > 80%
- 重点测试业务逻辑

## 部署配置

### 开发环境
- 热重载开发服务器
- 代理配置
- 调试工具集成
- 环境变量管理

### 生产环境
- 静态资源优化
- CDN 配置
- 环境变量管理
- 错误监控