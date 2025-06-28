import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  diaryApi, 
  type Diary, 
  type CreateDiaryParams, 
  type UpdateDiaryParams,
  type TagStats,
  type FrequencyStats,
  type OnThisDay
} from '../api/diary'
import type {
  PaginationParams,
  SearchParams,
  FrequencyParams
} from '../config/api'

export const useDiaryStore = defineStore('diary', () => {
  // 状态
  const diaries = ref<Diary[]>([])
  const currentDiary = ref<Diary | null>(null)
  const tags = ref<string[]>([])
  const tagStats = ref<TagStats[]>([])
  const frequencyStats = ref<FrequencyStats[]>([])
  const onThisDay = ref<OnThisDay | null>(null)
  
  // 分页信息
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  
  const loading = ref(false)

  // 计算属性
  const hasMore = computed(() => pagination.value.hasNext)
  const isEmpty = computed(() => diaries.value.length === 0)

  // 获取日记列表
  const fetchDiaries = async (params?: PaginationParams) => {
    try {
      loading.value = true
      const response = await diaryApi.getList(params)
      
      diaries.value = response.data.data
      pagination.value = {
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
        hasNext: response.data.hasNext,
        hasPrev: response.data.hasPrev,
      }
      
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取单篇日记
  const fetchDiary = async (id: string) => {
    try {
      loading.value = true
      const response = await diaryApi.getById(id)
      currentDiary.value = response.data
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 创建日记
  const createDiary = async (data: CreateDiaryParams) => {
    try {
      loading.value = true
      const response = await diaryApi.create(data)
      
      // 添加到列表开头
      diaries.value.unshift(response.data)
      pagination.value.total += 1
      
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新日记
  const updateDiary = async (id: string, data: UpdateDiaryParams) => {
    try {
      loading.value = true
      const response = await diaryApi.update(id, data)
      
      // 更新列表中的日记
      const index = diaries.value.findIndex(diary => diary.id === id)
      if (index !== -1) {
        diaries.value[index] = response.data
      }
      
      // 更新当前日记
      if (currentDiary.value?.id === id) {
        currentDiary.value = response.data
      }
      
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 删除日记
  const deleteDiary = async (id: string) => {
    try {
      loading.value = true
      await diaryApi.delete(id)
      
      // 从列表中移除
      const index = diaries.value.findIndex(diary => diary.id === id)
      if (index !== -1) {
        diaries.value.splice(index, 1)
        pagination.value.total -= 1
      }
      
      // 清除当前日记
      if (currentDiary.value?.id === id) {
        currentDiary.value = null
      }
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 搜索日记
  const searchDiaries = async (params: SearchParams) => {
    try {
      loading.value = true
      const response = await diaryApi.search(params)
      
      diaries.value = response.data.data
      pagination.value = {
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
        hasNext: response.data.hasNext,
        hasPrev: response.data.hasPrev,
      }
      
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 按标签查找
  const fetchDiariesByTags = async (tags: string[], params?: PaginationParams) => {
    try {
      loading.value = true
      const response = await diaryApi.getByTags(tags, params)
      
      diaries.value = response.data.data
      pagination.value = {
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
        hasNext: response.data.hasNext,
        hasPrev: response.data.hasPrev,
      }
      
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取所有标签
  const fetchTags = async () => {
    try {
      loading.value = true
      const response = await diaryApi.getTags()
      tags.value = response.data
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取标签统计
  const fetchTagStats = async () => {
    try {
      loading.value = true
      const response = await diaryApi.getTagStats()
      tagStats.value = response.data
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取写作频率统计
  const fetchFrequencyStats = async (params: FrequencyParams) => {
    try {
      loading.value = true
      const response = await diaryApi.getFrequencyStats(params)
      frequencyStats.value = response.data
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取那年今日
  const fetchOnThisDay = async (date: string) => {
    try {
      loading.value = true
      const response = await diaryApi.getOnThisDay(date)
      onThisDay.value = response.data
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 重置状态
  const reset = () => {
    diaries.value = []
    currentDiary.value = null
    tags.value = []
    tagStats.value = []
    frequencyStats.value = []
    onThisDay.value = null
    pagination.value = {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    }
  }

  return {
    // 状态
    diaries,
    currentDiary,
    tags,
    tagStats,
    frequencyStats,
    onThisDay,
    pagination,
    loading,
    
    // 计算属性
    hasMore,
    isEmpty,
    
    // 方法
    fetchDiaries,
    fetchDiary,
    createDiary,
    updateDiary,
    deleteDiary,
    searchDiaries,
    fetchDiariesByTags,
    fetchTags,
    fetchTagStats,
    fetchFrequencyStats,
    fetchOnThisDay,
    reset,
  }
}) 