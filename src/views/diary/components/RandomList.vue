<template>
  <div class="random-list">
    RandomList
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref<Diary[]>([])
</script>

<style scoped lang="scss">
.random-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
