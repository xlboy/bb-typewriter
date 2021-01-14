<template>
  <div class="contrst" :class="[seePlayTypingModelClass]" id="elContrst">
    <div
      v-for="(item, index) in currentPageChars"
      :key="index"
      :class="[inputCorrectClass(item), haveInputClass(item.haveInput)]"
      :style="wordHint.handleWordHintStyle(item)"
    >
      <span v-if="wordHint.weightCacheShow(item)">{{
        item.hintObj.weight
      }}</span>
      {{ formatSpace(item.text) }}
    </div>
  </div>
</template>
<script lang="ts">
import { TypingHintStyleTypes } from "@/enums/typingEnum";
import { TypingSymbol } from "@/hooks/useTyping";
import { IContrstCharObj } from "@/interface/ITyping";
import storeWordHint from "@/storeComposition/cloudTyping/wordHint/";
import { Toast } from "vant";
import { computed, defineComponent, inject, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ContrstMiddle",
  setup() {
    const { refState } = inject(TypingSymbol) as any;
    const $store = useStore();
    // 处理渲染对照区
    const renderContrst = (() => {
      // 练习内容的源数据，记载练习时的状态
      const contrstChars = ref(contrstCharObjs(refState.source.content));
      // 翻页、滚动的数据块
      const pageScroll = (() => {
        const size = 300; // 每页字数
        const turnSize = 5; // 提前多少个字进行预翻页
        const page = ref(1); // 当前是第几页

        // 每页开始的索引位置
        const startIndex = computed(
          () =>
            page.value * size -
            size -
            // 如若当前页数不为第1页，则少取提前翻页的字数进行预处理
            (page.value !== 1 ? (page.value - 1) * (turnSize * 2) : 0)
        );

        // 每页结尾的索引位置
        const endIndex = computed(() => {
          return startIndex.value + size;
        });
        return {
          page,
          size,
          turnSize,
          startIndex,
          endIndex,
        };
      })();
      // 当前页的字符数据，给予模板进行渲染
      const currentPageChars = computed(() => {
        const { startIndex, endIndex } = pageScroll;
        return contrstChars.value.slice(startIndex.value, endIndex.value);
      });
      // 所处模式,是否为看打模式,若是,则不显示对与错
      const seePlayTypingModelClass = computed(() => {
        return refState.typingModel === "看打模式" ? "contrst-see-play" : "";
      });
      // 词提模块的
      const wordHint = (() => {
        // 用户词提样式
        const userWordHintStyle = computed(
          () => $store.getters["user/getWordsHintStyle"]
        );
        // 防止重复词语权重数渲染的一个缓存集合
        const hasRenderMap = new Map();

        return {
          hasRenderMap,
          handleWordHintStyle,
          weightCacheShow,
        };
        // 处理词提样式
        function handleWordHintStyle(item: IContrstCharObj) {
          if (item.hintObj) {
            const { type, isBold } = item.hintObj;
            const {
              fourC,
              twoWord,
              threeWord,
              fourWord,
            } = userWordHintStyle.value;

            const style = {
              [TypingHintStyleTypes.FOUR_MAC_LENGTH_WORD]: {
                color: fourC,
                fontStyle: "italic",
              },
              [TypingHintStyleTypes.TOW_CODE_WORD]: {
                color: twoWord,
                borderBottom: `1px dashed ${twoWord}`
              },
              [TypingHintStyleTypes.THREE_CODE_WORD]: {
                color: threeWord,
                borderBottom: `1px solid ${threeWord}`,
              },
              [TypingHintStyleTypes.FOUR_CODE_WORD]: {
                color: fourWord,
              },
              [TypingHintStyleTypes.ONE_CHAR]: {
                color: "inherit",
              },
            };

            return {
              ...style[type],
              fontWeight: isBold ? "bold" : "initial",
            };
          }
          return {};
        }
        function weightCacheShow(item: IContrstCharObj) {
          if (item.hintObj) {
            const { uid, _flag_, type, weight } = item.hintObj;
            if (type === TypingHintStyleTypes.ONE_CHAR || weight === 0) {
              return false
            } else if (!hasRenderMap.has(_flag_)) {
              hasRenderMap.set(_flag_, uid);
              return true;
            } else if (hasRenderMap.get(_flag_) !== uid) {
              return false;
            } else {
              return true;
            }
          }
          return false;
        }
      })();
      onMounted(() => {
        listenContrstPageScroll();
        listenContentOrHintSwitchChange();
      });

      return {
        ...verifCorrect(),
        formatSpace,
        currentPageChars,
        seePlayTypingModelClass,
        wordHint,
      };

      // 监听源内容、词提开关的变化，如开，对照区则显示词提。如不开，提桶跑路
      function listenContentOrHintSwitchChange() {
        watch(
          [() => storeWordHint.getters.isOpen, () => refState.source.content],
          async ([isOpen, content]: [boolean, any]) => {
            if (isOpen) {
              const isUpdate = await storeWordHint.actions.updateHintContrst(
                content
              );
              if (isUpdate) {
                wordHint.hasRenderMap.clear();
                contrstChars.value = storeWordHint.getters.hintContrst;
              } else {
                Toast("啊哦，词提翻车车了");
              }
            } else {
              contrstChars.value = contrstCharObjs(content);
            }
          }
        );
      }
      // 监听对照区的翻页、滚动（输入框内容发生改变时触发）
      function listenContrstPageScroll() {
        const elContrst = document.getElementById("elContrst");
        if (elContrst) {
          watch(
            () => refState.haveInput,
            (newVal) => {
              const { startIndex, endIndex, turnSize } = pageScroll;
              const pageMaxHeight = elContrst.scrollHeight;
              // 输入的内容超过了20个字后再进行滚动
              // -30是为了滚动滚的更精准，一些偏差
              if (newVal.length - 20 > startIndex.value) {
                elContrst.scrollTop =
                  ((newVal.length - startIndex.value) /
                    currentPageChars.value.length) *
                    pageMaxHeight -
                  50;
              }

              // 当输入的长度小于或等于 当页结尾字数的时候进行跳页。。
              if (newVal.length >= endIndex.value - turnSize) {
                pageScroll.page.value++;
                elContrst.scrollTop = 0;
              }
            }
          );
        }
      }
      // 处理录入内容的正确性验证
      function verifCorrect() {
        watch(
          () => refState.haveInput,
          () => {
            // 遍历判断录入内容的正确性，不正确则将相应属性设置上状态
            contrstChars.value.forEach((o: IContrstCharObj, i: number) => {
              if (i < refState.haveInput.length) {
                o.haveInput = true;
                o.inputCorrect = o.text === refState.haveInput[i];
              } else {
                o.haveInput = false;
              }
            });
          }
        );
        // 筛选器：录入错误的css
        const inputCorrectClass = (obj: IContrstCharObj): string => {
          return obj.haveInput && !obj.inputCorrect
            ? "contrst-span__input-error"
            : "";
        };
        // 筛选器：录入正确的css
        const haveInputClass = (haveInput: boolean): string =>
          haveInput ? "contrst-span__have-input" : "";

        return {
          inputCorrectClass,
          haveInputClass,
        };
      }
      // 过滤空格内容
      function formatSpace(text: string) {
        return text === " " ? "　" : text;
      }
      // 转成对照区规定格式的，可供初始化转化与源数据内容变化时转化↓
      function contrstCharObjs(content: string): IContrstCharObj[] {
        return content.split("").map((v: string) => ({
          text: v,
          haveInput: false,
          inputCorrect: false,
        }));
      }
    })();

    return {
      ...renderContrst,
    };
  },
});
</script>
<style lang="scss" scoped>
$fontColor: #4b4747;
.contrst {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border-radius: 3px;
  background: var(--box-back-color);
  box-shadow: 0 3px 6px var(--box-shadow);
  color: $fontColor;
  font-size: 17px;
  letter-spacing: 0.5px;
  overflow: auto;
  div {
    box-sizing: border-box;
    padding-top: 14px;
    position: relative;
    span {
      position: absolute;
      font-size: 10px;
      bottom: -14px;
      transform: translate(-50%, 0%);
      left: 50%;
    }
  }
  .contrst-span__have-input {
    background: #beb2b2;
    color: $fontColor !important;
  }
  .contrst-span__input-error {
    color: #ff0000 !important;
  }
  &-see-play {
    .contrst-span__have-input {
      background: transparent;
    }
    .contrst-span__input-error {
      color: inherit;
    }
  }
}
</style>
