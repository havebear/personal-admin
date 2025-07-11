<template>
  <div class="diary-container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="日记" name="first">日记</el-tab-pane>
    <el-tab-pane label="日历" name="second">日历</el-tab-pane>
    <el-tab-pane label="那年今日" name="third">那年今日</el-tab-pane>
    <el-tab-pane label="统计" name="fourth">统计</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: any, event: any) => {
  console.log(tab, event)
}
</script>

<style scoped lang="scss">
.diary-container {
  width: 100%;
  height: 100%;
  background-color: var(--el-bg-color);
}
:deep(.el-tabs__item) {
  width: 100px;
}
</style>