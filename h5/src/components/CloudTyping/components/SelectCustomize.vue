<template>
  <van-popup
    v-model:show="show"
    closeable
    close-icon="close"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <van-button @click="toAddPage"> 添加 </van-button>
    <van-swipe-cell v-for="(item, index) in customizeArticleList" :key="index">
      <template #left>
        <van-button square type="primary" text="练习" />
      </template>
      <van-cell
        :border="false"
        :title="item.title"
        :value="`字数:${item.content.length}-当前进度:${item.currentIndex}`"
      />
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </van-popup>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import customizeArticle from "../hooks/customizeArticle";
export default defineComponent({
  name: "SelectCustomize",
  props: {
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  emits: ["update:show"],
  setup() {
    const router = useRouter();
    function toAddPage() {
      router.push({ name: "AddCustomizeArticle" });
    }
    return {
      customizeArticleList: customizeArticle.list,
      toAddPage,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
