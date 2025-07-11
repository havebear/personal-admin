<template>
  <div class="diary-detail">
    <div class="detail-header">
      <div class="detail-date">{{ formatDate(diary.date) }}</div>
      <div class="detail-actions">
        <el-button
          type="primary"
          size="small"
          @click="$emit('edit', diary)"
        >
          {{ $t('common.edit') }}
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="$emit('delete', diary)"
        >
          {{ $t('common.delete') }}
        </el-button>
      </div>
    </div>
    
    <div class="detail-content">{{ diary.content }}</div>
    
    <div class="detail-footer">
      <div class="detail-tags">
        <el-tag
          v-for="tag in diary.tags"
          :key="tag"
          size="small"
          type="info"
        >
          {{ tag }}
        </el-tag>
      </div>
      
      <div class="detail-meta">
        <span class="meta-item">
          <el-icon><Clock /></el-icon>
          {{ formatTime(diary.createdAt) }}
        </span>
        <span v-if="diary.updatedAt !== diary.createdAt" class="meta-item">
          <el-icon><Edit /></el-icon>
          {{ $t('diary.detail.lastModified') }}: {{ formatTime(diary.updatedAt) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock, Edit } from '@element-plus/icons-vue'
import type { Diary } from '../../../api/diary'
import dayjs from 'dayjs'

interface Props {
  diary: Diary
}

defineProps<Props>()

defineEmits<{
  edit: [diary: Diary]
  delete: [diary: Diary]
}>()

const formatDate = (date: string) => {
  return dayjs(date).format('YYYY年MM月DD日 dddd')
}

const formatTime = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}
</script>

<style scoped>
.diary-detail {
  padding: 20px 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.detail-date {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.detail-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.diary-detail:hover .detail-actions {
  opacity: 1;
}

.detail-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--el-text-color-regular);
  margin-bottom: 20px;
  white-space: pre-wrap;
  word-break: break-word;
}

.detail-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.detail-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  text-align: right;
  min-width: 120px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-item .el-icon {
  font-size: 12px;
}
</style> 