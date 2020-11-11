<template>
  <div class="contrst">
    <span
      v-for="(item, index) in contrstCharArr"
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
import { defineComponent, inject, reactive, watch } from "vue";
export default defineComponent({
  name: "ContrstMiddle",
  setup() {
    const { refState }: any = inject(TypingSymbol);

    // 处理渲染对照区
    const renderContrst = (() => {
      // 判断对错，进行处理
      const { content } = refState.source;
      const contrstCharArr: IContrstCharObj[] = reactive(
        content.split("").map((v: any) => ({
          text: v,
          haveInput: false,
          inputCorrect: false
        }))
      );

      watch(
        () => refState.haveInput,
        () => {
          contrstCharArr.forEach((o: IContrstCharObj, i: number) => {
            if (i < refState.haveInput.length) {
              o.haveInput = true;
              o.inputCorrect = o.text === refState.haveInput[i];
            } else {
                o.haveInput = false;
            }
          });
        }
      );

      const inputCorrectClass = (obj: IContrstCharObj): string => {
        return obj.haveInput && !obj.inputCorrect
          ? "contrst-span__input-error"
          : "";
      };
      const haveInputClass = (is: boolean): string =>
        is ? "contrst-span__have-input" : "";

      return {
        contrstCharArr,
        inputCorrectClass,
        haveInputClass
      };
    })();
    return {
      ...renderContrst
    };
  }
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
