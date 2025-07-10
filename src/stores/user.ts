import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, type User, type LoginParams, type RegisterParams } from '../api/auth'
import { CATCH_TOKEN, CATCH_USER_INFO } from '../config/catch.config'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem(CATCH_TOKEN))
  const loading = ref(false)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!user.value)

  // 登录
  const login = async (params: LoginParams) => {
    try {
      loading.value = true
      const response = await authApi.login(params)
      
      // 保存用户信息和token
      user.value = response.data.user
      token.value = response.data.accessToken
      
      // 保存到localStorage
      localStorage.setItem(CATCH_TOKEN, response.data.accessToken)
      localStorage.setItem(CATCH_USER_INFO, JSON.stringify(response.data.user))
      
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 注册
  const register = async (params: RegisterParams) => {
    try {
      loading.value = true
      const response = await authApi.register(params)
      
      // 保存用户信息和token
      user.value = response.data.user
      token.value = response.data.token
      
      // 保存到localStorage
      localStorage.setItem(CATCH_TOKEN, response.data.token)
      localStorage.setItem(CATCH_USER_INFO, JSON.stringify(response.data.user))
      
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取用户信息
  const fetchProfile = async () => {
    try {
      loading.value = true
      const response = await authApi.getProfile()
      user.value = response.data
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 登出
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem(CATCH_TOKEN)
    localStorage.removeItem(CATCH_USER_INFO)
  }

  // 初始化用户信息
  const initUser = async () => {
    if (token.value) {
      try {
        await fetchProfile()
      } catch (error) {
        // 如果获取用户信息失败，清除本地存储
        logout()
      }
    }
  }

  return {
    // 状态
    user,
    token,
    loading,
    
    // 计算属性
    isLoggedIn,
    
    // 方法
    login,
    register,
    fetchProfile,
    logout,
    initUser,
  }
}) 