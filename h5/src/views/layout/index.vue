<template>
  <div class="app-layout" :class="[sidebarVisibleClass]">
    <div class="app-sidebar">
      <app-sidebar />
    </div>
    <div class="app-container" @click="switchContainer">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <Live2d @openSidebar="openSidebar" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import AppSidebar from "@/components/AppLayout/Sidebar.vue";
import Live2d from "@/components/AppLayout/Live2d.vue";

export default defineComponent({
  name: "Layout",
  components: {
    AppSidebar,
    Live2d,
  },
  setup() {
    // 处理侧边栏(Sidebar)的功能块
    const appSidebar = (() => {
      const sidebar = reactive({
        visible: false, // 是否打开了侧边栏
        closeAnime: false, // 是否展示关闭动画
      });

      function openSidebar() {
        /* 打开Sidebar事件   */
        sidebar.visible = true;
      }
      function switchContainer() {
        /* 切换容器 */
        if (sidebar.visible) {
          sidebar.visible = false;
        }
      }

      const sidebarVisibleClass = computed(() =>
        sidebar.visible ? "app-layout__open-sidebar" : ""
      ); // 是否打开Sidebar

      return {
        openSidebar,
        switchContainer,
        sidebarVisibleClass,
      };
    })();
    return {
      ...appSidebar,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@assets/style/mixin.scss";
.app-layout {
  width: 100%;
  height: 100vh;
  float: left;
  position: relative;
  overflow: hidden;;
  background: var(--sidebar-bg);
  .app-sidebar {
    box-sizing: border-box;
    padding: 50px 0px;
    width: 69%;
    height: 100%;
    transition: all 0.8s;
    position: absolute;
  }
  .app-container {
    width: 100%;
    height: 100%;
    border: 1px;
    box-sizing: border-box;
    // padding: 5px;
    background: #fbfbfb;
    border-radius: 0px;
    transition: all 0.4s;
    position: fixed;
    top: 0%;
    transform: translate3d(0%, 0, 0) scale3d(1, 1, 1);
  }
  .app-suspension {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  &__open-sidebar {
    .app-container {
      transform: translate3d(70%, 0, 0) scale3d(0.9, 0.9, 1);
      border-radius: 10px;
      &::before {
        position: absolute;
        top: 1.6rem;
        bottom: 1.6rem;
        left: -1.6rem;
        width: 100%;
        z-index: -1;
        border-radius: 10px;
        background-color: hsla(0, 0%, 100%, 0.2);
        content: "";
      }
    }
  }
}
</style>
