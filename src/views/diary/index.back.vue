<template>
  <div class="diary-container">
    <!-- 页面标题和操作 -->
    <div class="page-header">
      <div class="page-title">
        <h2>{{ $t('diary.title') }}</h2>
        <p>{{ $t('diary.subtitle') }}</p>
      </div>
      <div class="page-actions">
        <el-button type="primary" @click="showCreateDialog = true">
          <el-icon><Plus /></el-icon>
          {{ $t('diary.create') }}
        </el-button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <el-tabs v-model="activeTab" class="diary-tabs" tab-position="top">
        <!-- 日记列表标签页 -->
        <el-tab-pane :label="$t('diary.tabs.list')" name="list">
          <DiaryList 
            :diaries="diaryStore.diaries"
            :loading="diaryStore.loading"
            :pagination="diaryStore.pagination"
            @search="handleSearch"
            @tag-filter="handleTagFilter"
            @load-more="loadMore"
            @view="viewDiary"
            @edit="editDiary"
            @delete="deleteDiary"
          />
        </el-tab-pane>

        <!-- 日历标签页 -->
        <el-tab-pane :label="$t('diary.tabs.calendar')" name="calendar">
          <DiaryCalendar 
            :diaries="diaryStore.diaries"
            @date-click="handleDateClick"
            @diary-click="viewDiary"
          />
        </el-tab-pane>

        <!-- 那年今日标签页 -->
        <el-tab-pane :label="$t('diary.tabs.onThisDay')" name="onThisDay">
          <OnThisDay 
            :on-this-day="diaryStore.onThisDay"
            @date-change="handleOnThisDayDateChange"
            @diary-click="viewDiary"
          />
        </el-tab-pane>

        <!-- 统计标签页 -->
        <el-tab-pane :label="$t('diary.tabs.stats')" name="stats">
          <DiaryStats 
            :tag-stats="diaryStore.tagStats"
            :frequency-stats="diaryStore.frequencyStats"
            @year-change="handleStatsYearChange"
            @tag-click="handleTagClick"
          />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 创建/编辑日记弹窗 -->
    <el-dialog
      v-model="showCreateDialog"
      :title="editingDiary ? $t('diary.edit') : $t('diary.create')"
      width="600px"
      :close-on-click-modal="false"
    >
      <DiaryForm
        ref="diaryFormRef"
        v-model="diaryForm"
        :rules="diaryRules"
        @submit="saveDiary"
        @cancel="showCreateDialog = false"
      />
    </el-dialog>

    <!-- 查看日记弹窗 -->
    <el-dialog
      v-model="showViewDialog"
      :title="$t('diary.view')"
      width="600px"
    >
      <DiaryDetail
        v-if="viewingDiary"
        :diary="viewingDiary"
        @edit="editDiary"
        @delete="deleteDiary"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useDiaryStore } from '../../stores/diary'
import type { Diary, CreateDiaryParams } from '../../api/diary'
import dayjs from 'dayjs'

// 导入子组件
import DiaryList from './components/DiaryList.vue'
import DiaryCalendar from './components/DiaryCalendar.vue'
import OnThisDay from './components/OnThisDay.vue'
import DiaryStats from './components/DiaryStats.vue'
import DiaryForm from './components/DiaryForm.vue'
import DiaryDetail from './components/DiaryDetail.vue'

const diaryStore = useDiaryStore()

// 响应式数据
const activeTab = ref('list')
const showCreateDialog = ref(false)
const showViewDialog = ref(false)
const editingDiary = ref<Diary | null>(null)
const viewingDiary = ref<Diary | null>(null)
const diaryFormRef = ref()

// 日记表单
const diaryForm = reactive<CreateDiaryParams>({
  content: '',
  date: dayjs().format('YYYY-MM-DD'),
  tags: [],
})

// 表单验证规则
const diaryRules = {
  date: [
    { required: true, message: '请选择日期', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入日记内容', trigger: 'blur' },
    { min: 1, message: '日记内容不能为空', trigger: 'blur' }
  ]
}

// 方法
const handleSearch = (params: any) => {
  if (params.keyword) {
    diaryStore.searchDiaries({ q: params.keyword, page: 1, limit: 10 })
  } else {
    diaryStore.fetchDiaries({ page: 1, limit: 10 })
  }
}

const handleTagFilter = (tags: string[]) => {
  if (tags.length > 0) {
    diaryStore.fetchDiariesByTags(tags, { page: 1, limit: 10 })
  } else {
    diaryStore.fetchDiaries({ page: 1, limit: 10 })
  }
}

const loadMore = () => {
  const nextPage = diaryStore.pagination.page + 1
  diaryStore.fetchDiaries({ page: nextPage, limit: 10 })
}

const handleDateClick = (date: string) => {
  diaryForm.date = date
  showCreateDialog.value = true
}

const handleOnThisDayDateChange = async (date: string) => {
  await diaryStore.fetchOnThisDay(date)
}

const handleStatsYearChange = async (year: number) => {
  const startDate = `${year}-01-01`
  const endDate = `${year}-12-31`
  await diaryStore.fetchFrequencyStats({ 
    frequency: 'daily',
    startDate,
    endDate
  })
}

const handleTagClick = (tag: string) => {
  activeTab.value = 'list'
  handleTagFilter([tag])
}

const resetForm = () => {
  diaryForm.content = ''
  diaryForm.date = dayjs().format('YYYY-MM-DD')
  diaryForm.tags = []
  editingDiary.value = null
}

const saveDiary = async () => {
  try {
    if (editingDiary.value) {
      await diaryStore.updateDiary(editingDiary.value.id, { ...diaryForm, content: 'test' })
      ElMessage.success('日记更新成功')
    } else {
      await diaryStore.createDiary(diaryForm)
      ElMessage.success('日记创建成功')
    }
    
    showCreateDialog.value = false
    resetForm()
  } catch (error: any) {
    if (error.message) {
      ElMessage.error(error.message)
    }
  }
}

const editDiary = (diary: Diary) => {
  editingDiary.value = diary
  diaryForm.content = diary.content
  diaryForm.date = diary.date
  diaryForm.tags = [...diary.tags]
  showCreateDialog.value = true
}

const viewDiary = (diary: Diary) => {
  viewingDiary.value = diary
  showViewDialog.value = true
}

const deleteDiary = async (diary: Diary) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇日记吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await diaryStore.deleteDiary(diary.id)
    ElMessage.success('日记删除成功')
  } catch (error: any) {
    if (error.message && error.message !== 'cancel') {
      ElMessage.error(error.message)
    }
  }
}

// 生命周期
onMounted(async () => {
  try {
    const currentYear = dayjs().year()
    const startDate = `${currentYear}-01-01`
    const endDate = `${currentYear}-12-31`
    
    await Promise.all([
      diaryStore.fetchDiaries({ page: 1, limit: 10 }),
      diaryStore.fetchTags(),
      diaryStore.fetchTagStats(),
      diaryStore.fetchOnThisDay(dayjs().format('YYYY-MM-DD')),
      diaryStore.fetchFrequencyStats({ 
        frequency: 'daily',
        startDate,
        endDate
      })
    ])
  } catch (error) {
    console.error('初始化数据失败:', error)
  }
})
</script>

<style scoped>
.diary-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 20px;
}

.page-title h2 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.page-title p {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.main-content {
  flex: 1;
  padding: 0 20px;
  overflow: hidden;
}

.diary-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.diary-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow: hidden;
}

.diary-tabs :deep(.el-tab-pane) {
  height: 100%;
  overflow: hidden;
}
</style>