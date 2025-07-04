<template>
  <div class="diary-calendar-container">
    <!-- 日历头部 -->
    <div class="calendar-header">
      <div class="calendar-controls">
        <el-button @click="previousMonth">
          <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <h3>{{ currentMonthYear }}</h3>
        <el-button @click="nextMonth">
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
      
      <div class="calendar-actions">
        <el-button @click="goToToday">{{ $t('diary.calendar.today') }}</el-button>
        <el-date-picker
          v-model="selectedDate"
          type="month"
          :placeholder="$t('diary.calendar.selectMonth')"
          format="YYYY-MM"
          value-format="YYYY-MM"
          @change="handleMonthChange"
        />
      </div>
    </div>

    <!-- 日历主体 -->
    <div class="calendar-body">
      <!-- 星期标题 -->
      <div class="calendar-weekdays">
        <div
          v-for="weekday in weekdays"
          :key="weekday"
          class="weekday"
        >
          {{ weekday }}
        </div>
      </div>

      <!-- 日期网格 -->
      <div class="calendar-grid">
        <div
          v-for="day in calendarDays"
          :key="day.date"
          class="calendar-day"
          :class="{
            'other-month': !day.isCurrentMonth,
            'today': day.isToday,
            'has-diary': day.hasDiary,
            'selected': day.isSelected
          }"
          @click="handleDayClick(day)"
        >
          <div class="day-number">{{ day.dayNumber }}</div>
          <div v-if="day.hasDiary" class="diary-indicator">
            <el-icon><Document /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 选中日期的日记列表 -->
    <div v-if="selectedDayDiaries.length > 0" class="selected-day-diaries">
      <h4>{{ $t('diary.calendar.diariesOn', { date: selectedDayFormatted }) }}</h4>
      <div class="diary-list">
        <div
          v-for="diary in selectedDayDiaries"
          :key="diary.id"
          class="diary-item"
          @click="$emit('diary-click', diary)"
        >
          <div class="diary-content">{{ diary.content }}</div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ArrowLeft, ArrowRight, Document } from '@element-plus/icons-vue'
import type { Diary } from '../../../api/diary'
import dayjs from 'dayjs'

interface Props {
  diaries: Diary[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  dateClick: [date: string]
  diaryClick: [diary: Diary]
}>()

// 响应式数据
const currentDate = ref(dayjs())
const selectedDate = ref<string | null>(null)

// 计算属性
const currentMonthYear = computed(() => {
  return currentDate.value.format('YYYY年MM月')
})

const weekdays = computed(() => {
  return ['日', '一', '二', '三', '四', '五', '六']
})

const calendarDays = computed(() => {
  const year = currentDate.value.year()
  const month = currentDate.value.month()
  const firstDay = dayjs().year(year).month(month).startOf('month')
  const lastDay = dayjs().year(year).month(month).endOf('month')
  
  // 获取日历开始日期（包含上个月的日期）
  const startDate = firstDay.startOf('week')
  const endDate = lastDay.endOf('week')
  
  const days = []
  let current = startDate
  
  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    const dayNumber = current.date()
    const isCurrentMonth = current.month() === month
    const isToday = current.isSame(dayjs(), 'day')
    const dateString = current.format('YYYY-MM-DD')
    const hasDiary = props.diaries.some(diary => diary.date === dateString)
    const isSelected = selectedDate.value === dateString
    
    days.push({
      date: dateString,
      dayNumber,
      isCurrentMonth,
      isToday,
      hasDiary,
      isSelected
    })
    
    current = current.add(1, 'day')
  }
  
  return days
})

const selectedDayDiaries = computed(() => {
  if (!selectedDate.value) return []
  return props.diaries.filter(diary => diary.date === selectedDate.value)
})

const selectedDayFormatted = computed(() => {
  if (!selectedDate.value) return ''
  return dayjs(selectedDate.value).format('YYYY年MM月DD日')
})

// 方法
const previousMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
}

const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
}

const goToToday = () => {
  currentDate.value = dayjs()
  selectedDate.value = dayjs().format('YYYY-MM-DD')
}

const handleMonthChange = (value: string | null) => {
  if (value) {
    currentDate.value = dayjs(value)
  }
}

const handleDayClick = (day: any) => {
  selectedDate.value = day.date
  
  if (day.hasDiary) {
    // 如果该日期有日记，显示日记列表
    // 这里可以触发查看日记的事件
  } else {
    // 如果该日期没有日记，触发添加日记事件
    emit('dateClick', day.date)
  }
}

// 监听日记数据变化
watch(() => props.diaries, () => {
  // 重新计算日历数据
}, { deep: true })
</script>

<style scoped>
.diary-calendar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--el-box-shadow-light);
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.calendar-controls h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  min-width: 120px;
  text-align: center;
}

.calendar-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.calendar-body {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: var(--el-text-color-regular);
  padding: 8px;
  font-size: 14px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  flex: 1;
}

.calendar-day {
  aspect-ratio: 1;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--el-border-color-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.calendar-day:hover {
  background: var(--el-fill-color-light);
  border-color: var(--el-color-primary-light-7);
}

.calendar-day.other-month {
  color: var(--el-text-color-placeholder);
  background: var(--el-fill-color-lighter);
}

.calendar-day.today {
  background: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
  font-weight: 600;
}

.calendar-day.has-diary {
  background: var(--el-color-success-light-9);
  border-color: var(--el-color-success);
}

.calendar-day.selected {
  background: var(--el-color-primary);
  color: white;
  border-color: var(--el-color-primary);
}

.day-number {
  font-size: 16px;
  font-weight: 500;
}

.diary-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 12px;
  color: var(--el-color-success);
}

.calendar-day.selected .diary-indicator {
  color: white;
}

.selected-day-diaries {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--el-box-shadow-light);
}

.selected-day-diaries h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.diary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.diary-item {
  padding: 12px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.diary-item:hover {
  border-color: var(--el-color-primary-light-7);
  background: var(--el-fill-color-light);
}

.diary-content {
  font-size: 14px;
  line-height: 1.5;
  color: var(--el-text-color-regular);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.diary-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
</style> 