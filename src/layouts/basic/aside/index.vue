<template>
  <div class="aside">
    <el-menu class="menu" :default-active="activeMenu" router @select="handleMenuSelect">
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <span>{{ $t('menu.workspace') }}</span>
      </el-menu-item>
      <el-menu-item index="/diary">
        <el-icon><Notebook /></el-icon>
        <span>{{ $t('menu.diary') }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const i18n = useI18n()

const activeMenu = ref(route.path)

const handleMenuSelect = (index: string) => {
  activeMenu.value = index
}
</script>

<style scoped lang="scss">
.aside {
  width: 200px;
  height: 100%;
}
.menu {
  height: 100%;
}
</style>
