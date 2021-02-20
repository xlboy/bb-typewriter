<template>
  <div class="base-layout">
    <div class="base-layout__header">
      <van-icon name="arrow-left" @click="onClickLeft" />
      <van-icon
        :name="navBar.rightIconName"
        v-if="navBar.rightVisible"
        @click="onClickRight"
      />
      <span class="base-layout__header-title">{{ navBar.title }}</span>
    </div>
    <router-view class="base-layout__view"></router-view>
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
    const $router = useRouter();
    function onClickLeft() {
      $router.back();
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
    min-height: 45px;
    display: flex;
    box-sizing: border-box;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 11;
    color: var(--theme-color);
    &-title {
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      font-size: 16.5px;
    }
  }
  &__view {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
