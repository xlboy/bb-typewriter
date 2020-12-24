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
        component: () => import("../views/app-setup.vue")
      },
      {
        path: "app-about",
        name: "AppAbout",
        component: () => import("../views/app-about.vue")
      },
      {
        path: "/base-layout",
        name: "BaseLayout",
        component: () => import("../views/layout/base-layout.vue"),
        children: [
          {
            path: "edit-customize-article",
            name: "EditCustomizeArticle",
            component: () => import("../views/cloud-typing/edit-customize-article.vue"),
          },
          {
            path: "app-login",
            name: "AppLogin",
            component: () => import("../views/app-login.vue")
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
