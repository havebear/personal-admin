# 个人管理系统 API 集成文档

## 概述

本项目已完整集成了基于 `http://localhost:3001/` 的API接口，包括用户认证和日记管理功能。

## 项目结构

```
src/
├── api/                    # API接口模块
│   ├── auth.ts            # 认证相关API
│   ├── diary.ts           # 日记相关API
│   └── index.ts           # API统一导出
├── config/
│   └── api.ts             # API配置文件
├── stores/                # 状态管理
│   ├── user.ts            # 用户状态管理
│   ├── diary.ts           # 日记状态管理
│   └── index.ts           # 状态管理统一导出
├── utils/
│   └── request.ts         # HTTP请求工具
├── router/
│   └── guard.ts           # 路由守卫
└── examples/
    └── api-usage.ts       # API使用示例
```

## 功能特性

### 🔐 用户认证
- ✅ 用户注册
- ✅ 用户登录
- ✅ 获取用户信息
- ✅ 自动token管理
- ✅ 路由守卫保护

### 📝 日记管理
- ✅ 创建日记
- ✅ 获取日记列表（支持分页）
- ✅ 获取单篇日记
- ✅ 更新日记
- ✅ 删除日记
- ✅ 搜索日记
- ✅ 按标签查找
- ✅ 获取所有标签

### 📊 统计分析
- ✅ 标签统计
- ✅ 写作频率统计
- ✅ 那年今日功能

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

### 3. 使用API

#### 直接使用API接口

```typescript
import { authApi, diaryApi } from '@/api'

// 用户登录
const loginResponse = await authApi.login({
  email: 'user@example.com',
  password: 'password123'
})

// 创建日记
const diaryResponse = await diaryApi.create({
  content: '今天天气很好',
  date: '2024-01-15',
  tags: ['心情', '天气']
})
```

#### 使用状态管理

```typescript
import { useUserStore, useDiaryStore } from '@/stores'

// 用户状态管理
const userStore = useUserStore()
await userStore.login({ email: 'user@example.com', password: 'password123' })

// 日记状态管理
const diaryStore = useDiaryStore()
await diaryStore.fetchDiaries({ page: 1, limit: 10 })
```

## API 接口详情

### 认证接口

#### 用户注册
```typescript
authApi.register({
  email: string,
  password: string
})
```

#### 用户登录
```typescript
authApi.login({
  email: string,
  password: string
})
```

#### 获取用户信息
```typescript
authApi.getProfile()
```

### 日记接口

#### 创建日记
```typescript
diaryApi.create({
  content: string,
  date: string,
  tags: string[]
})
```

#### 获取日记列表
```typescript
diaryApi.getList({
  page?: number,
  limit?: number
})
```

#### 搜索日记
```typescript
diaryApi.search({
  q: string,
  page?: number,
  limit?: number
})
```

#### 按标签查找
```typescript
diaryApi.getByTags(['标签1', '标签2'], {
  page?: number,
  limit?: number
})
```

#### 获取标签统计
```typescript
diaryApi.getTagStats()
```

#### 获取那年今日
```typescript
diaryApi.getOnThisDay('2024-01-15')
```

## 状态管理

### 用户状态 (useUserStore)

```typescript
const userStore = useUserStore()

// 状态
userStore.user          // 用户信息
userStore.token         // 认证token
userStore.loading       // 加载状态
userStore.isLoggedIn    // 是否已登录

// 方法
userStore.login()       // 登录
userStore.register()    // 注册
userStore.logout()      // 登出
userStore.fetchProfile() // 获取用户信息
```

### 日记状态 (useDiaryStore)

```typescript
const diaryStore = useDiaryStore()

// 状态
diaryStore.diaries      // 日记列表
diaryStore.currentDiary // 当前日记
diaryStore.tags         // 标签列表
diaryStore.pagination   // 分页信息
diaryStore.loading      // 加载状态

// 方法
diaryStore.fetchDiaries()     // 获取日记列表
diaryStore.createDiary()      // 创建日记
diaryStore.updateDiary()      // 更新日记
diaryStore.deleteDiary()      // 删除日记
diaryStore.searchDiaries()    // 搜索日记
diaryStore.fetchTags()        // 获取标签
diaryStore.fetchTagStats()    // 获取标签统计
```

## 路由守卫

项目已配置路由守卫，自动处理：

- ✅ 未登录用户重定向到登录页
- ✅ 已登录用户访问登录页重定向到首页
- ✅ 自动初始化用户信息
- ✅ Token过期自动清除

## 错误处理

所有API请求都包含统一的错误处理：

- ✅ 401未授权自动跳转登录页
- ✅ 网络错误统一提示
- ✅ 错误信息控制台输出

## 类型安全

项目使用TypeScript提供完整的类型支持：

- ✅ API请求参数类型检查
- ✅ 响应数据类型定义
- ✅ 状态管理类型安全
- ✅ 组件Props类型检查

## 开发工具

### 使用示例

查看 `src/examples/api-usage.ts` 文件获取完整的使用示例。

### 调试

在浏览器控制台中可以直接调用示例函数：

```typescript
// 导入示例
import { authExamples, diaryExamples } from '@/examples/api-usage'

// 测试登录
await authExamples.login()

// 测试创建日记
await diaryExamples.createDiary()
```

## 注意事项

1. **API地址配置**: 默认API地址为 `http://localhost:3001`，可在 `src/config/api.ts` 中修改
2. **Token存储**: 用户token自动存储在localStorage中
3. **错误处理**: 所有API错误都会在控制台输出详细信息
4. **类型安全**: 建议使用TypeScript以获得最佳开发体验

## 更新日志

- ✅ 完成用户认证API集成
- ✅ 完成日记管理API集成
- ✅ 完成状态管理配置
- ✅ 完成路由守卫配置
- ✅ 完成类型定义
- ✅ 完成使用示例 