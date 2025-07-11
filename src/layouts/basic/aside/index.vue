<template>
  <div class="aside">
    <el-menu 
      class="menu" 
      :default-active="activeMenu" 
      router 
      @select="handleMenuSelect"
      background-color="transparent"
      text-color="var(--el-text-color-regular)"
      active-text-color="var(--el-color-primary)"
    >
      <el-menu-item index="/" class="menu-item">
        <el-icon class="menu-icon"><House /></el-icon>
        <span class="menu-text">{{ $t('menu.workspace') }}</span>
      </el-menu-item>
      <el-menu-item index="/diary" class="menu-item">
        <el-icon class="menu-icon"><Notebook /></el-icon>
        <span class="menu-text">{{ $t('menu.diary') }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { House, Notebook } from '@element-plus/icons-vue'

const route = useRoute()

const activeMenu = ref(route.path)

const handleMenuSelect = (index: string) => {
  activeMenu.value = index
}
</script>

<style scoped lang="scss">
.aside {
  width: 240px;
  height: 100%;
  background: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color-light);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.menu {
  height: 100%;
  border: none;
  
  :deep(.el-menu-item) {
    height: 56px;
    line-height: 56px;
    margin: 8px 16px;
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      transform: translateX(4px);
      
      .menu-icon {
        transform: scale(1.1);
      }
    }
    
    &.is-active {
      background: var(--el-color-primary);
      color: white;
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
      
      .menu-icon {
        transform: scale(1.1);
      }
    }
  }
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.menu-text {
  font-size: 14px;
  font-weight: 500;
}
</style>
