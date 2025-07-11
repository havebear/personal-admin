<template>
  <el-dropdown @command="handleCommand">
    <span class="user-info">
      <el-avatar :size="32" :src="userStore.user?.avatar">
        {{ userStore.user?.email?.charAt(0).toUpperCase() || 'U' }}
      </el-avatar>
      <span class="user-name">{{ userStore.user?.email || 'User' }}</span>
      <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">
          <el-icon><User /></el-icon>
          个人资料
        </el-dropdown-item>
        <el-dropdown-item command="settings">
          <el-icon><Setting /></el-icon>
          设置
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <el-icon><SwitchButton /></el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ArrowDown, User, Setting, SwitchButton } from '@element-plus/icons-vue'

const userStore = useUserStore()

const handleCommand = (command: string) => {
  switch (command) {
    case 'logout':
      userStore.logout()
      break
    case 'profile':
      // TODO: 跳转到个人资料页面
      console.log('个人资料')
      break
    case 'settings':
      // TODO: 跳转到设置页面
      console.log('设置')
      break
  }
}
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: var(--el-fill-color-light);
  border: 1px solid transparent;
  
  &:hover {
    background: var(--el-fill-color);
    border-color: var(--el-border-color);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .dropdown-icon {
    font-size: 12px;
    color: var(--el-text-color-regular);
    transition: transform 0.3s ease;
  }
  
  &:hover .dropdown-icon {
    transform: rotate(180deg);
  }
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .el-icon {
    font-size: 16px;
  }
}
</style>
