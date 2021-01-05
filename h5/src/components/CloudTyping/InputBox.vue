<template>
  <div class="input">
    <textarea v-model="refState.haveInput" :id="inputId" placeholder="点我进行录入练习吧!"></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
import { TypingSymbol } from "@/hooks/useTyping";
export default defineComponent({
  name: "InputBox",
  props: {
    inputId: {
      type: String,
      default: "typing-input"
    }
  },
  setup(props) {
    const { refState }: any = inject(TypingSymbol);
    return {
      ...props,
      refState
    };
  }
});
</script>
<style lang="scss" scoped>
.input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  textarea {
    padding: 5px;
    box-sizing: border-box;
    outline: none;
    border: 0px;
    width: 100%;
    height: 100%;
    box-shadow: 0 3px 6px var(--box-shadow);
    background: var(--box-back-color);
    color: #333;
    resize: none;
    font-size: 17px;
  }
}
</style>
