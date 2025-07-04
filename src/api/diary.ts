import { http } from '../utils/request'
import type {
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
  createdAt: string
  updatedAt: string
}

// 创建日记参数
export interface CreateDiaryParams {
  content: string
  date: string
  tags: string[]
}

// 更新日记参数
export interface UpdateDiaryParams {
  content?: string
  date?: string
  tags?: string[]
}

// 标签统计
export interface TagStats {
  tag: string
  count: number
}

// 频率统计
export interface FrequencyStats {
  date: string
  count: number
}

// 那年今日
export interface OnThisDay {
  date: string
  diaries: Diary[]
}

// 模拟日记数据
const mockDiaries: Diary[] = [
  {
    id: '1',
    content: '今天天气很好，心情愉快。去公园散步，看到了很多美丽的花朵。',
    date: '2024-01-15',
    tags: ['心情', '散步', '公园'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    content: '完成了重要的项目，感觉很有成就感。团队合作很愉快。',
    date: '2024-01-16',
    tags: ['工作', '项目', '团队'],
    createdAt: '2024-01-16T15:30:00Z',
    updatedAt: '2024-01-16T15:30:00Z'
  },
  {
    id: '3',
    content: '学习了新的技术，Vue 3 的组合式 API 很有趣。',
    date: '2024-01-17',
    tags: ['学习', '技术', 'Vue'],
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    content: '和朋友一起看电影，度过了愉快的时光。',
    date: '2024-01-18',
    tags: ['朋友', '电影', '娱乐'],
    createdAt: '2024-01-18T20:00:00Z',
    updatedAt: '2024-01-18T20:00:00Z'
  },
  {
    id: '5',
    content: '今天开始健身计划，希望能坚持下去。',
    date: '2024-01-19',
    tags: ['健身', '计划', '健康'],
    createdAt: '2024-01-19T07:00:00Z',
    updatedAt: '2024-01-19T07:00:00Z'
  }
]

// 模拟标签统计
const mockTagStats: TagStats[] = [
  { tag: '心情', count: 1 },
  { tag: '工作', count: 1 },
  { tag: '学习', count: 1 },
  { tag: '朋友', count: 1 },
  { tag: '健身', count: 1 },
  { tag: '散步', count: 1 },
  { tag: '公园', count: 1 },
  { tag: '项目', count: 1 },
  { tag: '团队', count: 1 },
  { tag: '技术', count: 1 },
  { tag: 'Vue', count: 1 },
  { tag: '电影', count: 1 },
  { tag: '娱乐', count: 1 },
  { tag: '计划', count: 1 },
  { tag: '健康', count: 1 }
]

// 模拟频率统计
const mockFrequencyStats: FrequencyStats[] = [
  { date: '2024-01-15', count: 1 },
  { date: '2024-01-16', count: 1 },
  { date: '2024-01-17', count: 1 },
  { date: '2024-01-18', count: 1 },
  { date: '2024-01-19', count: 1 }
]

// 日记API
export const diaryApi = {
  // 获取日记列表
  getList: async (params?: PaginationParams) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const { page = 1, limit = 10 } = params || {}
    const start = (page - 1) * limit
    const end = start + limit
    const data = mockDiaries.slice(start, end)

    return {
      data: {
        data,
        total: mockDiaries.length,
        page,
        limit,
        totalPages: Math.ceil(mockDiaries.length / limit),
        hasNext: end < mockDiaries.length,
        hasPrev: page > 1
      }
    }
  },

  // 获取单篇日记
  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    const diary = mockDiaries.find(d => d.id === id)
    if (!diary) {
      throw new Error('日记不存在')
    }

    return { data: diary }
  },

  // 创建日记
  create: async (data: CreateDiaryParams) => {
    await new Promise(resolve => setTimeout(resolve, 800))

    const newDiary: Diary = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockDiaries.unshift(newDiary)
    return { data: newDiary }
  },

  // 更新日记
  update: async (id: string, data: UpdateDiaryParams) => {
    await new Promise(resolve => setTimeout(resolve, 600))

    const index = mockDiaries.findIndex(d => d.id === id)
    if (index === -1) {
      throw new Error('日记不存在')
    }

    mockDiaries[index] = {
      ...mockDiaries[index],
      ...data,
      updatedAt: new Date().toISOString()
    }

    return { data: mockDiaries[index] }
  },

  // 删除日记
  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = mockDiaries.findIndex(d => d.id === id)
    if (index === -1) {
      throw new Error('日记不存在')
    }

    mockDiaries.splice(index, 1)
    return { data: { success: true } }
  },

  // 搜索日记
  search: async (params: SearchParams) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const { q = '', page = 1, limit = 10 } = params
    let filteredDiaries = mockDiaries

    if (q) {
      filteredDiaries = mockDiaries.filter(diary =>
        diary.content.includes(q) ||
        diary.tags.some(tag => tag.includes(q))
      )
    }

    const start = (page - 1) * limit
    const end = start + limit
    const data = filteredDiaries.slice(start, end)

    return {
      data: {
        data,
        total: filteredDiaries.length,
        page,
        limit,
        totalPages: Math.ceil(filteredDiaries.length / limit),
        hasNext: end < filteredDiaries.length,
        hasPrev: page > 1
      }
    }
  },

  // 按标签查找
  getByTags: async (tags: string[], params?: PaginationParams) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const { page = 1, limit = 10 } = params || {}
    const filteredDiaries = mockDiaries.filter(diary =>
      tags.some(tag => diary.tags.includes(tag))
    )

    const start = (page - 1) * limit
    const end = start + limit
    const data = filteredDiaries.slice(start, end)

    return {
      data: {
        data,
        total: filteredDiaries.length,
        page,
        limit,
        totalPages: Math.ceil(filteredDiaries.length / limit),
        hasNext: end < filteredDiaries.length,
        hasPrev: page > 1
      }
    }
  },

  // 获取所有标签
  getTags: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))

    const tags = Array.from(new Set(mockDiaries.flatMap(diary => diary.tags)))
    return { data: tags }
  },

  // 获取标签统计
  getTagStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return { data: mockTagStats }
  },

  // 获取频率统计
  getFrequencyStats: async (params: FrequencyParams) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: mockFrequencyStats }
  },

  // 获取那年今日
  getOnThisDay: async (date: string) => {
    await new Promise(resolve => setTimeout(resolve, 400))

    const monthDay = date.split('-').slice(1).join('-')
    const filteredDiaries = mockDiaries.filter(diary => {
      const diaryMonthDay = diary.date.split('-').slice(1).join('-')
      return diaryMonthDay === monthDay
    })

    const result: OnThisDay = {
      date,
      diaries: filteredDiaries
    }

    return { data: result }
  }
} 