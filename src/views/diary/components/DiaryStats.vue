<template>
  <div class="diary-stats-container">
    <!-- 年份选择 -->
    <div class="year-selector">
      <h3>{{ $t('diary.stats.title') }}</h3>
      <div class="year-controls">
        <el-select
          v-model="selectedYear"
          :placeholder="$t('diary.stats.selectYear')"
          @change="handleYearChange"
        >
          <el-option
            v-for="year in availableYears"
            :key="year"
            :label="year"
            :value="year"
          />
        </el-select>
      </div>
    </div>

    <!-- 统计概览 -->
    <div class="stats-overview">
      <div class="overview-card">
        <div class="overview-item">
          <div class="overview-value">{{ totalDiaries }}</div>
          <div class="overview-label">{{ $t('diary.stats.totalDiaries') }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-value">{{ totalTags }}</div>
          <div class="overview-label">{{ $t('diary.stats.totalTags') }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-value">{{ averagePerMonth }}</div>
          <div class="overview-label">{{ $t('diary.stats.averagePerMonth') }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-value">{{ writingDays }}</div>
          <div class="overview-label">{{ $t('diary.stats.writingDays') }}</div>
        </div>
      </div>
    </div>

    <!-- 写作频率热力图 -->
    <div class="frequency-heatmap">
      <div class="heatmap-header">
        <h4>{{ $t('diary.stats.frequencyTitle') }}</h4>
        <div class="heatmap-legend">
          <span class="legend-item">
            <span class="legend-color legend-0"></span>
            <span>{{ $t('diary.stats.legend.less') }}</span>
          </span>
          <span class="legend-item">
            <span class="legend-color legend-1"></span>
            <span class="legend-color legend-2"></span>
            <span class="legend-color legend-3"></span>
            <span class="legend-color legend-4"></span>
            <span class="legend-color legend-5"></span>
            <span>{{ $t('diary.stats.legend.more') }}</span>
          </span>
        </div>
      </div>
      
      <div class="heatmap-container">
        <div class="heatmap-grid">
          <!-- 月份标签 -->
          <div class="month-labels">
            <div
              v-for="month in months"
              :key="month.value"
              class="month-label"
            >
              {{ month.label }}
            </div>
          </div>
          
          <!-- 星期标签 -->
          <div class="weekday-labels">
            <div
              v-for="weekday in weekdays"
              :key="weekday"
              class="weekday-label"
            >
              {{ weekday }}
            </div>
          </div>
          
          <!-- 热力图网格 -->
          <div class="heatmap-cells">
            <div
              v-for="cell in heatmapCells"
              :key="cell.date"
              class="heatmap-cell"
              :class="`level-${cell.level}`"
              :title="cell.tooltip"
              @click="handleCellClick(cell)"
            >
              <div v-if="cell.count > 0" class="cell-count">{{ cell.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 标签统计 -->
    <div class="tag-stats-section">
      <h4>{{ $t('diary.stats.tagStats') }}</h4>
      <div class="tag-stats-list">
        <div
          v-for="tagStat in tagStats"
          :key="tagStat.tag"
          class="tag-stat-item"
          @click="$emit('tag-click', tagStat.tag)"
        >
          <div class="tag-info">
            <span class="tag-name">{{ tagStat.tag }}</span>
            <span class="tag-count">{{ tagStat.count }}</span>
          </div>
          <div class="tag-bar">
            <div 
              class="tag-progress" 
              :style="{ width: `${getTagPercentage(tagStat.count)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { TagStats, FrequencyStats } from '../../../api/diary'
import dayjs from 'dayjs'

interface Props {
  tagStats: TagStats[]
  frequencyStats: FrequencyStats[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  yearChange: [year: number]
  tagClick: [tag: string]
}>()

// 响应式数据
const selectedYear = ref(dayjs().year())

// 计算属性
const availableYears = computed(() => {
  const currentYear = dayjs().year()
  const years = []
  for (let year = currentYear; year >= currentYear - 10; year--) {
    years.push(year)
  }
  return years
})

const months = computed(() => [
  { value: 1, label: '1月' },
  { value: 2, label: '2月' },
  { value: 3, label: '3月' },
  { value: 4, label: '4月' },
  { value: 5, label: '5月' },
  { value: 6, label: '6月' },
  { value: 7, label: '7月' },
  { value: 8, label: '8月' },
  { value: 9, label: '9月' },
  { value: 10, label: '10月' },
  { value: 11, label: '11月' },
  { value: 12, label: '12月' }
])

const weekdays = computed(() => ['日', '一', '二', '三', '四', '五', '六'])

const totalDiaries = computed(() => {
  return props.frequencyStats.reduce((sum, stat) => sum + stat.count, 0)
})

const totalTags = computed(() => {
  return props.tagStats.length
})

const averagePerMonth = computed(() => {
  if (totalDiaries.value === 0) return 0
  return Math.round(totalDiaries.value / 12 * 10) / 10
})

const writingDays = computed(() => {
  return props.frequencyStats.filter(stat => stat.count > 0).length
})

const heatmapCells = computed(() => {
  const cells = []
  const year = selectedYear.value
  
  // 生成整年的日期网格
  for (let month = 1; month <= 12; month++) {
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        const date = dayjs().year(year).month(month - 1).startOf('month')
        const weekStart = date.startOf('week').add(week, 'week')
        const cellDate = weekStart.add(day, 'day')
        
        // 只显示当前年份的日期
        if (cellDate.year() === year) {
          const dateString = cellDate.format('YYYY-MM-DD')
          const stat = props.frequencyStats.find(s => s.date === dateString)
          const count = stat ? stat.count : 0
          
          // 计算热力图级别 (0-5)
          let level = 0
          if (count > 0) {
            const maxCount = Math.max(...props.frequencyStats.map(s => s.count), 1)
            level = Math.ceil((count / maxCount) * 5)
          }
          
          cells.push({
            date: dateString,
            count,
            level,
            tooltip: `${dateString} - ${count} 篇日记`
          })
        }
      }
    }
  }
  
  return cells
})

// 方法
const handleYearChange = (year: number) => {
  emit('yearChange', year)
}

const handleCellClick = (cell: any) => {
  if (cell.count > 0) {
    // 可以在这里添加查看该日期日记的功能
    console.log('查看日期日记:', cell.date)
  }
}

const getTagPercentage = (count: number) => {
  if (props.tagStats.length === 0) return 0
  const maxCount = Math.max(...props.tagStats.map(t => t.count))
  return (count / maxCount) * 100
}

// 生命周期
onMounted(() => {
  // 初始化时触发当前年份的查询
  handleYearChange(selectedYear.value)
})
</script>

<style scoped>
.diary-stats-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.year-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--el-box-shadow-light);
}

.year-selector h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.year-controls .el-select {
  width: 120px;
}

.stats-overview {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}

.overview-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.overview-item {
  text-align: center;
}

.overview-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--el-color-primary);
  margin-bottom: 8px;
}

.overview-label {
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.frequency-heatmap {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}

.heatmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.heatmap-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-0 {
  background: var(--el-fill-color-lighter);
}

.legend-1 {
  background: var(--el-color-success-light-8);
}

.legend-2 {
  background: var(--el-color-success-light-6);
}

.legend-3 {
  background: var(--el-color-success-light-4);
}

.legend-4 {
  background: var(--el-color-success-light-2);
}

.legend-5 {
  background: var(--el-color-success);
}

.heatmap-container {
  overflow-x: auto;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 20px 1fr;
  gap: 8px;
  min-width: 800px;
}

.month-labels {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2px;
}

.month-label {
  text-align: center;
  font-size: 12px;
  color: var(--el-text-color-regular);
  padding: 4px 0;
}

.weekday-labels {
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 2px;
}

.weekday-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--el-text-color-regular);
  padding: 4px 0;
}

.heatmap-cells {
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 2px;
}

.heatmap-cell {
  aspect-ratio: 1;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 10px;
  color: white;
  font-weight: 600;
}

.heatmap-cell:hover {
  transform: scale(1.1);
  z-index: 1;
}

.heatmap-cell.level-0 {
  background: var(--el-fill-color-lighter);
}

.heatmap-cell.level-1 {
  background: var(--el-color-success-light-8);
}

.heatmap-cell.level-2 {
  background: var(--el-color-success-light-6);
}

.heatmap-cell.level-3 {
  background: var(--el-color-success-light-4);
}

.heatmap-cell.level-4 {
  background: var(--el-color-success-light-2);
}

.heatmap-cell.level-5 {
  background: var(--el-color-success);
}

.cell-count {
  font-size: 10px;
  font-weight: 600;
}

.tag-stats-section {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}

.tag-stats-section h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.tag-stats-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-stat-item {
  cursor: pointer;
  transition: all 0.3s;
  padding: 8px;
  border-radius: 6px;
}

.tag-stat-item:hover {
  background: var(--el-fill-color-light);
}

.tag-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tag-name {
  font-size: 14px;
  color: var(--el-text-color-primary);
  font-weight: 500;
}

.tag-count {
  font-size: 12px;
  color: var(--el-text-color-regular);
  background: var(--el-fill-color);
  padding: 2px 8px;
  border-radius: 10px;
}

.tag-bar {
  height: 6px;
  background: var(--el-fill-color);
  border-radius: 3px;
  overflow: hidden;
}

.tag-progress {
  height: 100%;
  background: var(--el-color-primary);
  border-radius: 3px;
  transition: width 0.3s ease;
}
</style> 