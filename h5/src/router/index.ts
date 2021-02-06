import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/",
        name: "CloudTyping",
        component: () => import(/* webpackChunkName: "CloudTyping" */ "../views/cloud-typing/index.vue")
      },
      {
        path: "/base-layout",
        name: "BaseLayout",
        component: () => import(/* webpackChunkName: "BaseLayout" */ "../views/layout/base-layout.vue"),
        children: [
          {
            path: "edit-customize-article",
            name: "EditCustomizeArticle",
            component: () => import(/* webpackChunkName: "EditCustomizeArticle" */ "../views/cloud-typing/edit-customize-article.vue"),
          },
          {
            path: "app-login",
            name: "AppLogin",
            component: () => import(/* webpackChunkName: "AppLogin" */ "../views/app-login.vue")
          },
          {
            path: "app-setup",
            name: "AppSetup",
            component: () => import(/* webpackChunkName: "AppSetup" */ "../views/app-setup.vue")
          },
          {
            path: "app-about",
            name: "AppAbout",
            component: () => import(/* webpackChunkName: "AppAbout" */ "../views/app-about.vue")
          },
          {
            path: "mini-apps",
            name: "MiniApps",
            component: () => import(/* webpackChunkName: "MiniApps" */ "../views/mini-apps/index.vue")
          },
          {
            path: "my-material",
            name: "MyMaterial",
            component: () => import(/* webpackChunkName: "MyMaterial" */ "../views/my-material.vue")
          },
          {
            path: "rally-setup",
            name: "RallySetup",
            component: () => import(/* webpackChunkName: "RallySetup" */ "../views/cloud-typing/rally-setup.vue")
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