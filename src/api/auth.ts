import { http } from '../utils/request'

// 用户信息接口
export interface User {
  id: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// 登录请求参数
export interface LoginParams {
  email: string
  password: string
}

// 注册请求参数
export interface RegisterParams {
  email: string
  password: string
}

// 登录响应
export interface LoginResponse {
  user: User
  token: string
}

// 认证API
export const authApi = {
  // 用户注册
  register: (data: RegisterParams) =>
    http.post<{ user: User; token: string }>('/api/auth/register', data),

  // 用户登录
  login: (data: LoginParams) =>
    http.post<LoginResponse>('/api/auth/login', data),

  // 获取用户信息
  getProfile: () =>
    http.get<User>('/api/auth/profile'),
} 