<template>
  <div class="contrst" id="elContrst">
    <span
      v-for="(item, index) in currentPageChars"
      :key="index"
      :class="[inputCorrectClass(item), haveInputClass(item.haveInput)]"
    >
      {{ item.text }}
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
  toRefs,
  watch,
} from "vue";
export default defineComponent({
  name: "ContrstMiddle",
  setup() {
    const { refState }: any = inject(TypingSymbol);

    // 处理渲染对照区
    const renderContrst = (() => {
      const { content } = refState.source;
      // 练习内容的源数据，记载练习时的状态
      const contrstChars: IContrstCharObj[] = reactive(
        content.split("").map((v: any) => ({
          text: v,
          haveInput: false,
          inputCorrect: false,
        }))
      );
      const pageScroll = (() => {
        const state = reactive({
          page: 1, // 当前页数
          size: 50, // 每页字数
          turnSize: 5, // 提前多少个字进行预翻页
        });
        // 每页开始的索引位置
        const startSize = computed(
          () =>
            state.page * state.size -
            state.size -
            (state.page * state.turnSize - state.turnSize)
        );
        return {
          ...toRefs(state),
          startSize,
        };
      })();

      // 当前页的字符数据，给予模板进行渲染
      const currentPageChars = computed(() => {
        const { startSize, size } = pageScroll;
        const end = startSize.value + size.value;
        return contrstChars.slice(startSize.value, end);
      });
      onMounted(() => {
        contrstPageScroll();
      });
      return {
        ...verifCorrect(),
        currentPageChars,
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
              const { startSize: pageStartSize } = pageScroll;
              const pageMaxHeight = elContrst.scrollHeight;
              // 输入的内容超过了二十个字后再进行滚动
              // -30是为了滚动滚的更精准，一些偏差
              if (newVal.length - 20 > pageStartSize.value) {
                elContrst.scrollTop =
                  ((newVal.length - pageStartSize.value) /
                    currentPageChars.value.length) *
                    pageMaxHeight -
                  30;
              }

              // 当前页结尾的索引位置大小
              const endSize =
                pageStartSize.value +
                pageScroll.size.value -
                pageScroll.turnSize.value;
              // 当输入的长度小于或等于 当页结尾字数的时候进行跳页。。
              if (newVal.length >= endSize) {
                pageScroll.page.value++;
              } 
            }
          );
        }
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
}
</style>
