<template>
  <div class="header">
    <SystemLogo />
    <el-space>
      <!-- <LanguageSwitch /> -->
      <ThemeSwitch />
      <UserInfo />
    </el-space>
  </div>
</template>

<script setup lang="ts">
import SystemLogo from '../components/SystemLogo.vue'
// import LanguageSwitch from '../components/LanguageSwitch.vue'
import ThemeSwitch from '../components/ThemeSwitch.vue'
import UserInfo from '../components/UserInfo.vue'
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: var(--el-menu-bg-color);
  border-bottom: 1px solid var(--el-menu-border-color);
}
</style>
