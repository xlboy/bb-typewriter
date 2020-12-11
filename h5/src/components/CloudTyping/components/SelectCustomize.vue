<template>
  <van-popup
    v-model:show="show"
    closeable
    close-icon="close"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <van-swipe-cell :before-close="beforeClose">
      <template #left>
        <van-button square type="primary" text="选择" />
      </template>
      <van-cell :border="false" title="单元格" value="内容" />
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </van-popup>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SelectCustomize",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return { ...props };
  },
});
</script>
<style lang="scss" scoped>
</style>
