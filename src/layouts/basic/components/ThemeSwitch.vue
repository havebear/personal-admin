<template>
  <el-switch
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
    active-color="#2f2f2f"
    inactive-color="#dcdfe6"
  />
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: '',
  disableTransition: false
})
</script>

<style scoped lang="scss">
// :deep(.el-switch) {
//   transition: all 0.3s !important; /* 覆盖内联样式 */
// }
</style>
