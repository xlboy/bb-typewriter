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
    <!-- <Live2d @openSidebar="openSidebar" v-if="live2dShow" /> -->
    <div class="app-suspension" @click="openSidebar">
      <van-icon name="ellipsis" size="30" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, provide, reactive } from "vue";
import AppSidebar from "@/components/AppLayout/Sidebar.vue";
// import Live2d from "@/components/AppLayout/Live2d.vue";

export default defineComponent({
  name: "Layout",
  components: {
    AppSidebar,
    // Live2d,
  },
  setup() {
    // 处理侧边栏(Sidebar)的功能块
    const appSidebar = (() => {
      const sidebar = reactive({
        visible: false, // 是否打开了侧边栏
        closeAnime: false, // 是否展示关闭动画
      });

      function openSidebar() {
        sidebar.visible = true;
      }
      function closeSidebar() {
        sidebar.visible = false;
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

      // 抛给子组件，切换Layout侧边栏的方法
      provide("AppSwitchSidebar", { openSidebar, closeSidebar });
      return {
        openSidebar,
        switchContainer,
        sidebarVisibleClass,
      };
    })();

    // live2d模型模块（处理第三级路由时产生的live2d内存溢出）(2020-12-21)
    // 发现将live2d隐藏掉也无济于事，那只能换种方式了，此处留着，以后有长进了再看看 (2020-12-22)
    // const live2d = (() => {
    //   const show = ref(true);
    //   const router = useRouter();
    //   // 路由发生改变后，判断是否为第三级子路由页面，若是则隐藏掉live2d模型，因为会触发不明所以的内存溢出。。。
    //   watch(
    //     () => router.currentRoute.value.fullPath,
    //     (newVal) => {
    //       show.value = !/base-layout/.test(newVal);
    //     }
    //   );
    //   return {
    //     live2dShow: show,
    //   };
    // })();
    return {
      ...appSidebar,
      // ...live2d,
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
  overflow: hidden;
  background: var(--sidebar-bg);
  .app-suspension {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: var(--theme-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: all 0.5s;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    &:hover {
      transform: rotate(180deg);
    }
  }
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
