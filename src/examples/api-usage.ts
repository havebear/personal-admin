// API使用示例
import { authApi, diaryApi } from '../api'
import { useUserStore, useDiaryStore } from '../stores'

// 认证相关示例
export const authExamples = {
  // 用户注册
  async register() {
    try {
      const response = await authApi.register({
        email: 'user@example.com',
        password: 'password123'
      })
      console.log('注册成功:', response.data)
      return response
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  },

  // 用户登录
  async login() {
    try {
      const response = await authApi.login({
        email: 'user@example.com',
        password: 'password123'
      })
      console.log('登录成功:', response.data)
      return response
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  },

  // 获取用户信息
  async getProfile() {
    try {
      const response = await authApi.getProfile()
      console.log('用户信息:', response.data)
      return response
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }
}

// 日记相关示例
export const diaryExamples = {
  // 创建日记
  async createDiary() {
    try {
      const response = await diaryApi.create({
        content: '今天天气很好，心情也不错。',
        date: '2024-01-15',
        tags: ['心情', '天气']
      })
      console.log('创建日记成功:', response.data)
      return response
    } catch (error) {
      console.error('创建日记失败:', error)
      throw error
    }
  },

  // 获取日记列表
  async getDiaryList() {
    try {
      const response = await diaryApi.getList({ page: 1, limit: 10 })
      console.log('日记列表:', response.data)
      return response
    } catch (error) {
      console.error('获取日记列表失败:', error)
      throw error
    }
  },

  // 搜索日记
  async searchDiaries() {
    try {
      const response = await diaryApi.search({ q: '心情', page: 1, limit: 10 })
      console.log('搜索结果:', response.data)
      return response
    } catch (error) {
      console.error('搜索日记失败:', error)
      throw error
    }
  },

  // 按标签查找
  async getDiariesByTags() {
    try {
      const response = await diaryApi.getByTags(['心情', '天气'], { page: 1, limit: 10 })
      console.log('按标签查找结果:', response.data)
      return response
    } catch (error) {
      console.error('按标签查找失败:', error)
      throw error
    }
  },

  // 获取标签统计
  async getTagStats() {
    try {
      const response = await diaryApi.getTagStats()
      console.log('标签统计:', response.data)
      return response
    } catch (error) {
      console.error('获取标签统计失败:', error)
      throw error
    }
  },

  // 获取那年今日
  async getOnThisDay() {
    try {
      const response = await diaryApi.getOnThisDay('2024-01-15')
      console.log('那年今日:', response.data)
      return response
    } catch (error) {
      console.error('获取那年今日失败:', error)
      throw error
    }
  }
}

// 状态管理使用示例
export const storeExamples = {
  // 使用用户状态管理
  async useUserStoreExample() {
    const userStore = useUserStore()
    
    // 登录
    await userStore.login({
      email: 'user@example.com',
      password: 'password123'
    })
    
    // 检查登录状态
    console.log('是否已登录:', userStore.isLoggedIn)
    console.log('用户信息:', userStore.user)
    
    // 登出
    userStore.logout()
  },

  // 使用日记状态管理
  async useDiaryStoreExample() {
    const diaryStore = useDiaryStore()
    
    // 获取日记列表
    await diaryStore.fetchDiaries({ page: 1, limit: 10 })
    console.log('日记列表:', diaryStore.diaries)
    console.log('分页信息:', diaryStore.pagination)
    
    // 创建日记
    await diaryStore.createDiary({
      content: '这是一篇新日记',
      date: '2024-01-15',
      tags: ['新日记']
    })
    
    // 获取标签
    await diaryStore.fetchTags()
    console.log('所有标签:', diaryStore.tags)
    
    // 获取标签统计
    await diaryStore.fetchTagStats()
    console.log('标签统计:', diaryStore.tagStats)
  }
}

// 完整使用流程示例
export const completeWorkflowExample = async () => {
  try {
    // 1. 用户登录
    await authExamples.login()
    
    // 2. 获取日记列表
    await diaryExamples.getDiaryList()
    
    // 3. 创建新日记
    await diaryExamples.createDiary()
    
    // 4. 搜索日记
    await diaryExamples.searchDiaries()
    
    // 5. 获取统计信息
    await diaryExamples.getTagStats()
    
    console.log('完整流程执行成功')
  } catch (error) {
    console.error('完整流程执行失败:', error)
  }
} 