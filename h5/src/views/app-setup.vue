<template>
  <div class="setup">
    你好，APP设置
    <button @click="$router.push({ name: 'AppAboutTest' })">to</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppSetup",
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.setup {
  width: 100%;
  height: 100%;
}
</style>
