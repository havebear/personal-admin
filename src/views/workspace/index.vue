<template>
  <div class="workspace-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">
          欢迎回来，{{ userStore.user?.email }}
        </h1>
        <p class="welcome-subtitle">
          今天是 {{ currentDate }}，开始记录美好的一天吧！
        </p>
      </div>
      <div class="welcome-actions">
        <el-button type="primary" size="large" @click="goToDiary">
          <el-icon><Plus /></el-icon>
          写日记
        </el-button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon size="32" color="#409eff">
            <Notebook />
          </el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ diaryStore.pagination.total }}</div>
          <div class="stat-label">总日记数</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <el-icon size="32" color="#67c23a">
            <Collection />
          </el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ diaryStore.tags.length }}</div>
          <div class="stat-label">标签数量</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <el-icon size="32" color="#e6a23c">
            <Calendar />
          </el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ todayDiaryCount }}</div>
          <div class="stat-label">今日日记</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <el-icon size="32" color="#f56c6c">
            <Star />
          </el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ averageMoodScore }}</div>
          <div class="stat-label">平均心情</div>
        </div>
      </div>
    </div>

    <!-- 最近日记 -->
    <div class="recent-section">
      <div class="section-header">
        <h2>最近日记</h2>
        <el-button type="text" @click="goToDiary">
          查看全部
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
      
      <div class="recent-diaries">
        <div
          v-for="diary in recentDiaries"
          :key="diary.id"
          class="recent-diary-item"
          @click="viewDiary(diary)"
        >
          <div class="diary-date">{{ formatDate(diary.date) }}</div>
          <div class="diary-content">{{ diary.content }}</div>
          <div class="diary-footer">
            <div class="diary-tags">
              <el-tag
                v-for="tag in diary.tags.slice(0, 2)"
                :key="tag"
                size="small"
                type="info"
              >
                {{ tag }}
              </el-tag>
              <span v-if="diary.tags.length > 2" class="more-tags">
                +{{ diary.tags.length - 2 }}
              </span>
            </div>
            <div v-if="diary.moodScore" class="diary-mood">
              <el-rate
                :model-value="diary.moodScore"
                disabled
                size="small"
                text-color="#ff9900"
              />
            </div>
          </div>
        </div>

        <div v-if="recentDiaries.length === 0" class="empty-recent">
          <el-empty description="还没有日记，开始记录吧！" />
        </div>
      </div>
    </div>

    <!-- 那年今日 -->
    <div v-if="onThisDayDiaries.length > 0" class="on-this-day-section">
      <div class="section-header">
        <h2>那年今日</h2>
        <span class="section-subtitle">回顾过去的今天</span>
      </div>
      
      <div class="on-this-day-list">
        <div
          v-for="diary in onThisDayDiaries"
          :key="diary.id"
          class="on-this-day-item"
          @click="viewDiary(diary)"
        >
          <div class="year-badge">{{ getYear(diary.date) }}</div>
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

    <!-- 查看日记弹窗 -->
    <el-dialog
      v-model="showViewDialog"
      title="日记详情"
      width="600px"
    >
      <div v-if="viewingDiary" class="diary-detail">
        <div class="detail-header">
          <div class="detail-date">{{ formatDate(viewingDiary.date) }}</div>
          <div v-if="viewingDiary.moodScore" class="detail-mood">
            <span>心情评分:</span>
            <el-rate
              :model-value="viewingDiary.moodScore"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </div>
        </div>
        <div class="detail-content">{{ viewingDiary.content }}</div>
        <div class="detail-tags">
          <el-tag
            v-for="tag in viewingDiary.tags"
            :key="tag"
            size="small"
            type="info"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus, 
  Notebook, 
  Collection, 
  Calendar, 
  Star, 
  ArrowRight 
} from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'
import { useDiaryStore } from '../../stores/diary'
import type { Diary } from '../../api/diary'
import dayjs from 'dayjs'

const router = useRouter()
const userStore = useUserStore()
const diaryStore = useDiaryStore()

// 响应式数据
const showViewDialog = ref(false)
const viewingDiary = ref<Diary | null>(null)

// 计算属性
const currentDate = computed(() => {
  return dayjs().format('YYYY年MM月DD日 dddd')
})

const recentDiaries = computed(() => {
  return diaryStore.diaries.slice(0, 5)
})

const onThisDayDiaries = computed(() => {
  return diaryStore.onThisDay?.diaries || []
})

const todayDiaryCount = computed(() => {
  const today = dayjs().format('YYYY-MM-DD')
  return diaryStore.diaries.filter(diary => diary.date === today).length
})

const averageMoodScore = computed(() => {
  const diariesWithMood = diaryStore.diaries.filter(diary => diary.moodScore)
  if (diariesWithMood.length === 0) return '暂无'
  
  const totalScore = diariesWithMood.reduce((sum, diary) => sum + (diary.moodScore || 0), 0)
  return (totalScore / diariesWithMood.length).toFixed(1)
})

// 方法
const formatDate = (date: string) => {
  return dayjs(date).format('MM月DD日')
}

const getYear = (date: string) => {
  return dayjs(date).format('YYYY')
}

const goToDiary = () => {
  router.push('/diary')
}

const viewDiary = (diary: Diary) => {
  viewingDiary.value = diary
  showViewDialog.value = true
}

// 生命周期
onMounted(async () => {
  try {
    await Promise.all([
      diaryStore.fetchDiaries({ page: 1, limit: 10 }),
      diaryStore.fetchOnThisDay(dayjs().format('YYYY-MM-DD'))
    ])
  } catch (error) {
    console.error('初始化工作台数据失败:', error)
  }
})
</script>

<style scoped>
.workspace-container {
  height: 100%;
  overflow-y: auto;
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.welcome-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.welcome-subtitle {
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.recent-section,
.on-this-day-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.section-subtitle {
  font-size: 14px;
  color: #909399;
}

.recent-diaries {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recent-diary-item {
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.recent-diary-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.diary-date {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}

.diary-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
  align-items: center;
}

.more-tags {
  font-size: 12px;
  color: #909399;
}

.diary-mood {
  display: flex;
  align-items: center;
}

.empty-recent {
  text-align: center;
  padding: 40px 0;
}

.on-this-day-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.on-this-day-item {
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.on-this-day-item:hover {
  border-color: #e6a23c;
  box-shadow: 0 2px 8px rgba(230, 162, 60, 0.1);
}

.year-badge {
  position: absolute;
  top: -8px;
  right: 16px;
  background: #e6a23c;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.diary-detail {
  padding: 16px 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.detail-date {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.detail-mood {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #606266;
}

.detail-content {
  font-size: 14px;
  line-height: 1.6;
  color: #606266;
  margin-bottom: 16px;
  white-space: pre-wrap;
}

.detail-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style> 