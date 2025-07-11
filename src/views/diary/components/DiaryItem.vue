<template>
  <div class="diary-item">
    <div class="diary-item-content">
      <div class="diary-item-content-title">
        {{ data?.content }}
      </div>
      <div>{{ data?.updatedAt }}</div>
      <el-space>
        <el-tag v-for="tag in data?.tags" :key="tag" type="info" size="small">
          {{ tag }}
        </el-tag>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type Diary } from '@/api/diary'

const props = defineProps<{
  data: Diary
}>()
</script >

<style scoped lang="scss">
.diary-item {
  padding: 10px;
  border-radius: 4px;
  background-color: var(--el-bg-color);
}
</style>