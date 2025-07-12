<template>
  <!-- <div class="diary-container">
    <div class="tab">
      <el-radio-group v-model="current">
        <el-radio-button v-for="tab in tabs" :key="tab.value" :label="tab.label" :value="tab.value" />
      </el-radio-group>
    </div>
    <div class="main">
      <Home v-if="current === tabs[0].value" />
      <Statistics v-else />
    </div>
  </div> -->
  <div class="diary-page">
    <div class="diary-main">
      <div class="tab">
        <el-radio-group v-model="current">
          <el-radio-button v-for="tab in tabs" :key="tab.value" :label="tab.label" :value="tab.value" />
        </el-radio-group>
      </div>
      <div class="main">
        <Home v-if="current === tabs[0].value" />
        <Statistics v-else />
      </div>
    </div>
    <RecommendPanel />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LabelValue } from '@/types/base'
import Home from './home/index.vue'
import Statistics from './statistics/index.vue'
import RecommendPanel from './components/RecommendPanel.vue'

const tabs: LabelValue[] = [
  { label: '日记', value: 'home' },
  { label: '标签', value: 'tag' },
  { label: '统计', value: 'stats' },
]

const current = ref('home')
</script>

<style scoped lang="scss">
.diary-page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
}
.diary-main {
  width: 1000px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  padding: 10px 16px;
  background-color: var(--el-bg-color);
  border-radius: 4px;
}
.diary-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  background-color: var(--el-bg-color);
  border-radius: 4px;
}
</style>
