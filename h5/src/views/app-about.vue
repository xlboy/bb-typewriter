<template>
  <div class="about">
    你好，关于APP
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppAbout",
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
}
</style>
