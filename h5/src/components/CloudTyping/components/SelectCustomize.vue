<template>
  <van-popup
    class="select-customize"
    closeable
    close-icon="close"
    @clickOverlay="closePopup"
    @clickCloseIcon="closePopup"
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
        <van-button
          square
          type="primary"
          text="重新练习"
          @click="startPractice(item.id, true)"
        />
        <van-button
          square
          color="#b46e65"
          text="继续练习"
          @click="startPractice(item.id, false)"
        />
        <van-button
          square
          color="#7232dd"
          text="修改"
          @click="toEditPage(item.id)"
        />
      </template>
      <div class="select-customize__swipe-wrap">
        <van-tag class="left-title" plain type="primary" size="medium">{{
          item.title
        }}</van-tag>
        <div class="right-info">
          <van-tag type="primary" size="medium" class="m-basis-1"
            >长度{{ item.content.length }}</van-tag
          >
          <van-tag type="primary" size="medium" class="m-basis-1"
            >已打{{ item.currentIndex }}</van-tag
          >
        </div>
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="deleteCustomizeArticle(item.id)"
        />
      </template>
    </van-swipe-cell>
  </van-popup>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import customizeArticle from "@/storeComposition/cloudTyping/customizeArticle";
import { TypingSymbol } from "@/hooks/useTyping";
import ConfirmInput from "@/components/Common/ConfirmInput";
import { Toast } from "vant";
export default defineComponent({
  name: "SelectCustomize",
  emits: ["update:show"],
  setup(props, { emit }) {
    const router = useRouter();
    const { mutations: typingMutations, refState }: any = inject(TypingSymbol);
    typingMutations.AddFinishCallBack(() => {
      const { type, data } = refState.typingType;
      if (type === "自定义文章") {
        customizeArticle.updateCurrentIndex(data.id, data.size);
      }
    });
    function closePopup() {
      emit("update:show", false);
    }
    // 跳转添加自定义文章页面
    function toAddPage() {
      router.push({ name: "EditCustomizeArticle" });
    }
    // 跳转修改自定义文章页面
    function toEditPage(id: number) {
      router.push({ name: "EditCustomizeArticle", query: { id } });
    }
    // 开始进行练习
    function startPractice(id: number, isReset: boolean) {
      ConfirmInput.number({ label: "练习字数" }).then((size: any) => {
        size = +size;
        const { content } = customizeArticle.find(id);
        if (isReset) {
          customizeArticle.resetCurrentIndex(id);
        } else if (content.currentIndex >= content.content.length) {
          return Toast("内容已发空啦，快换段试试！");
        }
        const currentIndex = isReset ? 0 : content.currentIndex
        typingMutations.SetTypingType("自定义文章", { id, size });
        typingMutations.SetSource({
          content: content.content.substr(currentIndex, size),
          index: 1,
        });
        emit("update:show", false);
      });
    }
    // 删除某个自定义文章
    function deleteCustomizeArticle(id: number) {
      customizeArticle.delete(id);
    }
    customizeArticle.initData();
    return {
      customizeArticleList: customizeArticle.list,
      toAddPage,
      toEditPage,
      startPractice,
      deleteCustomizeArticle,
      // 在此处提前暴露一个show置模板中，提防组件编译时，没收到父组件传进来的参数而报的警告
      // Property "show" was accessed during render but is not defined on instance
      // 在暴露后，可提防编译时没发现show变量的警告。父组件传置进来的show会顶替掉setupComponent中返回的show
      // 此处已通过另外一种方式解决，乱七八糟的。。(2020-12-26)
      // show: ref(false),
      closePopup,
    };
  },
});
</script>
<style lang="scss">
.select-customize {
  box-sizing: border-box;
  padding-top: 45px;
  &__add-btn {
    position: absolute;
    left: 17px;
    top: 15px;
    color: #c8c9cc;
  }
  &__swipe-item {
    border-bottom: 1px solid rgba(51, 51, 51, 0.08);
  }
  &__swipe-wrap {
    width: 100%;
    min-height: 43.5px;
    display: flex;
    box-sizing: border-box;
    padding: 0px 10px;
    justify-content: space-between;
    align-items: center;
    .left-title {
      display: block;
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .right-info {
      display: block;
      width: 30%;
      height: 100%;
      flex-direction: column;
    }
  }
}
</style>
