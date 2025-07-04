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
  accessToken: string
}

// 模拟用户数据
const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  avatar: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const mockToken = 'mock-jwt-token-' + Date.now()

// 认证API
export const authApi = {
  // 用户注册
  register: async (data: RegisterParams) => {
    // 模拟注册
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (data.email === 'error@example.com') {
      throw new Error('注册失败，邮箱已存在')
    }
    
    return {
      data: {
        user: mockUser,
        token: mockToken
      }
    }
  },

  // 用户登录
  login: async (data: LoginParams) => {
    // 模拟登录
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (data.email === 'error@example.com' || data.password === 'wrong') {
      throw new Error('登录失败，邮箱或密码错误')
    }
    
    return {
      data: {
        user: mockUser,
        accessToken: mockToken
      }
    }
  },

  // 获取用户信息
  getProfile: async () => {
    // 模拟获取用户信息
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      data: mockUser
    }
  },
} 