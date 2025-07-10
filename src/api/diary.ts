import { http } from '../utils/request'
import type { 
  PaginatedResponse, 
  PaginationParams, 
  SearchParams, 
  FrequencyParams 
} from '../config/api'

// 日记接口
export interface Diary {
  id: string
  content: string
  date: string
  tags: string[]
  moodScore?: number // 心情评分 1-5
  createdAt: string
  updatedAt: string
}

// 创建日记参数
export interface CreateDiaryParams {
  content: string
  date: string
  tags: string[]
  moodScore?: number
}

// 更新日记参数
export interface UpdateDiaryParams {
  content?: string
  tags?: string[]
  moodScore?: number
}

// 标签统计
export interface TagStats {
  tag: string
  count: number
}

// 写作频率统计
export interface FrequencyStats {
  date: string
  count: number
}

// 那年今日
export interface OnThisDay {
  date: string
  diaries: Diary[]
}

// 日记API
export const diaryApi = {
  // 创建日记
  create: (data: CreateDiaryParams) =>
    http.post<Diary>('/api/diary', data),

  // 获取日记列表
  getList: (params?: PaginationParams) =>
    http.get<PaginatedResponse<Diary>>('/api/diary', { params }),

  // 获取单篇日记
  getById: (id: string) =>
    http.get<Diary>(`/api/diary/${id}`),

  // 更新日记
  update: (id: string, data: UpdateDiaryParams) =>
    http.patch<Diary>(`/api/diary/${id}`, data),

  // 删除日记
  delete: (id: string) =>
    http.delete(`/api/diary/${id}`),

  // 搜索日记
  search: (params: SearchParams) =>
    http.get<PaginatedResponse<Diary>>('/api/diary/search', { params }),

  // 按标签查找
  getByTags: (tags: string[], params?: PaginationParams) =>
    http.get<PaginatedResponse<Diary>>(`/api/diary/tags/${tags.join(',')}`, { params }),

  // 获取所有标签
  getTags: () =>
    http.get<string[]>('/api/diary/tags'),

  // 标签统计
  getTagStats: () =>
    http.get<TagStats[]>('/api/diary/stats/tags'),

  // 写作频率统计
  getFrequencyStats: (params: FrequencyParams) =>
    http.get<FrequencyStats[]>('/api/diary/stats/frequency', { params }),

  // 那年今日
  getOnThisDay: (date: string) =>
    http.get<OnThisDay>('/api/diary/on-this-day', { params: { date } }),
} 