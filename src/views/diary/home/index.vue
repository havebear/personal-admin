<template>
  <div class="home">
    <div class="list">
      <div class="filter">
        <el-space>
          <el-input v-model="query.search" placeholder="搜索" />
          <el-date-picker
            v-model="query.date"
            type="daterange"
            placeholder="选择日期"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-select class="filter-select" v-model="query.type" placeholder="选择类型">
            <el-option label="全部" value="" />
            <el-option label="日记" value="diary" />
            <el-option label="随笔" value="essay" />
          </el-select>
        </el-space>
        <el-space>
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">新增</el-button>
        </el-space>
      </div>
      <div class="scroll-container" v-infinite-scroll="loadMore">
        <DiaryItem v-for="item in list" :key="item.id" :data="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { diaryApi, type Diary } from '@/api/diary'
import DiaryItem from '../components/DiaryItem.vue'

const query = reactive({
  search: '',
  date: '',
  type: '',
})

const list = ref<Diary[]>([])

const getData = () => {
  diaryApi.getList(query).then((res) => {
    list.value = res.data.data
  })
}

const loadMore = () => {
  console.log('loadMore')
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.home {
  min-height: 0;
  flex: 1;
  display: flex;
}
.list {
  // min-width: 0;
  // flex: 1;
  width: 1000px;
  display: flex;
  flex-direction: column;
}
.filter {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-select {
    width: 100px;
  }
}
.scroll-container {
  flex: 1;
  overflow-y: auto;
}
</style>
