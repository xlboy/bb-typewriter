<template>
  <transition name="van-fade">
    <div class="confirm" v-if="show">
      <van-popup
        v-model:show="show"
        closeable
        close-icon="close"
        position="top"
        style="display: flex; align-items: center"
        :style="{ height: '30%' }"
        :overlay="false"
      >
        <van-field v-model="inputVal" type="digit" :label="inputLabel" />
      </van-popup>
      <van-number-keyboard
        v-model="inputVal"
        :show="show"
        title="数字键盘"
        :extra-key="['00']"
        close-button-text="完成"
        @close="closeInput"
      />
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ConfirmNumberInput",
  setup() {
    const show = ref(true);
    const inputVal = ref("");
    const inputLabel = ref("标签");
    let hideCall: Function;

    async function showInput(label = "标签") {
      show.value = true;
      inputVal.value = "";
      inputLabel.value = label;
      return new Promise((r) => (hideCall = r));
    }
    function closeInput() {
      show.value = false;
      hideCall?.(inputVal.value);
    }
    return { show, inputVal, inputLabel, closeInput, showInput };
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
