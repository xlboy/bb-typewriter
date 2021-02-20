<template>
  <div class="main">
    <div class="result-list">
      <li v-for="(item, index) in currentList.data" :key="index">
        <span class="index">第{{ item.index }}段</span>
        <span>{{ item.speed }}</span>
        <span>{{ item.totalCharSize }}字</span>
        <span>错{{ item.errorNum }}</span>
        <span>{{ item.totalTime }}s</span>
        <span class="date">{{ item.insertTime }}</span>
        <span class="operate">
          <van-tag @click="deleteResult(item)">删除</van-tag>
          <van-tag
            type="warning"
            style="margin-left: 5px"
            @click="copyResult(item)"
            >复制</van-tag
          >
        </span>
      </li>
    </div>
    <van-pagination
      v-model="currentPage"
      :page-count="currentList.countPage"
      mode="simple"
    />
  </div>
</template>
<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import recentResults, {
  IRencentResult,
} from "@/storeComposition/cloudTyping/recentResults";
import { Toast } from "vant";
import { computed, defineComponent, ref } from "vue";
import resultComposite from "@/utils/typing/resultComposite";
import copyText from "@/utils/copyText";
import { Dialog } from "vant";

export default defineComponent({
  name: "RecentResults",
  setup() {
    const baseLayout = useBaseLayout();

    // 设置标题
    baseLayout.setNavBar({
      title: "跟打记录",
      rightVisible: true,
    });

    const pageSize = 15;
    const currentPage = ref(1);
    const currentList = computed(() => {
      const { data, countPage } = recentResults.findPage(
        currentPage.value - 1,
        pageSize
      );
      return { data, countPage };
    });

    function copyResult(result: IRencentResult) {
      const resultStr = resultComposite(result, result.index);
      copyText(resultStr);
      Toast("复制成功");
    }

    function deleteResult(result: IRencentResult) {
      if (result.id) {
        const resultStr = resultComposite(result, result.index);
        Dialog.confirm({
          message: `确认删除此成绩？\n${resultStr}`,
        }).then(() => {
          recentResults.delete(result.id!);
          Toast('删除成功')
        });
      } else {
        Toast("删除失败…此练习数据为旧版本所留，不可删，请移步至 设置->清除缓存");
      }
    }
    return {
      currentPage,
      currentList,
      deleteResult,
      copyResult,
    };
  },
});
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .pagination {
    width: 100%;
  }
  .result-list {
    width: 100%;
    flex: 1;
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
        &.index {
          min-width: 100px;
        }
        &.date {
          min-width: 130px;
          justify-content: flex-start;
        }
        &.operate {
          min-width: 100px;
        }
      }
    }
  }
}
</style>
