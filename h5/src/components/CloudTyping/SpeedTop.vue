<template>
  <div class="speed">
    <div class="speed-tag">第{{ refState.source.index }}段</div>
    <div class="speed-tag">{{ getSpeed }}</div>
    <div class="speed-tag">{{ getKeystroke }}</div>
    <div class="speed-tag">{{ getYardsLong }}</div>
  </div>
</template>
<script lang="ts">
import { TypingSymbol } from "@/hooks/useTyping";
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "SpeedTop",
  setup() {
    const { getters, refState }: any = inject(TypingSymbol);
    const { getSpeed, getKeystroke, getYardsLong } = getters;
    return {
      getSpeed,
      getKeystroke,
      getYardsLong,
      refState
    };
  }
});
</script>
<style lang="scss" scoped>
.speed {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .speed-tag {
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
