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
import { ref, computed } from 'vue'
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: '',
})
</script>

<style scoped lang="scss"></style>
