<template>
  <el-dropdown @command="handleCommand">
    <span class="user-info">
      <span>{{ userStore.user?.email }}</span>
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
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  padding: 0 12px;
}
</style>
