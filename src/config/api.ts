// API配置文件
export const API_BASE_URL = 'http://localhost:3001'

// 请求超时时间
export const REQUEST_TIMEOUT = 10000

// API响应格式类型
export interface ApiResponse<T = any> {
  data: T
  statusCode: number
  message: string
  timestamp: string
}

// 分页响应格式
export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// 分页参数
export interface PaginationParams {
  page?: number
  limit?: number
}

// 搜索参数
export interface SearchParams extends PaginationParams {
  q?: string
}

// 频率统计参数
export interface FrequencyParams {
  frequency: 'daily' | 'weekly' | 'monthly'
  startDate: string
  endDate: string
} 