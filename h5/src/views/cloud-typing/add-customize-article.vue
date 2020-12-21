<template>
  <div class="main">
    <van-field v-model="form.title" label="标题" placeholder="请输入标题" />
    <van-field
      class="main-content"
      v-model="form.content"
      rows="7"
      label="内容"
      type="textarea"
      maxlength="20000"
      placeholder="请输入内容"
      show-word-limit
    />
  </div>
</template>
<script lang="ts">
import customizeArticle from "@/components/CloudTyping/hooks/customizeArticle";
import useBaseLayout from "@/hooks/useBaseLayout";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "AddCustomizeArticle",
  setup() {
    const form = reactive({
      id: 1,
      title: "",
      content: "",
      currentIndex: 0,
    });
    const baseLayout = useBaseLayout();
    baseLayout.setNavBar({
      title: "自定义文章添加",
      rightVisible: true,
      rightIconName: "aim",
      rightClick() {
        customizeArticle.add({ ...form });
      },
    });
    return {
      form,
    };
  },
});
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
