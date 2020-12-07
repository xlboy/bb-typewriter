<template>
  <van-popup
    v-model:show="show"
    closeable
    close-icon="close"
    position="top"
    :style="{ height: '30%' }"
  >
    <van-field v-model="digit" type="digit" :label="inputLabel" />
    <!-- <van-button round type="primary">确定</van-button> -->
  </van-popup>
  <van-number-keyboard
    v-model="inputVal"
    :show="show"
    title="数字键盘"
    close-button-text="完成"
    @hide="closeInput"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ConfirmNumberInput",
  props: {
    inputLabel: {
      type: String,
      default: "标签",
    },
    finishCall: {
      type: Function,
      default: () => 1,
    },
  },
  setup(props) {
    const show = ref(true);
    const inputVal = ref("");
    function closeInput() {
      show.value = false;
      props.finishCall();
    }
    return { show, inputVal, closeInput };
  },
});
</script>
<style lang="scss" scoped>
.confirm {
  left: 0;
  top: 0;
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
