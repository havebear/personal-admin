<template>
  <div class="basic-layout">
    <LayoutHeader />
    <div class="basic-layout-container">
      <LayoutAside />
      <div class="basic-layout-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './header/index.vue'
import LayoutAside from './aside/index.vue'
</script>

<style scoped lang="scss">
.basic-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-container {
    flex: 1;
    display: flex;
  }
  &-content {
    box-sizing: border-box;
    min-width: 0;
    flex: 1;
    height: 100%;
    padding: 16px;
    overflow: auto;
  }
}
</style>
