<template>
  <div class="contrst" :class="[seePlayTypingModelClass]" id="elContrst">
    <span
      v-for="(item, index) in currentPageChars"
      :key="index"
      :class="[inputCorrectClass(item), haveInputClass(item.haveInput)]"
    >
      {{ formatSpace(item.text) }}
    </span>
  </div>
</template>
<script lang="ts">
import { TypingSymbol } from "@/hooks/useTyping";
import { IContrstCharObj } from "@/interface/ITyping";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
export default defineComponent({
  name: "ContrstMiddle",
  setup() {
    const { refState } = inject(TypingSymbol) as any;

    // 处理渲染对照区
    const renderContrst = (() => {
      // 练习内容的源数据，记载练习时的状态
      const contrstChars: IContrstCharObj[] = reactive([
        ...toContrstCharObjs(refState.source.content),
      ]);
      // 转成对照区规定格式的，可供初始化转化与源数据内容变化时转化↓
      function toContrstCharObjs(content: string): IContrstCharObj[] {
        return content.split("").map((v: any) => ({
          text: v,
          haveInput: false,
          inputCorrect: false,
        }));
      }
      watch(
        () => refState.source.content,
        (newVal) => {
          while (contrstChars.shift()) {}
          Object.assign(contrstChars, toContrstCharObjs(newVal));
        }
      );

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
        return contrstChars.slice(startIndex.value, endIndex.value);
      });
      onMounted(() => {
        contrstPageScroll();
      });
      // 所处模式,是否为看打模式,若是,则不显示对与错
      const seePlayTypingModelClass = computed(() => {
        return refState.typingModel === "看打模式" ? "contrst-see-play" : "";
      });
      return {
        formatSpace,
        ...verifCorrect(),
        currentPageChars,
        seePlayTypingModelClass,
      };

      // 处理录入内容的正确性验证
      function verifCorrect() {
        watch(
          () => refState.haveInput,
          () => {
            // 遍历判断录入内容的正确性，不正确则将相应属性设置上状态
            contrstChars.forEach((o: IContrstCharObj, i: number) => {
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
        const haveInputClass = (is: boolean): string =>
          is ? "contrst-span__have-input" : "";

        return {
          inputCorrectClass,
          haveInputClass,
        };
      }
      // 对照区的翻页、滚动（输入框内容发生改变时触发）
      function contrstPageScroll() {
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
                  40;
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
      // 过滤空格内容
      function formatSpace(text: string) {
        return text === " " ? "　" : text;
      }
    })();

    return {
      ...renderContrst,
    };
  },
});
</script>
<style lang="scss" scoped>
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
  color: #4b4747;
  font-size: 17px;
  letter-spacing: 0.5px;
  overflow: auto;
  span {
    box-sizing: border-box;
    padding: 4px 0;
  }
  .contrst-span__have-input {
    background: #beb2b2;
  }
  .contrst-span__input-error {
    color: #ff0000;
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
