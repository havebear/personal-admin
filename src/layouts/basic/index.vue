<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <div class="header-container">
          <div class="header-left">
            <h1 class="system-title">个人管理</h1>
          </div>
          <div class="header-right">
            <!-- 主题切换按钮 -->
            <el-tooltip :content="t('system.theme')">
              <el-button circle size="small" @click="toggleDark()">
                <el-icon v-if="isDark"><Moon /></el-icon>
                <el-icon v-else><Sunny /></el-icon>
              </el-button>
            </el-tooltip>
            <!-- 语言切换下拉 -->
            <el-dropdown @command="changeLocale" style="margin-left: 12px">
              <span class="el-dropdown-link">
                <el-icon><Setting /></el-icon>
                {{ t('system.language') }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="zh-CN">{{ t('system.zh') }}</el-dropdown-item>
                  <el-dropdown-item command="en-US">{{ t('system.en') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div class="user-info" @click="showUserMenu = !showUserMenu">
              <el-avatar :size="32" :src="userStore.user?.avatar || ''">
                {{ userStore.user?.email?.charAt(0).toUpperCase() }}
              </el-avatar>
              <span class="username">{{ userStore.user?.email }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>

            <!-- 用户菜单 -->
            <div v-if="showUserMenu" class="user-menu" @click.stop>
              <div class="menu-item" @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px"
          ><el-menu :default-active="activeMenu" class="sidebar-menu" router @select="handleMenuSelect">
            <el-menu-item index="/">
              <el-icon><House /></el-icon>
              <span>工作台</span>
            </el-menu-item>
            <el-menu-item index="/diary">
              <el-icon><Notebook /></el-icon>
              <span>日记管理</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown, SwitchButton, House, Notebook, Sunny, Moon, Setting } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'
import { useI18n } from 'vue-i18n'
import { useDark } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { locale, t } = useI18n()
const isDark = useDark({ selector: 'html', valueDark: 'dark', valueLight: '' })

// 响应式数据
const showUserMenu = ref(false)

// 计算属性
const activeMenu = computed(() => route.path)

// 方法
const handleMenuSelect = (index: string) => {
  router.push(index)
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    userStore.logout()
    ElMessage.success('退出登录成功')
    router.push('/login')
  } catch (error) {
    // 用户取消
  }
}

// 点击外部关闭用户菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-info') && !target.closest('.user-menu')) {
    showUserMenu.value = false
  }
}

const toggleDark = () => {
  isDark.value = !isDark.value
}

const changeLocale = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  // 可选：同步 dayjs 语言
  // import dayjs from 'dayjs'
  // dayjs.locale(lang === 'zh-CN' ? 'zh-cn' : 'en')
}

// 生命周期
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
