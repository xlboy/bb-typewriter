<template>
  <div class="setup">
    <van-cell title="个人中心" is-link @click="toMyInfo" />
    <van-cell title="清除缓存" is-link @click="clearCache">
      <template #right-icon>
        <van-icon name="failure" class="search-icon" />
      </template>
    </van-cell>
    <van-cell
      v-if="$store.getters['user/isLogin']"
      title="退出登陆"
      @click="onLogout"
    />
  </div>
</template>

<script lang="ts">
import Loading from "@/components/Common/Loading";
import useBaseLayout from "@/hooks/useBaseLayout";
import { Dialog, Toast } from "vant";
import { defineComponent, inject } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "AppSetup",
  setup() {
    const baseLayout = useBaseLayout();
    const $store = useStore();
    const AppSwitchSidebar = inject("AppSwitchSidebar") as any;
    baseLayout.setNavBar({
      title: "设置",
      rightVisible: false,
    });
    function clearCache() {
      // 这不欺骗？留着过年？
      Loading.show();
      setTimeout(() => {
        Loading.close();
        Toast("清除成功");
      }, Math.floor(Math.random() * 3000));
    }
    function onLogout() {
      Dialog.confirm({
        title: "提示",
        message: "确认退出当前账号？",
      }).then(() => {
        $store.dispatch("user/logout");
        Toast("退出成功");
        AppSwitchSidebar.openSidebar();
      });
    }
    function toMyInfo() {
      Toast('功能正在开发中..请耐心等待')
    }
    return {
      toMyInfo,
      onLogout,
      clearCache,
    };
  },
});
</script>

<style lang="less" scoped>
.setup {
  width: 100%;
  height: 100%;
  margin-top: 5px;
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
</style>
