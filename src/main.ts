import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router/index'
import { setupRouterGuard } from './router/guard'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import App from './App.vue'

// 配置dayjs
dayjs.locale('zh-cn')

// 创建应用实例
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()

// 设置路由守卫
setupRouterGuard(router)

// 使用插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')
