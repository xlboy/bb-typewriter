<template>
  <div class="speed">
    <div class="speed-tag">第{{ refState.source.index }}段</div>
    <div class="speed-tag">{{ getSpeed }}</div>
    <div class="speed-tag" v-if="wordhint.isOpen.value">
      {{ wordhint.currentCode.value }}
    </div>
    <div class="speed-btn waves-btn" @click="restartTyping">
      <van-icon name="replay" />
    </div>
    <div class="speed-btn waves-btn" @click="switchFullScreen">
      <van-icon name="expand-o" />
    </div>
    <van-popover
      v-model:show="menuActions.data.show"
      :actions="menuActions.data.actions"
      @select="menuActions.onSelect"
      placement="bottom-end"
      :style="{ height: '100%' }"
    >
      <template #reference>
        <div class="speed-btn waves-btn">
          <van-icon name="apps-o" />
        </div>
      </template>
    </van-popover>
  </div>
</template>
<script lang="ts">
import { TypingSymbol } from "@/hooks/useTyping";
import copyText from "@/utils/copyText";
import typingContent from "@/utils/typing/typingContent";
import { Toast } from "vant";
import Notify from "@/utils/notify";
import { computed, defineComponent, inject, reactive } from "vue";
import customizeArticle from "@/storeComposition/cloudTyping/customizeArticle";
import storeWordHint from "@/storeComposition/cloudTyping/wordHint";
export default defineComponent({
  name: "SpeedTop",
  setup() {
    const { getters, refState, mutations } = inject(TypingSymbol) as any;
    const { getSpeed, getKeystroke, getYardsLong } = getters;

    // 切换全屏
    const switchFullScreen = (() => {
      let isFullScreen = false;
      function onSwitch() {
        isFullScreen
          ? document.exitFullscreen()
          : document.body.requestFullscreen();
        isFullScreen = !isFullScreen;
      }
      return onSwitch;
    })();

    // 小菜单
    const menuActions = (() => {
      const data = reactive({
        show: false,
        actions: [
          { text: "分享内容", icon: "share-o" },
          { text: "下一段", icon: "arrow-down" },
        ],
      });

      function onSelect(action: { text: string }) {
        switch (action.text) {
          case "分享内容": {
            const { content, index } = refState.source;
            const shareStr = `${content}\n-----第${index}段-----`;
            Toast("小B已帮您复制至剪贴板，快去分享吧");
            copyText(shareStr);
            break;
          }
          case "下一段": {
            // 根据当前练习内容的类型来判定是否有下一段的操作
            const { type, data } = refState.typingType;
            const resetToast = () => {
              mutations.ResetTyping();
              Notify("下一段成功，开始你的表演");
            };
            if (["单字", "词组"].includes(type)) {
              if (data.size && data.name) {
                const processMethod =
                  typingContent[type === "单字" ? "word" : "phrase"];
                mutations.SetSource({
                  content: processMethod(data.name, data.size),
                  index: refState.source.index + 1,
                });
                resetToast();
              }
            } else if (type === "自定义文章") {
              const { content } = customizeArticle.find(data.id);
              if (content.currentIndex >= content.content.length) {
                return Notify.warning("内容已打完！快换一段吧！");
              }
              mutations.SetSource({
                content: content.content.substr(
                  content.currentIndex,
                  data.size
                ),
                index: refState.source.index + 1,
              });
              resetToast();
            } else Notify.warning("下一段内容类型不匹配哦");
            break;
          }
        }
      }
      return {
        data,
        onSelect,
      };
    })();

    // 词提编码展示
    const wordhint = (() => {
      const isOpen = computed(() => storeWordHint.getters.isOpen);
      const currentCode = computed(() => {
        const inputLength = refState.haveInput.length;
        const { hintContrst } = storeWordHint.getters;
        return hintContrst[inputLength]?.hintObj?.encode || '🐢🐢';
      });
      return {
        isOpen,
        currentCode,
      };
    })();

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
      menuActions,
      restartTyping,
      switchFullScreen,
      wordhint,
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
<style lang="scss" >
.speed {
  .van-popover__wrapper {
    height: 100%;
  }
}
</style>