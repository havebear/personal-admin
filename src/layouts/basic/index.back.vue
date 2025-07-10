<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <div class="header-container">
          <div class="header-left">
            <h1 class="system-title">{{ $t('system.title') }}</h1>
          </div>
          <div class="header-right">
            <!-- 主题切换按钮 -->
            <ThemeToggle />
            
            <!-- 语言切换下拉 -->
            <el-dropdown @command="changeLocale" style="margin-left: 12px">
              <span class="el-dropdown-link">
                <el-icon><Setting /></el-icon>
                {{ $t('system.language') }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="zh-CN">{{ $t('system.zh') }}</el-dropdown-item>
                  <el-dropdown-item command="en-US">{{ $t('system.en') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            
            <div class="user-info" @click="showUserMenu = !showUserMenu">
              <el-avatar :size="32" :src="userStore.user?.avatar || ''">
                {{ userStore.user?.email?.charAt(0)?.toUpperCase() || 'U' }}
              </el-avatar>
              <span class="username">{{ userStore.user?.email || 'User' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>

            <!-- 用户菜单 -->
            <div v-if="showUserMenu" class="user-menu" @click.stop>
              <div class="menu-item" @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                <span>{{ $t('system.logout') }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeMenu" class="sidebar-menu" router @select="handleMenuSelect">
            <el-menu-item index="/">
              <el-icon><House /></el-icon>
              <span>{{ $t('menu.workspace') }}</span>
            </el-menu-item>
            <el-menu-item index="/diary">
              <el-icon><Notebook /></el-icon>
              <span>{{ $t('menu.diary') }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown, SwitchButton, House, Notebook, Setting } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { CATCH_LOCALE } from '@/config/catch.config'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { locale, t } = useI18n()

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
    await ElMessageBox.confirm(t('system.confirmLogout'), t('common.warning'), {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning',
    })

    userStore.logout()
    ElMessage.success(t('common.success'))
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

const changeLocale = (lang: string) => {
  locale.value = lang
  localStorage.setItem(CATCH_LOCALE, lang)
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
  height: 100%;
}

.header-left .system-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
  color: var(--el-text-color-regular);
}

.el-dropdown-link:hover {
  background: var(--el-fill-color-light);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
  position: relative;
}

.user-info:hover {
  background: var(--el-fill-color-light);
}

.username {
  font-size: 14px;
  color: var(--el-text-color-regular);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
  padding: 8px 0;
  z-index: 1000;
  min-width: 120px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: var(--el-text-color-regular);
}

.menu-item:hover {
  background: var(--el-fill-color-light);
  color: var(--el-color-primary);
}

.sidebar-menu {
  height: 100%;
  border-right: 1px solid var(--el-border-color-light);
}

.el-main {
  background: var(--el-bg-color-page);
  padding: 20px;
}
</style>
