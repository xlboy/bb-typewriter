import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import test from '../views/cloud-typing/test.vue'
// import test1 from '../views/layout/baseLayout.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    // redirect: "/cloud-typing",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/mini-apps/index.vue"),
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
        component: () => import("../views/app-about/index.vue"),
        children: [
          {
            path: "test",
            name: "AppAboutTest",
            component: () => import("../views/app-about/index.vue"),
          }
        ]
      }
    ]
  },
  // {
  //   path: "/base-layout",
  //   name: "BaseLayout",
  //   component: () => import("../views/layout/base-layout.vue"),
  //   children: [
  //     {
  //       path: "test",
  //       name: "test",
  //       component: () => import("../views/app-about/index.vue")
  //     },
  //   ]
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
