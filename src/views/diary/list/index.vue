<template>
  <div class="list">
    <div class="filter">Filter</div>
    <div class="scroll-container" v-infinite-scroll="loadMore">
      <DiaryItem v-for="item in list" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { diaryApi, type Diary } from '@/api/diary'
import DiaryItem from '../components/DiaryItem.vue'

const list = ref<Diary[]>([])

const getData = () => {
  diaryApi.getList().then((res) => {
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
.list {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.filter {
  height: 40px;
}
.scroll-container {
  flex: 1;
  overflow-y: auto;
}
</style>