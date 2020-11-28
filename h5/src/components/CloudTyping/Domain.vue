<template>
  <div class="domain">
    这特么是功能区
    <van-button plain hairline type="primary">细边框按钮</van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Domain",
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.domain {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
