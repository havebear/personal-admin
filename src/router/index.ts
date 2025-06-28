import { createMemoryHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      // 登录路由
      path: "/login",
      name: "Login",
      component: () => import("../views/login/index.vue"),
      meta: { 
        title: "登录",
        requiresAuth: false,
        layout: false
      },
    },
    {
      // 主路由
      path: "/",
      name: "Index",
      redirect: { name: "Workspace" },
      component: () => import("../layouts/basic/index.vue"),
      meta: { 
        title: "个人管理",
        requiresAuth: true
      },
      children: [
        {
          // 工作区路由
          path: "",
          name: "Workspace",
          component: () => import("../views/workspace/index.vue"),
          meta: { 
            title: "工作台",
            requiresAuth: true
          },
        },
        {
          // 日记路由
          path: "/diary",
          name: "Diary",
          component: () => import("../views/diary/index.vue"),
          meta: { 
            title: "日记管理",
            requiresAuth: true
          },
        },
      ],
    },
    {
      // 403 错误页面
      path: "/403",
      name: "Forbidden",
      component: () => import("../views/error/403.vue"),
      meta: { 
        title: "访问被拒绝",
        requiresAuth: false,
        layout: false
      },
    },
    {
      // 404 错误页面
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/error/404.vue"),
      meta: { 
        title: "页面不存在",
        requiresAuth: false,
        layout: false
      },
    },
  ],
});

export default router;
