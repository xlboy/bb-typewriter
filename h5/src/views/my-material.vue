<template>
  <div class="center">
    <van-field
      v-model="state.fieldValue"
      is-link
      readonly
      label="地区"
      placeholder="请选择所在地区"
      @click="state.show = true"
    />
    <van-popup v-model:show="state.show" round position="bottom">
      <van-cascader
        v-model="state.cascaderValue"
        title="请选择所在地区"
        :options="options"
        @close="state.show = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
// import wordHint from "@/storeComposition/cloudTyping/wordHint";
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "MyMaterial",
  setup() {
    const baseLayout = useBaseLayout();
    const $store = useStore();
    $store;
    baseLayout.setNavBar({
      title: "个人中心",
      rightVisible: false,
    });
    const state = reactive({
      show: false,
      fieldValue: "",
      cascaderValue: "",
    });
    // 选项列表，children 代表子选项，支持多级嵌套
    const options = [
      {
        text: "浙江省",
        value: "330000",
        children: [{ text: "杭州市", value: "330100" }],
      },
      {
        text: "江苏省",
        value: "320000",
        children: [{ text: "南京市", value: "320100" }],
      },
    ];
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }: any) => {
      state.show = false;
      console.log('selectedOptions', selectedOptions  )
      state.fieldValue = selectedOptions
        .map((option: any) => option.text)
        .join("/");
    };

    return {
      state,
      options,
      onFinish,
    };
  },
});
</script>

<style lang="less" scoped>
.center {
  width: 100%;
  height: 100%;
  margin-top: 5px;
}
</style>
