<template>
  <ul class="recent">
    <li>
      <span>第1段</span>
      <span>100.00</span>
      <span>0</span>
      <span>0</span>
      <span>381字</span>
      <span>错0</span>
      <span>2.101s</span>
      <span class="date">10/1 20:11:41</span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RecentResults",
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.recent {
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 6px var(--box-shadow);
  overflow: auto;
  > li {
    display: flex;
    height: 30px;
    > span {
      flex: 1;
      font-size: 16px;
      display: flex;
      color: var(--theme-color);
      border-bottom: 1px solid var(--theme-color);
      align-items: center;
      justify-content: center;
      min-width: 70px;
      padding: 2px;
      box-sizing: border-box;
      text-align: center;
      &:nth-child(2n) {
        color: var(--theme-color);
        background-color: var(--box-shadow);
      }
      &.date{
        min-width: 130px;
      }
    }
  }
}
</style>
