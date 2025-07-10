<template>
  <el-switch
    v-model="language"
    :active-action-icon="Sunny"
    :inactive-action-icon="Moon"
    active-value="100"
    inactive-value="0"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
const language = ref(false)
</script>

<style scoped lang="scss"></style>
