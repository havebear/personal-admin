<template>
  <div class="diary-container">
    <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="日记" name="first">日记</el-tab-pane>
      <el-tab-pane label="日历" name="second">日历</el-tab-pane>
      <el-tab-pane label="那年今日" name="third">那年今日</el-tab-pane>
      <el-tab-pane label="统计" name="fourth">统计</el-tab-pane>
    </el-tabs> -->
    <el-radio-group v-model="current">
      <el-radio-button label="日记" value="list" />
      <el-radio-button label="日历" value="calendar" />
      <el-radio-button label="那年今日" value="onThisDay" />
      <el-radio-button label="统计" value="stats" />
    </el-radio-group>
    <div class="main">
      <List />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import List from './list/index.vue'

const current = ref('list')
</script>

<style scoped lang="scss">
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
.main {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>