import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router/index'
import { setupRouterGuard } from './router/guard'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { messages } from './locales'

// 配置dayjs
// dayjs.locale('zh-cn') // 由 i18n 控制

import 'element-plus/theme-chalk/dark/css-vars.css'

// 获取本地语言
const getDefaultLocale = () => {
  const saved = localStorage.getItem('locale')
  if (saved) return saved
  const lang = navigator.language.toLowerCase()
  return lang.includes('zh') ? 'zh-CN' : 'en-US'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages,
})

dayjs.locale(i18n.global.locale.value === 'zh-CN' ? 'zh-cn' : 'en')

// 创建应用实例
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()

// 设置路由守卫
setupRouterGuard(router)

// 使用插件
app.use(pinia)
app.use(router)
app.use(i18n)

// 挂载应用
app.mount('#app')
