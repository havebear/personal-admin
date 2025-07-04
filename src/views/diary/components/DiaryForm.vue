<template>
  <div class="diary-form">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="date"
          :placeholder="$t('diary.form.selectDate')"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          :rows="6"
          :placeholder="$t('diary.form.contentPlaceholder')"
          maxlength="1000"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          v-model="formData.tags"
          multiple
          filterable
          allow-create
          default-first-option
          :placeholder="$t('diary.form.selectTags')"
          style="width: 100%"
        >
          <el-option
            v-for="tag in availableTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="form-actions">
      <el-button @click="$emit('cancel')">
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="handleSubmit"
      >
        {{ loading ? $t('common.saving') : $t('common.save') }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { CreateDiaryParams } from '../../../api/diary'

interface Props {
  modelValue: CreateDiaryParams
  rules?: FormRules
  loading?: boolean
  availableTags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  rules: () => ({
    date: [
      { required: true, message: '请选择日期', trigger: 'change' }
    ],
    content: [
      { required: true, message: '请输入日记内容', trigger: 'blur' },
      { min: 1, message: '日记内容不能为空', trigger: 'blur' }
    ]
  }),
  loading: false,
  availableTags: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: CreateDiaryParams]
  submit: []
  cancel: []
}>()

const formRef = ref<FormInstance>()
const formData = reactive<CreateDiaryParams>({
  content: '',
  date: '',
  tags: []
})

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  Object.assign(formData, newValue)
}, { immediate: true, deep: true })

// 监听表单数据变化
watch(formData, (newValue) => {
  emit('update:modelValue', { ...newValue })
}, { deep: true })

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    emit('submit')
  } catch (error) {
    // 验证失败
  }
}
</script>

<style scoped>
.diary-form {
  padding: 20px 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--el-border-color-light);
}
</style> 