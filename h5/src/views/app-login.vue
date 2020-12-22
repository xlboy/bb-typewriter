<template>
  <div class="login"></div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppLogin",
  setup() {
    const baseLayout = useBaseLayout();
    baseLayout.setNavBar({
      title: "登陆或注册",
      rightVisible: false
    });
    return {};
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}
</style>
