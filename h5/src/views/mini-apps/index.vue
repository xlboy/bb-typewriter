<template>
  <div class="mini-apps">
    <van-grid :column-num="2">
      <van-grid-item
        v-for="(item, index) in miniApps"
        :key="index"
        :icon="vanIcons[~~(Math.random() * vanIcons.length - 1)]"
        :text="item"
        @click="toMiniApp"
      />
    </van-grid>
  </div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import { defineComponent } from "vue";
import vanIcons from "@/model/vanIcons";
import { Toast } from "vant";
export default defineComponent({
  name: "MiniApps",
  setup() {
    const baseLayout = useBaseLayout();
    baseLayout.setNavBar({
      title: "小程序大厅",
      rightVisible: false,
    });
    const miniApps = [
      "单字练习小游戏",
      "小鹤双拼键位练习",
      "小鹤音形字根练习",
      "手指触屏精准度练习小游戏",
      "词提在线云计算",
      "去除空格换行工具",
      "在线计算器",
      "天气预告",
      "富婆通讯录",
    ];
    function toMiniApp() {
      Toast('作者正在马不停蹄开发中..')
    }
    return {
      vanIcons,
      miniApps,
      toMiniApp
    };
  },
});
</script>

<style lang="less" scoped>
.mini-apps {
  width: 100%;
  height: 100%;
}
</style>
