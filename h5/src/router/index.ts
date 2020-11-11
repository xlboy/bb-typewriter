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
      },
      {
        path: "about",
        name: "ABOUT",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  },
  {
    path: "/vuex",
    name: "VUEX",
    component: () =>
      import(/* webpackChunkName: "vuex" */ "../views/vuex/index.vue")
  },
  {
    path: "/message",
    name: "MESSAGE",
    component: () =>
      import(/* webpackChunkName: "message" */ "../views/message/index.vue")
  },
  {
    path: "/form",
    name: "FORM",
    component: () =>
      import(/* webpackChunkName: "form" */ "../views/message/form.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
