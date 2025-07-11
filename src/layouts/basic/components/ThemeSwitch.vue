<template>
  <div class="theme-switch">
    <el-switch
      v-model="isDark"
      :active-action-icon="Moon"
      :inactive-action-icon="Sunny"
      active-color="#2f2f2f"
      inactive-color="#dcdfe6"
      class="theme-toggle"
    />
    <span class="theme-label">{{ isDark ? '深色' : '浅色' }}</span>
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: '',
})
</script>

<style scoped lang="scss">
.theme-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--el-fill-color-light);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--el-fill-color);
    border-color: var(--el-border-color);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .theme-toggle {
    :deep(.el-switch__core) {
      border-radius: 20px;
      transition: all 0.3s ease;
    }
    
    :deep(.el-switch__action) {
      border-radius: 50%;
      transition: all 0.3s ease;
    }
  }
  
  .theme-label {
    font-size: 12px;
    color: var(--el-text-color-regular);
    font-weight: 500;
    transition: color 0.3s ease;
  }
}
</style>
