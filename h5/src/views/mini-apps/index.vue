<template>
  <div class="mini-apps">
    你好，这里是小程序大厅
    <br />
    <br />
    <br />
    <br />
    <br />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MiniApps",
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.mini-apps {
  width: 100%;
  height: 100%;
}
</style>
