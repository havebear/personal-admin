<template>
  <div class="theme-toggle">
    <el-tooltip :content="tooltipText" placement="bottom">
      <div class="toggle-button" @click="toggleTheme">
        <div class="toggle-icon" :class="{ 'is-dark': isDark }">
          <el-icon class="sun-icon">
            <Sunny />
          </el-icon>
          <el-icon class="moon-icon">
            <Moon />
          </el-icon>
        </div>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const { t } = useI18n()
const isDark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: ''
})

const tooltipText = computed(() => {
  return isDark.value ? t('system.light') : t('system.dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<style scoped>
.theme-toggle {
  display: inline-block;
}

.toggle-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.toggle-button:hover {
  background: var(--el-fill-color-light);
  border-color: var(--el-color-primary-light-7);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toggle-button:active {
  transform: scale(0.95);
}

.toggle-icon {
  position: relative;
  width: 20px;
  height: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sun-icon,
.moon-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--el-text-color-primary);
}

.sun-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.moon-icon {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.toggle-icon.is-dark .sun-icon {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.toggle-icon.is-dark .moon-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

/* 暗色模式下的特殊样式 */
:global(.dark) .toggle-button {
  background: var(--el-bg-color-overlay);
  border-color: var(--el-border-color);
}

:global(.dark) .toggle-button:hover {
  background: var(--el-fill-color);
  border-color: var(--el-color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 添加一些微妙的动画效果 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.toggle-button:hover .toggle-icon {
  animation: rotate 0.6s ease-in-out;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toggle-button {
    width: 36px;
    height: 36px;
  }
  
  .toggle-icon {
    width: 18px;
    height: 18px;
  }
  
  .sun-icon,
  .moon-icon {
    width: 18px;
    height: 18px;
  }
}
</style> 