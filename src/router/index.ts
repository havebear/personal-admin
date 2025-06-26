import { createWebHistory, createRouter } from 'vue-router'

import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes: [
    {
      // 主路由
      path: '/',
      name: 'Index',
      redirect: { name: 'Dashboard' },
      component: Layout,
      children: [
        {
          // 工作区路由
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index.vue'), // 添加工作区组件
          meta: { title: '工作台' },
        },
        {
          // 日记路由
          path: 'diary',
          name: 'Diary',
          component: () => import('@/views/diary/index.vue'), // 添加日记组件
          meta: { title: '日记' },
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'), // 添加组件
      meta: { title: '登录' },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '404',
      },
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/error/403.vue'),
      meta: {
        title: '403',
      },
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404',
    },
  ],
})

export default router
