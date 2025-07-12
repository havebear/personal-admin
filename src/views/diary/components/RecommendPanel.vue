<template>
  <div class="recommend-panel">
    <el-radio-group v-model="current">
          <el-radio-button v-for="tab in tabs" :key="tab.value" :label="tab.label" :value="tab.value" />
        </el-radio-group>
    <RandomList />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RandomList from './RandomList.vue'
import type { LabelValue } from '@/types/base'

const tabs: LabelValue[] = [
  { label: '那年今日', value: 'today' },
  { label: '随机 10 篇', value: 'random' },
]

const current = ref('today')
</script>

<style scoped lang="scss">
.recommend-panel {
  min-width: 0;
  flex: 1;
  padding: 10px 16px;
  background-color: var(--el-bg-color);
  border-radius: 4px;
}
</style>
