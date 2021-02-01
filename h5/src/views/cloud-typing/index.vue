<template>
  <div class="typing">
    <!-- 实时速度 -->
    <div class="typing-speed">
      <SpeedTop />
    </div>
    <!-- 实时进度条 -->
    <div class="typing-progress">
      <div
        class="typing-progress-fill"
        :style="{ width: finishProgress + '%' }"
      ></div>
    </div>
    <!-- 对照区 -->
    <div class="typing-contrst">
      <ContrstMiddle />
    </div>
    <!-- 输入框 -->
    <div class="typing-input">
      <InputBox :id="typingInputId" />
    </div>
    <!-- 最近十条练习记录 -->
    <div class="typing-recent">
      <RecentResults />
    </div>
    <!-- 功能区 -->
    <div class="typing-domain">
      <Domain />
    </div>
  </div>
</template>

<script lang="ts">
import ContrstMiddle from "@/components/CloudTyping/ContrstMiddle.vue";
import InputBox from "@/components/CloudTyping/InputBox.vue";
import SpeedTop from "@/components/CloudTyping/SpeedTop.vue";
import RecentResults from "@/components/CloudTyping/RecentResults.vue";
import Domain from "@/components/CloudTyping/Domain.vue";

import { computed, defineComponent, provide } from "vue";
import useTyping, { TypingSymbol } from "@/hooks/useTyping";
import { ITypingResult } from "@/interface/ITyping";
import copyText from "@/utils/copyText";
import recentResults, {
  IRencentResult,
} from "@/storeComposition/cloudTyping/recentResults";
import { Toast } from "vant";
export default defineComponent({
  name: "CloudTyping",
  components: { SpeedTop, ContrstMiddle, InputBox, RecentResults, Domain },
  setup() {
    const typingInputId = "typing-input";

    const typing = useTyping("downKey", typingInputId);
    // 每练习完成一次的回调
    function finishTyping(result: ITypingResult) {
      // 将成绩复制到剪贴板中
      const keyName = {
        // #是占位符
        speed: "速度#",
        keystroke: "击键#",
        yardsLong: "码长#",
        totalTime: "耗时#s",
        backSpace: "退格#",
        backChange: "回改#",
        totalKey: "总键数#",
        totalCharSize: "总字数#",
      };
      const cIndex = (typing.refState as any).source?.index; // 当前练习段号
      let resultsStr = `第${cIndex}段 `;
      Object.entries(result).forEach(
        ([k, v]) =>
          keyName[k] && (resultsStr += `${keyName[k].replace("#", v)} `)
      );
      resultsStr += "@bb打字机1.0";
      Toast(resultsStr);
      copyText(resultsStr);

      // 更新最近十把成绩
      const resultObj: IRencentResult = {
        index: cIndex,
        speed: result.speed,
        keystroke: result.speed,
        yardsLong: result.yardsLong,
        totalTime: result.totalTime,
        backSpace: result.backSpace,
        backChange: result.backChange,
        errorNum: result.errorNum,
        totalKey: result.totalKey,
        totalCharSize: result.totalCharSize,
        insertTime:
          new Date()
            .toLocaleString()
            .match(/(?<=.{5})[\d/ :]+/g)
            ?.join("") ?? "",
      };
      recentResults.add(resultObj);
    }
    typing.mutations.AddFinishCallBack(finishTyping)
    const finishProgress = computed(() => {
      return typing.getters.getHasInputProgress.value;
    });
    provide(TypingSymbol, typing);
    return {
      typingInputId,
      finishProgress,
    };
  },
});
</script>

<style lang="scss" scoped>
.typing {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
  &-speed {
    width: 100%;
    height: 30px;
  }
  &-progress {
    width: 100%;
    height: 6px;
    overflow: hidden;
    border-radius: 100px;
    background: #f0f0f0;
    margin-top: 5px;
    &-fill {
      height: 100%;
      background: var(--theme-color);
      transition: all 0.7s;
    }
  }
  &-contrst {
    width: 100%;
    height: 190px;
  }
  &-input {
    width: 100%;
    height: 50px;
    margin-top: 7px;
  }
  &-recent {
    width: 100%;
    margin-top: 7px;
    height: 90px;
  }
  &-domain {
    width: 100%;
    height: auto;
    margin-top: 7px;
  }
}
</style>
