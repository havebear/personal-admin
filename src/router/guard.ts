import type { Router } from 'vue-router'
import { useUserStore } from '../stores/user'

// 路由守卫
export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()
    
    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - 个人管理系统`
    }
    
    // 初始化用户信息
    if (!userStore.user && userStore.token) {
      try {
        await userStore.initUser()
      } catch (error) {
        console.error('初始化用户信息失败:', error)
      }
    }
    
    // 检查是否需要认证
    const requiresAuth = to.meta?.requiresAuth !== false
    
    if (requiresAuth && !userStore.isLoggedIn) {
      // 需要认证但未登录，重定向到登录页
      next('/login')
    } else if (to.path === '/login' && userStore.isLoggedIn) {
      // 已登录用户访问登录页，重定向到首页
      next('/')
    } else {
      // 正常访问
      next()
    }
  })
} 