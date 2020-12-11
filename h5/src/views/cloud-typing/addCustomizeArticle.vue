<template>
  <van-field v-model="form.title" label="标题" placeholder="请输入标题" />
  <van-field
    v-model="form.content"
    rows="7"
    autosize
    label="内容"
    type="textarea"
    maxlength="20000"
    placeholder="请输入内容"
    show-word-limit
  />
</template>
<script lang="ts">
import customizeArticle from "@/components/CloudTyping/hooks/customizeArticle";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "AddCustomizeArticle",
  setup() {
    const form = reactive({
      id: "",
      title: "",
      content: "",
      currentIndex: 0,
    });
    customizeArticle;
    return {
      form,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
