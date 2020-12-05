<template>
  <div class="speed">
    <div class="speed-tag">第{{ refState.source.index }}段</div>
    <div class="speed-tag">{{ getSpeed }}</div>
    <!-- <div class="speed-tag">{{ getKeystroke }}</div>
    <div class="speed-tag">{{ getYardsLong }}</div> -->
    <div class="speed-btn waves-btn" @click="restartTyping">
      <van-icon name="replay" />
    </div>
    <div class="speed-btn waves-btn" @click="shareArticle">
      <van-icon name="share-o" />
    </div>
  </div>
</template>
<script lang="ts">
import { TypingSymbol } from "@/hooks/useTyping";
import copyText from "@/utils/copyText";
import { Toast } from "vant";
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "SpeedTop",
  setup() {
    const { getters, refState, mutations }: any = inject(TypingSymbol);
    const { getSpeed, getKeystroke, getYardsLong } = getters;
    // 分享当前文章
    function shareArticle() {
      const { content, index } = refState.source;
      const shareStr = `${content}\n-----第${index}段-----`;
      Toast("小B已帮您复制至剪贴板，快去分享吧");
      copyText(shareStr);
    }
    // 重新开始
    function restartTyping() {
      Toast("刷新成功");
      mutations.ResetTyping();
    }
    return {
      getSpeed,
      getKeystroke,
      getYardsLong,
      refState,
      shareArticle,
      restartTyping,
    };
  },
});
</script>
<style lang="scss" scoped>
.speed {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-btn {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--theme-color);
    background: var(--box-back-color);
    margin-top: 1px;
    box-shadow: 0 3px 6px var(--box-shadow);
    border-radius: 12px;
  }
  &-tag {
    background: var(--box-back-color);
    color: var(--theme-color);
    transition: all 0.5s;
    flex: 1;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    border-radius: 3px;
    margin: 0 3px;
    box-shadow: 0 3px 6px var(--box-shadow);
    border: 0px !important;
    font-size: 13px;
    &:nth-child(1) {
      margin-left: 0px;
    }
    &:nth-last-child(1) {
      margin-right: 0px;
    }
  }
}
</style>
