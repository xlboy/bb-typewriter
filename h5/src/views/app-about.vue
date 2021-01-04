<template>
  <div class="about">
    <van-divider content-position="left">介绍</van-divider>
    <div class="van-multi-ellipsis--l3 about-p">
      一款基于Vue3.0 +
      TypeScript的Webapp移动端打字练习软件，为五笔、音形文字录入爱好者而生的打字机。
    </div>
    <van-divider content-position="left">项目地址</van-divider>
    <div class="van-multi-ellipsis--l3 about-p">
      <a href="https://github.com/xlboy/BBTypewriter"
        >https://github.com/xlboy/BBTypewriter</a
      >
    </div>
    <van-divider content-position="left">基本功能</van-divider>
    <div class="about-p">
      <van-tag mark type="primary" size="medium">看打模式</van-tag>
      <van-tag mark type="primary" size="medium">跟打模式</van-tag><br />
      <van-tag mark type="primary" size="medium">剪贴板内容</van-tag>
      <van-tag mark type="primary" size="medium">自定义文章</van-tag><br />
      <van-tag mark type="primary" size="medium">网络群载文</van-tag>
      <van-tag mark type="primary" size="medium">每日群赛文</van-tag><br />
      <van-tag mark type="primary" size="medium">内置单字</van-tag>
      <van-tag mark type="primary" size="medium">内置词组</van-tag><br />
      <van-tag mark type="primary" size="medium">练习记录</van-tag><br />
      <van-tag mark type="primary" size="medium">智能词语提示</van-tag><br />
    </div>
    <van-divider content-position="left">打个分再走呗</van-divider>
    <div class="about-p">
      <van-rate
        v-model="appStar"
        :size="25"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
    </div>
  </div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import { Toast } from "vant";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "AppAbout",
  setup() {
    const baseLayout = useBaseLayout();
    baseLayout.setNavBar({
      title: "关于应用",
      rightVisible: false,
    });

    const appStar = ref(0);
    watch(
      () => appStar.value,
      (newVal) => {
        const results = [
          "打一分，我真的是谢谢你哦",
          "打个两分，我真的是好感谢你哦",
          "谢谢你的鼓励，我会再接再厉的呢",
          "打四分，跟谁俩呢",
          "五分？联系作者获取富婆联系方式",
        ];
        Toast(results[newVal - 1]);
      }
    );
    return {
      appStar,
    };
  },
});
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  &-p {
    box-sizing: border-box;
    padding: 0px 10px;
    color: #5f5f5f;
    .van-tag {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
