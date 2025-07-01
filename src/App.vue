<template>
  <el-config-provider :locale="elementLocale">
    <div :class="['app-root', isDark ? 'dark' : '']" id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useDark } from '@vueuse/core'

const { locale } = useI18n()
const isDark = useDark({
  selector: 'body',
  valueDark: 'dark',
  valueLight: '',
})

const elementLocale = computed(() => {
  return locale.value === 'zh-CN' ? zhCn : en
})
</script>

<style scoped>
.app-root.dark {
  background: #181818;
  color: #fff;
}
</style>
