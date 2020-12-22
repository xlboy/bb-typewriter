<template>
  <van-popup
    class="select-customize"
    v-model:show="show"
    closeable
    close-icon="close"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <van-icon
      class="select-customize__add-btn"
      name="add-o"
      size="21px"
      @click="toAddPage"
    />
    <van-swipe-cell
      class="select-customize__swipe-item"
      v-for="(item, index) in customizeArticleList"
      :key="index"
    >
      <template #left>
        <van-button square type="primary" text="练习" />
      </template>
      <van-cell
        :border="false"
        :title="item.title"
        :value="`长度${item.content.length}  已打${item.currentIndex}`"
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
  emits: ["show:update"],
  setup() {
    const router = useRouter();
    function toAddPage() {
      router.push({ name: "AddCustomizeArticle" });
    }
    customizeArticle.initData();
    console.log("重新触发啦", customizeArticle);
    return {
      customizeArticleList: customizeArticle.list,
      toAddPage,
    };
  },
});
</script>
<style lang="scss">
.select-customize {
  box-sizing: border-box;
  padding-top: 40px;
  &__add-btn {
    position: absolute;
    left: 17px;
    top: 15px;
    color: #c8c9cc;
  }
  &__swipe-item {
    margin-bottom: 3px;
    border-bottom: 1px solid rgba(51, 51, 51,.08);
  }
}
</style>
