<template>
  <div class="list">
    <div class="scroll-container" v-infinite-scroll="loadMore">
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loadMore = () => {
  console.log('loadMore')
}
</script>

<style scoped lang="scss">
</style>