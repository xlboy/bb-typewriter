<template>
  <van-popup
    class="word-color"
    closeable
    close-icon="close"
    @clickOverlay="closePopup"
    @clickCloseIcon="closePopup"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <van-divider dashed style="margin-top: 0px" content-position="left">
      二码
    </van-divider>
    <div class="color-picker">
      <ElColorPicker
        v-model="wordHintStyle.twoWord"
        show-alpha
        :predefine="predefineColors"
      />
    </div>
    <van-divider dashed style="margin-top: 0px" content-position="left">
      三码
    </van-divider>
    <div class="color-picker">
      <ElColorPicker
        v-model="wordHintStyle.threeWord"
        show-alpha
        :predefine="predefineColors"
      />
    </div>
    <van-divider dashed style="margin-top: 0px" content-position="left">
      四码
    </van-divider>
    <div class="color-picker">
      <ElColorPicker
        v-model="wordHintStyle.fourWord"
        show-alpha
        :predefine="predefineColors"
      />
    </div>
    <van-divider dashed style="margin-top: 0px" content-position="left">
      >=四字词
    </van-divider>
    <div class="color-picker">
      <ElColorPicker
        v-model="wordHintStyle.fourC"
        show-alpha
        :predefine="predefineColors"
      />
    </div>
  </van-popup>
</template>
<script lang="ts">
import Notify from "@/utils/notify";
import { ElColorPicker } from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { computed, defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";
const predefineColors = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
];
export default defineComponent({
  name: "WordHintColor",
  emits: ["update:show"],
  components: { ElColorPicker },
  data() {
    return {
      predefineColors,
    };
  },
  setup(props, { emit }) {
    const $store = useStore();
    function closePopup() {
      emit("update:show", false);
    }
    const userWordHintStyle = computed(
      () => $store.getters["user/getWordsHintStyle"]
    );
    const wordHintStyle = reactive({
      twoWord: userWordHintStyle.value.twoWord,
      threeWord: userWordHintStyle.value.threeWord,
      fourWord: userWordHintStyle.value.fourWord,
      fourC: userWordHintStyle.value.fourC,
    });
    watch(
      () => wordHintStyle,
      async (newVal) => {
        $store.commit('user/SET_WORD_HINT_STYLE', { ...newVal })
        const result = await $store.dispatch('user/refreshUserWordStyle')
        if (result) Notify('更改成功，已同步至云账号')
        else Notify.warning('更改成功，尚未登陆账号，此次更改仅本地临时有效')
      },
      { deep: true }
    );
    return {
      closePopup,
      wordHintStyle,
    };
  },
});
</script>
<style lang="scss">
.word-color {
  box-sizing: border-box;
  padding-top: 45px;
  .color-picker {
    box-sizing: border-box;
    padding-left: 50px;
    padding-bottom: 20px;
  }
}
</style>