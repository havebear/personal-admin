import { createApp } from 'vue'
import './style.css'
import router from './router/index'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import App from './App.vue'

dayjs.locale('zh-cn')

const app = createApp(App)

app.use(router).mount('#app')
