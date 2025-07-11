<template>
  <div class="diary-list-container">
    <!-- 搜索和筛选 -->
    <div class="search-section">
      <div class="search-bar">
        <el-input
          v-model="searchKeyword"
          :placeholder="$t('diary.search.placeholder')"
          clearable
          @input="handleSearch"
          @clear="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          :start-placeholder="$t('diary.search.startDate')"
          :end-placeholder="$t('diary.search.endDate')"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="handleDateRangeChange"
        />
        
        <el-select
          v-model="selectedTags"
          multiple
          collapse-tags
          :placeholder="$t('diary.search.selectTags')"
          clearable
          @change="handleTagFilter"
        >
          <el-option
            v-for="tag in availableTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </div>
    </div>

    <!-- 标签列表 -->
    <div v-if="tagStats.length > 0" class="tag-section">
      <h3>{{ $t('diary.tags.title') }}</h3>
      <div class="tag-list">
        <div
          v-for="tagStat in tagStats"
          :key="tagStat.tag"
          class="tag-item"
          :class="{ active: selectedTags.includes(tagStat.tag) }"
          @click="toggleTag(tagStat.tag)"
        >
          <span class="tag-name">{{ tagStat.tag }}</span>
          <span class="tag-count">{{ tagStat.count }}</span>
        </div>
      </div>
    </div>

    <!-- 日记列表 -->
    <div class="list-section">
      <div
        v-for="diary in diaries"
        :key="diary.id"
        class="diary-item"
        @click="$emit('view', diary)"
      >
        <div class="diary-header">
          <div class="diary-date">{{ formatDate(diary.date) }}</div>
          <div class="diary-actions">
            <el-button
              type="primary"
              size="small"
              @click.stop="$emit('edit', diary)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click.stop="$emit('delete', diary)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </div>
        </div>
        <div class="diary-content">{{ diary.content }}</div>
        <div class="diary-footer">
          <div class="diary-tags">
            <el-tag
              v-for="tag in diary.tags"
              :key="tag"
              size="small"
              type="info"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div v-if="hasMore" class="load-more">
        <el-button
          :loading="loading"
          @click="$emit('loadMore')"
        >
          {{ $t('common.loadMore') }}
        </el-button>
      </div>

      <!-- 空状态 -->
      <div v-if="isEmpty && !loading" class="empty-state">
        <el-empty :description="$t('diary.empty')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { Diary, TagStats } from '../../../api/diary'
import dayjs from 'dayjs'

interface Props {
  diaries: Diary[]
  loading: boolean
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  tagStats?: TagStats[]
  availableTags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  tagStats: () => [],
  availableTags: () => []
})

const emit = defineEmits<{
  search: [params: { keyword: string; dateRange?: [string, string] }]
  tagFilter: [tags: string[]]
  loadMore: []
  view: [diary: Diary]
  edit: [diary: Diary]
  delete: [diary: Diary]
}>()

// 响应式数据
const searchKeyword = ref('')
const dateRange = ref<[string, string] | null>(null)
const selectedTags = ref<string[]>([])

// 计算属性
const hasMore = computed(() => props.pagination.hasNext)
const isEmpty = computed(() => props.diaries.length === 0)

// 方法
const formatDate = (date: string) => {
  return dayjs(date).format('YYYY年MM月DD日')
}

const handleSearch = () => {
  emit('search', {
    keyword: searchKeyword.value,
    dateRange: dateRange.value || undefined
  })
}

const handleDateRangeChange = () => {
  handleSearch()
}

const handleTagFilter = () => {
  emit('tagFilter', selectedTags.value)
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  handleTagFilter()
}

// 监听标签统计变化，更新可用标签
watch(() => props.tagStats, () => {
  // 可以在这里添加逻辑来处理标签统计的变化
}, { deep: true })
</script>

<style scoped>
.diary-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-section {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--el-box-shadow-light);
}

.search-bar {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-bar .el-input {
  flex: 1;
  max-width: 300px;
}

.search-bar .el-date-picker {
  width: 240px;
}

.search-bar .el-select {
  width: 200px;
}

.tag-section {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--el-box-shadow-light);
}

.tag-section h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  background: var(--el-fill-color-light);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.tag-item:hover {
  background: var(--el-fill-color);
}

.tag-item.active {
  background: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}

.tag-name {
  font-size: 14px;
  color: inherit;
}

.tag-count {
  font-size: 12px;
  background: var(--el-fill-color);
  color: var(--el-text-color-regular);
  padding: 2px 6px;
  border-radius: 10px;
}

.tag-item.active .tag-count {
  background: var(--el-color-primary-light-8);
  color: var(--el-color-primary);
}

.list-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.diary-item {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--el-box-shadow-light);
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--el-border-color-light);
}

.diary-item:hover {
  box-shadow: var(--el-box-shadow);
  transform: translateY(-2px);
  border-color: var(--el-color-primary-light-7);
}

.diary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.diary-date {
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.diary-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.diary-item:hover .diary-actions {
  opacity: 1;
}

.diary-content {
  font-size: 14px;
  line-height: 1.6;
  color: var(--el-text-color-regular);
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.diary-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.diary-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.load-more {
  text-align: center;
  padding: 20px 0;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 