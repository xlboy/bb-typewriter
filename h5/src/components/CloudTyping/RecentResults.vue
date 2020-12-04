<template >
  <ul class="recent" :class="{ 'empty-data': resultsList.length === 0 }">
    <li v-for="(item, index) in resultsList" :key="index">
      <span class="index">第{{ item.index }}段</span>
      <span>{{ item.speed }}</span>
      <!-- <span>0</span>
      <span>0</span> -->
      <span>{{ item.totalCharSize }}字</span>
      <span>错{{ item.errorNum }}</span>
      <span>{{ item.totalTime }}s</span>
      <span class="date">{{ item.insertTime }}</span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import recentResults from "./hooks/recentResults";
export default defineComponent({
  name: "RecentResults",
  setup() {
    recentResults.updateResults();  
    return {
      resultsList: recentResults.resultsList,
    };
  },
});
</script>
<style lang="scss" scoped>
.empty-data {
  background: url("../../assets/images/bg-empty.png") no-repeat center center;
  background-size: auto 80%;
  background-color: #f5f5f6;
}
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
      &.index{
        min-width: 100px;
      }
      &.date {
        min-width: 130px;
        justify-content: flex-start;
      }
    }
  }
}
</style>
