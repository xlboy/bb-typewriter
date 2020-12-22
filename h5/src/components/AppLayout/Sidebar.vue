<template>
  <div class="sidebar">
    <div class="sidebar-user" @click="toLogin">
      <img
        class="sidebar-user__avatar"
        src="http://q1.qlogo.cn/g?b=qq&nk=52852983&s=640"
      />
      <span class="sidebar-user__nickname">顾恒生</span>
      <span class="sidebar-user__sign">这个人很懒..什么都没有留下</span>
    </div>
    <ul class="sidebar-nav">
      <li
        v-for="(item, i) in navs"
        :key="i"
        :class="[item.isCurrentPath ? 'sidebar-nav__select' : '']"
        @click="toPage(i)"
      >
        {{ item.navName }}
      </li>
    </ul>
    <div class="sidebar-theme">
      <div
        class="sidebar-theme__color"
        v-for="(item, i) in themeColors"
        :key="i"
        :style="{ background: item }"
        @click="themeChange(i)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import themeColors from "@/model/themeColors";
export default defineComponent({
  name: "AppSidebar",
  setup() {
    const router = useRouter();

    // nav导航的功能处理
    const nav = (() => {
      const sidebar = reactive({
        navs: [
          { navName: "云跟打", pathName: "CloudTyping", isCurrentPath: true },
          { navName: "小程序大厅", pathName: "MiniApps", isCurrentPath: false },
          { navName: "设置", pathName: "AppSetup", isCurrentPath: false },
          { navName: "关于", pathName: "AppAbout", isCurrentPath: false }
        ]
      });
      function toPage(navIndex: number) {
        const nav = sidebar.navs[navIndex];
        sidebar.navs.forEach(o => (o.isCurrentPath = false));
        nav.isCurrentPath = true;
        router.push({ name: nav.pathName });
      }

      return {
        toPage,
        ...toRefs(sidebar)
      };
    })();

    // 主题配色的处理
    const theme = (() => {
      function themeChange(i: number) {
        const themeStr = "theme" + i;
        document.body.className = themeStr;
        localStorage.setItem("appTheme", themeStr);
      }

      return {
        themeChange,
        themeColors
      };
    })();
    
    // 去登录页面
    function toLogin() {
      router.push({ name: "AppLogin" })
    }

    return {
      ...nav,
      ...theme,
      toLogin
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/style/keyframes.scss";
.sidebar {
  width: 100%;
  height: auto;
  .sidebar-user {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 20px;
    align-items: center;
    &__avatar {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
      border-radius: 100%;
      &:active {
        animation: btnGroups 1s linear;
      }
    }
    &__nickname {
      font-size: 18px;
      letter-spacing: 1px;
      color: #fff;
      margin-bottom: 9px;
    }
    &__sign {
      font-size: 13px;
      color: hsla(0, 0%, 100%, 0.8);
    }
  }
  .sidebar-nav {
    width: 100%;
    margin-top: 25px;
    & > li {
      font-size: 15px;
      transition: all 0.8s;
      box-sizing: border-box;
      padding-left: 30px;
      width: 100%;
      height: 40px;
      color: rgb(211, 204, 204);
      line-height: 40px;
    }
    &__select {
      font-size: 17px !important;
      color: #fff !important;
      background: linear-gradient(
        90deg,
        var(--theme-color),
        transparent
      ) !important;
    }
  }
  .sidebar-theme {
    border-radius: 5px;
    overflow: hidden;
    width: 160px;
    margin: 20px auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    &__color {
      width: 40px;
      height: 15px;
      &:nth-child(1),
      &:nth-child(2) {
        width: 50%;
      }
      &:nth-last-child(1),
      &:nth-last-child(2) {
        width: 50%;
      }
      &:hover {
        transition: all 0.3s;
        transform: scale(1.2);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
