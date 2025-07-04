<template>
  <div class="on-this-day-container">
    <!-- 日期选择 -->
    <div class="date-selector">
      <div class="selector-header">
        <h3>{{ $t('diary.onThisDay.title') }}</h3>
        <p>{{ $t('diary.onThisDay.subtitle') }}</p>
      </div>
      
      <div class="selector-controls">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          :placeholder="$t('diary.onThisDay.selectDate')"
          format="MM-DD"
          value-format="MM-DD"
          @change="handleDateChange"
        />
        
        <el-button @click="goToToday">
          {{ $t('diary.onThisDay.today') }}
        </el-button>
      </div>
    </div>

    <!-- 那年今日内容 -->
    <div v-if="onThisDay" class="on-this-day-content">
      <div class="content-header">
        <h4>{{ $t('diary.onThisDay.diariesOn', { date: selectedDateFormatted }) }}</h4>
        <div class="year-badge">{{ onThisDay.date }}</div>
      </div>

      <!-- 日记列表 -->
      <div v-if="onThisDay.diaries.length > 0" class="diary-list">
        <div
          v-for="diary in onThisDay.diaries"
          :key="diary.id"
          class="diary-item"
          @click="$emit('diary-click', diary)"
        >
          <div class="diary-header">
            <div class="diary-year">{{ getYear(diary.date) }}</div>
            <div class="diary-date">{{ formatDate(diary.date) }}</div>
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
            
            <div class="diary-actions">
              <el-button
                type="text"
                size="small"
                @click.stop="$emit('diary-click', diary)"
              >
                {{ $t('common.view') }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty :description="$t('diary.onThisDay.noDiaries')" />
      </div>
    </div>

    <!-- 快速日期选择 -->
    <div class="quick-dates">
      <h4>{{ $t('diary.onThisDay.quickSelect') }}</h4>
      <div class="quick-date-list">
        <div
          v-for="quickDate in quickDates"
          :key="quickDate.value"
          class="quick-date-item"
          :class="{ active: selectedDate === quickDate.value }"
          @click="selectQuickDate(quickDate.value)"
        >
          <div class="quick-date-label">{{ quickDate.label }}</div>
          <div class="quick-date-value">{{ quickDate.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { OnThisDay } from '../../../api/diary'
import dayjs from 'dayjs'

interface Props {
  onThisDay: OnThisDay | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  dateChange: [date: string]
  diaryClick: [diary: any]
}>()

// 响应式数据
const selectedDate = ref(dayjs().format('MM-DD'))

// 计算属性
const selectedDateFormatted = computed(() => {
  const [month, day] = selectedDate.value.split('-')
  return `${month}月${day}日`
})

const quickDates = computed(() => {
  const today = dayjs()
  return [
    {
      label: '今天',
      value: today.format('MM-DD')
    },
    {
      label: '昨天',
      value: today.subtract(1, 'day').format('MM-DD')
    },
    {
      label: '前天',
      value: today.subtract(2, 'day').format('MM-DD')
    },
    {
      label: '生日',
      value: '01-01' // 这里可以根据用户设置动态获取
    },
    {
      label: '春节',
      value: '02-10' // 示例日期
    },
    {
      label: '国庆',
      value: '10-01'
    }
  ]
})

// 方法
const handleDateChange = (value: string | null) => {
  if (value) {
    emit('dateChange', value)
  }
}

const goToToday = () => {
  selectedDate.value = dayjs().format('MM-DD')
  handleDateChange(selectedDate.value)
}

const selectQuickDate = (date: string) => {
  selectedDate.value = date
  handleDateChange(date)
}

const getYear = (date: string) => {
  return dayjs(date).format('YYYY')
}

const formatDate = (date: string) => {
  return dayjs(date).format('MM月DD日')
}

// 生命周期
onMounted(() => {
  // 初始化时触发当前日期的查询
  handleDateChange(selectedDate.value)
})
</script>

<style scoped>
.on-this-day-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.date-selector {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}

.selector-header h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.selector-header p {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.selector-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.selector-controls .el-date-picker {
  width: 200px;
}

.on-this-day-content {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.content-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.year-badge {
  background: var(--el-color-primary);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.diary-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.diary-item {
  background: var(--el-fill-color-light);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--el-border-color-light);
  cursor: pointer;
  transition: all 0.3s;
}

.diary-item:hover {
  border-color: var(--el-color-primary-light-7);
  background: var(--el-fill-color);
  transform: translateY(-2px);
  box-shadow: var(--el-box-shadow-light);
}

.diary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.diary-year {
  font-size: 14px;
  font-weight: 600;
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  padding: 2px 8px;
  border-radius: 12px;
}

.diary-date {
  font-size: 12px;
  color: var(--el-text-color-regular);
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

.diary-actions {
  opacity: 0;
  transition: opacity 0.3s;
}

.diary-item:hover .diary-actions {
  opacity: 1;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-dates {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}

.quick-dates h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.quick-date-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.quick-date-item {
  padding: 12px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.quick-date-item:hover {
  border-color: var(--el-color-primary-light-7);
  background: var(--el-fill-color-light);
}

.quick-date-item.active {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.quick-date-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.quick-date-value {
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.quick-date-item.active .quick-date-value {
  color: var(--el-color-primary);
}
</style> 