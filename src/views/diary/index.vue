<template>
  <div class="diary-container">
    <!-- 页面标题和操作 -->
    <div class="page-header">
      <div class="page-title">
        <h2>日记管理</h2>
        <p>记录生活中的每一个精彩瞬间</p>
      </div>
      <div class="page-actions">
        <el-button type="primary" @click="showCreateDialog = true">
          <el-icon><Plus /></el-icon>
          写日记
        </el-button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧列表模块 -->
      <div class="list-section">
        <!-- 搜索和筛选 -->
        <div class="search-bar">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索日记内容..."
            clearable
            @input="handleSearch"
            @clear="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-select
            v-model="selectedTags"
            multiple
            collapse-tags
            placeholder="选择标签"
            clearable
            @change="handleTagFilter"
          >
            <el-option
              v-for="tag in diaryStore.tags"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </div>

        <!-- 那年今日 -->
        <div v-if="onThisDayDiaries.length > 0" class="on-this-day">
          <h3>那年今日</h3>
          <div class="on-this-day-list">
            <div
              v-for="diary in onThisDayDiaries"
              :key="diary.id"
              class="on-this-day-item"
              @click="viewDiary(diary)"
            >
              <div class="diary-date">{{ formatDate(diary.date) }}</div>
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

        <!-- 日记列表 -->
        <div class="diary-list">
          <div
            v-for="diary in diaryStore.diaries"
            :key="diary.id"
            class="diary-item"
            @click="viewDiary(diary)"
          >
            <div class="diary-header">
              <div class="diary-date">{{ formatDate(diary.date) }}</div>
              <div class="diary-actions">
                <el-button
                  type="text"
                  size="small"
                  @click.stop="editDiary(diary)"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click.stop="deleteDiary(diary)"
                >
                  删除
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
              <div v-if="diary.moodScore" class="diary-mood">
                <span>心情:</span>
                <el-rate
                  :model-value="diary.moodScore"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </div>
            </div>
          </div>

          <!-- 加载更多 -->
          <div v-if="diaryStore.hasMore" class="load-more">
            <el-button
              :loading="diaryStore.loading"
              @click="loadMore"
            >
              加载更多
            </el-button>
          </div>

          <!-- 空状态 -->
          <div v-if="diaryStore.isEmpty && !diaryStore.loading" class="empty-state">
            <el-empty description="暂无日记，开始记录美好生活吧！" />
          </div>
        </div>
      </div>

      <!-- 右侧统计模块 -->
      <div class="stats-section">
        <div class="stats-card">
          <h3>标签统计</h3>
          <div class="tag-stats">
            <div
              v-for="tagStat in diaryStore.tagStats"
              :key="tagStat.tag"
              class="tag-stat-item"
              @click="filterByTag(tagStat.tag)"
            >
              <span class="tag-name">{{ tagStat.tag }}</span>
              <span class="tag-count">{{ tagStat.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建/编辑日记弹窗 -->
    <el-dialog
      v-model="showCreateDialog"
      :title="editingDiary ? '编辑日记' : '写日记'"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="diaryFormRef"
        :model="diaryForm"
        :rules="diaryRules"
        label-width="80px"
      >
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="diaryForm.date"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            v-model="diaryForm.content"
            type="textarea"
            :rows="6"
            placeholder="写下今天的心情..."
          />
        </el-form-item>

        <el-form-item label="标签">
          <el-select
            v-model="diaryForm.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="选择或创建标签"
          >
            <el-option
              v-for="tag in diaryStore.tags"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="心情评分">
          <el-rate
            v-model="diaryForm.moodScore"
            :max="5"
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button
            type="primary"
            :loading="diaryStore.loading"
            @click="saveDiary"
          >
            {{ diaryStore.loading ? '保存中...' : '保存' }}
          </el-button>
        </div>
      </template>
    </el-dialog>

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
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { useDiaryStore } from '../../stores/diary'
import type { Diary, CreateDiaryParams } from '../../api/diary'
import dayjs from 'dayjs'

const diaryStore = useDiaryStore()

// 响应式数据
const showCreateDialog = ref(false)
const showViewDialog = ref(false)
const editingDiary = ref<Diary | null>(null)
const viewingDiary = ref<Diary | null>(null)
const diaryFormRef = ref<FormInstance>()
const searchKeyword = ref('')
const selectedTags = ref<string[]>([])

// 日记表单
const diaryForm = reactive<CreateDiaryParams>({
  content: '',
  date: dayjs().format('YYYY-MM-DD'),
  tags: [],
  moodScore: undefined
})

// 表单验证规则
const diaryRules: FormRules = {
  date: [
    { required: true, message: '请选择日期', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入日记内容', trigger: 'blur' },
    { min: 1, message: '日记内容不能为空', trigger: 'blur' }
  ]
}

// 计算属性
const onThisDayDiaries = computed(() => {
  return diaryStore.onThisDay?.diaries || []
})

// 方法
const formatDate = (date: string) => {
  return dayjs(date).format('YYYY年MM月DD日')
}

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    diaryStore.searchDiaries({ q: searchKeyword.value.trim(), page: 1, limit: 10 })
  } else {
    diaryStore.fetchDiaries({ page: 1, limit: 10 })
  }
}

const handleTagFilter = () => {
  if (selectedTags.value.length > 0) {
    diaryStore.fetchDiariesByTags(selectedTags.value, { page: 1, limit: 10 })
  } else {
    diaryStore.fetchDiaries({ page: 1, limit: 10 })
  }
}

const filterByTag = (tag: string) => {
  selectedTags.value = [tag]
  handleTagFilter()
}

const loadMore = () => {
  const nextPage = diaryStore.pagination.page + 1
  diaryStore.fetchDiaries({ page: nextPage, limit: 10 })
}

const resetForm = () => {
  diaryForm.content = ''
  diaryForm.date = dayjs().format('YYYY-MM-DD')
  diaryForm.tags = []
  diaryForm.moodScore = undefined
  editingDiary.value = null
}

const saveDiary = async () => {
  if (!diaryFormRef.value) return

  try {
    await diaryFormRef.value.validate()
    
    if (editingDiary.value) {
      await diaryStore.updateDiary(editingDiary.value.id, diaryForm)
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
  diaryForm.moodScore = diary.moodScore
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
    await Promise.all([
      diaryStore.fetchDiaries({ page: 1, limit: 10 }),
      diaryStore.fetchTags(),
      diaryStore.fetchTagStats(),
      diaryStore.fetchOnThisDay(dayjs().format('YYYY-MM-DD'))
    ])
  } catch (error) {
    console.error('初始化数据失败:', error)
  }
})
</script>

<style scoped>
.diary-container {
  height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title h2 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.page-title p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.main-content {
  display: flex;
  gap: 24px;
  height: calc(100% - 80px);
}

.list-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-bar {
  display: flex;
  gap: 12px;
}

.search-bar .el-input {
  flex: 1;
}

.search-bar .el-select {
  width: 200px;
}

.on-this-day {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.on-this-day h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.on-this-day-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.on-this-day-item {
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.on-this-day-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.diary-date {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.diary-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
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

.diary-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.diary-item {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.diary-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.diary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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

.diary-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.diary-mood {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #909399;
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

.stats-section {
  width: 300px;
}

.stats-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
}

.stats-card h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.tag-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tag-stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tag-stat-item:hover {
  background-color: #f5f7fa;
}

.tag-name {
  font-size: 14px;
  color: #606266;
}

.tag-count {
  font-size: 12px;
  color: #909399;
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 10px;
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

.dialog-footer {
  text-align: right;
}
</style>