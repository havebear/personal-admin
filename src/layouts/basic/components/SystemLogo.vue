<template>
  <div class="system-logo">
    <div class="logo-icon">
      <el-icon size="28" color="var(--el-color-primary)">
        <Document />
      </el-icon>
    </div>
    <div class="logo-content">
      <span class="logo-text">个人管理</span>
      <span class="logo-subtitle">Personal Admin</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.system-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  // padding: 16px;
  // padding: 0 var(--el-menu-base-level-padding);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    .logo-icon {
      transform: scale(1.1) rotate(5deg);
    }
    
    .logo-text {
      color: var(--el-color-primary);
    }
  }
  
  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--el-color-primary-light-9);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .logo-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .logo-text {
    font-size: 18px;
    font-weight: 700;
    color: var(--el-text-color-primary);
    transition: color 0.3s ease;
    line-height: 1;
  }
  
  .logo-subtitle {
    font-size: 12px;
    color: var(--el-text-color-regular);
    font-weight: 400;
    line-height: 1;
  }
}
</style>