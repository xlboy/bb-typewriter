<template>
  <div class="center">你是帅比，没啥好看的</div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyMaterial",
  setup() {
    const baseLayout = useBaseLayout();
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
