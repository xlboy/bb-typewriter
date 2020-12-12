<template>
  <div class="base-layout">
    <div class="base-layout__header"></div>
    <router-view class="base-layout__view" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useBaseLayout from "@/hooks/useBaseLayout";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "BaseLayout",
  setup() {
    const baseLayout = useBaseLayout();
    const router = useRouter();
    function onClickLeft() {
      router.back();
      console.log("好好好，返回");
    }
    function onClickRight() {
      baseLayout.navBar.rightClick?.();
    }
    return {
      navBar: baseLayout.navBar,
      onClickLeft,
      onClickRight,
    };
  },
});
</script>
<style lang="scss" scoped>
.base-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__header {
    width: 100%;
    height: 50px;
    display: flex;
    box-sizing: border-box;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  }
  &__view {
    width: 100%;
    flex: 1;
  }
}
</style>
