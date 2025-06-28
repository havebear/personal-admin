import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL, REQUEST_TIMEOUT, type ApiResponse } from '../config/api'

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response
  },
  (error) => {
    // 处理401未授权错误
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // 可以在这里添加重定向到登录页的逻辑
      window.location.href = '/login'
    }
    
    // 统一错误处理
    const message = error.response?.data?.message || error.message || '请求失败'
    console.error('API请求错误:', message)
    
    return Promise.reject(error)
  }
)

// 封装请求方法
export const http = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request.get<ApiResponse<T>>(url, config).then(res => res.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request.post<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request.put<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request.patch<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request.delete<ApiResponse<T>>(url, config).then(res => res.data),
}

export default request
