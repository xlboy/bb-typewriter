<template>
  <transition name="van-fade">
    <div class="confirm">
      <van-popup
        v-model:show="show"
        closeable
        close-icon="close"
        position="top"
        style="display: flex; align-items: center"
        :style="{ height: '30%' }"
        :overlay="false"
      >
        <van-field v-model="val" type="digit" :label="label" />
      </van-popup>
      <van-number-keyboard
        v-model="val"
        :show="show"
        title="数字键盘"
        close-button-text="完成"
        @close="closeInput"
      />
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
export default defineComponent({
  name: "ConfirmNumberInput",
  props: {
    label: {
      type: String,
      default: "标签",
    },
  },
  emits: ["close", "resolve"],
  setup(props, { emit }) {
    const val = ref("");
    function closeInput() {
      emit("resolve", val.value);
      val.value = "";
      emit("close");
    }
    return {
      val,
      show: ref(true), // 无意义的show
      closeInput,
    };
  },
});
</script>
<style lang="scss" scoped>
.confirm {
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  &-img {
    width: 120px;
    height: 120px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
}
</style>
