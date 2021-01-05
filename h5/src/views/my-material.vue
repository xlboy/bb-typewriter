<template>
  <div class="center"></div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import { defineComponent, inject } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "MyMaterial",
  setup() {
    const baseLayout = useBaseLayout();
    const $store = useStore();
    baseLayout.setNavBar({
      title: "个人中心",
      rightVisible: false,
    });
    return {};
  },
});
</script>

<style lang="less" scoped>
.center {
  width: 100%;
  height: 100%;
  margin-top: 5px;
}
</style>
