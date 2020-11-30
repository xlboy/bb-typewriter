import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    redirect: "/cloud-typing",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/index.vue"),
    children: [
      {
        path: "cloud-typing",
        name: "CloudTyping",
        component: () => import("../views/cloud-typing/index.vue")
      },
      {
        path: "mini-apps",
        name: "MiniApps",
        component: () => import("../views/mini-apps/index.vue")
      },
      {
        path: "app-setup",
        name: "AppSetup",
        component: () => import("../views/app-setup/index.vue")
      },
      {
        path: "app-about",
        name: "AppAbout",
        component: () => import("../views/app-about/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
