<template>
  <div class="typing">
    <div class="typing-speed">
      <SpeedTop />
    </div>
    <div class="typing-contrst">
      <ContrstMiddle />
    </div>
    <div class="typing-input">
      <InputBox :id="typingInputId" />
    </div>
  </div>
</template>

<script lang="ts">
import ContrstMiddle from "@/components/CloudTyping/ContrstMiddle.vue";
import InputBox from "@/components/CloudTyping/InputBox.vue";
import SpeedTop from "@/components/CloudTyping/SpeedTop.vue";
import { defineComponent, provide } from "vue";
import useTyping, { TypingSymbol } from "@/hooks/useTyping";
export default defineComponent({
  name: "CloudTyping",
  components: { SpeedTop, ContrstMiddle, InputBox },
  setup() {
    // 每练习完成一次的回调
    const typingInputId = "typing-input";
    function finishCallback() {
      console.log("是是是，完成了完成了");
    }

    provide(
      TypingSymbol,
      useTyping(finishCallback, "downKey", typingInputId)
    );
    return {
      typingInputId
    };
  }
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
}
</style>
