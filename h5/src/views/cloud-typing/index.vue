<template>
  <div class="typing">
    <!-- 实时速度 -->
    <div class="typing-speed">
      <SpeedTop />
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

import { defineComponent, provide } from "vue";
import useTyping, { TypingSymbol } from "@/hooks/useTyping";
import { ITypingResult } from "@/interface/ITyping";
import copyText from "@/utils/copyText";
import recentResults, {
  IRencentResult,
} from "@/components/CloudTyping/hooks/recentResults";
export default defineComponent({
  name: "CloudTyping",
  components: { SpeedTop, ContrstMiddle, InputBox, RecentResults, Domain },
  setup() {
    const typingInputId = "typing-input";

    const typing = useTyping(
      // 每练习完成一次的回调
      function (result: ITypingResult) {
        // 将成绩复制到剪贴板中
        const keyName: any = {
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
        recentResults.initData();
        
      },
      "downKey",
      typingInputId
    );

    provide(TypingSymbol, typing);
    return {
      typingInputId,
    };
  },
});
</script>

<style lang="less" scoped>
.typing {
  width: 100%;
  height: 100%;
  .typing-speed {
    width: 100%;
    height: 30px;
  }
  .typing-contrst {
    width: 100%;
    height: 150px;
    margin-top: 5px;
  }
  .typing-input {
    width: 100%;
    height: 50px;
    margin-top: 7px;
  }
  .typing-recent {
    width: 100%;
    margin-top: 7px;
    height: 90px;
  }
  .typing-domain {
    width: 100%;
    height: auto;
    margin-top: 7px;
  }
}
</style>
