<template>
  <div class="center">
    <van-field
      v-model="wordHintSelect.state.currentSelect"
      is-link
      readonly
      label="当前词提"
      placeholder="请选择所在地区"
      @click="wordHintSelect.state.show = true"
    />
    <van-popup v-model:show="wordHintSelect.state.show" round position="bottom">
      <van-cascader
        v-model="wordHintSelect.state.select"
        title="请选择所在地区"
        :options="wordHintSelect.options.value"
        @close="wordHintSelect.state.show = false"
        @finish="wordHintSelect.onFinish"
      />
    </van-popup>
    {{ wordHintSelect.state.currentSelect }}
    {{ wordHintSelect.state.select }}
  </div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import wordHint, {
  IWordHintObj,
} from "@/storeComposition/cloudTyping/wordHint";
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "MyMaterial",
  setup() {
    const baseLayout = useBaseLayout();
    const $store = useStore();
    baseLayout.setNavBar({
      title: "个人中心",
      rightVisible: false,
    });
    // 词提选择功能块
    const wordHintSelect = (() => {
      const state = reactive({
        show: false,
        currentSelect: wordHint.getters.currentSelectWordName,
        select: "",
      });
      const options = computed(() => {
        const {
          user: userWord,
          default: defaultWord,
        } = wordHint.getters.allWordList;

        return [
          {
            text: "默认",
            value: 1,
            children: convertOption(defaultWord),
          },
          {
            text: "用户",
            value: 2,
            children: convertOption(userWord),
          },
        ];

        function convertOption(word: IWordHintObj[]) {
          return word.map(({ preceptName, id }) => ({
            text: preceptName,
            value: id,
          }));
        }
      });
      function onFinish({ selectedOptions }: any) {
        console.log(selectedOptions);
      }
      return {
        state,
        options,
        onFinish,
      };
    })();
    return {
      wordHintSelect,
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
