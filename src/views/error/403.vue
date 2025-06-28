<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <el-icon size="120" color="#f56c6c">
          <Lock />
        </el-icon>
      </div>
      <h1 class="error-title">403</h1>
      <h2 class="error-subtitle">访问被拒绝</h2>
      <p class="error-description">
        抱歉，您没有权限访问此页面，请先登录
      </p>
      <div class="error-actions">
        <el-button type="primary" @click="goLogin">
          去登录
        </el-button>
        <el-button @click="goHome">
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Lock } from '@element-plus/icons-vue'

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 500px;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  margin-bottom: 20px;
}

.error-title {
  font-size: 72px;
  font-weight: 700;
  color: #f56c6c;
  margin: 0 0 16px 0;
  line-height: 1;
}

.error-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 16px 0;
}

.error-description {
  font-size: 16px;
  color: #606266;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style>