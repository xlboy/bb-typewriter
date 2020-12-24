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
import customizeArticle, {
  ICustomizeArticle,
} from "@/storeComposition/cloudTyping/customizeArticle";
import useBaseLayout from "@/hooks/useBaseLayout";
import { defineComponent, reactive } from "vue";
import Notify from "@/utils/notify";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "EditCustomizeArticle",
  setup() {
    const form = reactive({
      id: ((customizeArticle.list.value[0] as ICustomizeArticle)?.id ?? 0) + 1, // 用数组中第一个content的id+1当默认索引，如若修改时，会覆盖
      title: "",
      content: "",
      currentIndex: 0,
    });
    const baseLayout = useBaseLayout();
    const router = useRouter();

    const customizeArticleId = router.currentRoute.value.query.id ?? "";
    const currentMode = customizeArticleId === "" ? "添加" : "修改";

    // 如若是修改状态，初始化下数据
    if (currentMode === "修改") {
      const { content } = customizeArticle.find(+customizeArticleId)
      Object.assign(form, content);
    }

    // 设置标题
    baseLayout.setNavBar({
      title: "自定义文章" + currentMode,
      rightVisible: true,
      rightIconName: "aim",
      rightClick() {
        if (currentMode === "添加") {
          customizeArticle.add({ ...form });
        } else {
          customizeArticle.update(+customizeArticleId, { ...form });
        }
        Notify(`自定义文章${currentMode}成功`);
        setTimeout(() => {
          router.back();
        }, 300);
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
