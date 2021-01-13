<template>
  <div class="center">
    <van-field
      v-model="wordHintSelect.state.currentSelect"
      is-link
      readonly
      label="词提码表"
      placeholder="词提选择"
      @click="wordHintSelect.state.show = true"
    />
    <van-popup v-model:show="wordHintSelect.state.show" round position="bottom">
      <van-cascader
        v-model="wordHintSelect.state.select"
        title="请选择词提码表"
        :options="wordHintSelect.options.value"
        @close="wordHintSelect.state.show = false"
        @finish="wordHintSelect.onFinish"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import storeWordHint, {
  IWordHintObj,
} from "@/storeComposition/cloudTyping/wordHint/";
import { Toast } from "vant";
import { defineComponent, reactive, computed, toRef } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "RallySetup",
  setup() {
    const baseLayout = useBaseLayout();
    const $store = useStore();
    baseLayout.setNavBar({
      title: "跟打设置",
      rightVisible: false,
    });
    // 词提选择功能块
    const wordHintSelect = (() => {
      const state = reactive({
        show: false,
        currentSelect: toRef(storeWordHint.getters, "currentSelectWordName"),
        select: $store.getters["user/currentWordId"], // 此处单向一波
      });
      const options = computed(() => {
        const {
          user: userWord,
          default: defaultWord,
        } = storeWordHint.getters.allWordList;

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

      async function onFinish({ selectedOptions }: any) {
        const [, wordId] = selectedOptions;
        await $store.dispatch("user/setCurrentWordId", wordId.value);
        Toast("更换成功");
        state.show = false;
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
