<template>
  <transition name="van-fade">
    <van-dialog
      v-model:show="show"
      title="输入内容"
      show-cancel-button
      @confirm="onConfirm"
    >
      <van-field
        class="main-content"
        v-model="val"
        rows="7"
        label="内容"
        type="textarea"
        maxlength="20000"
        placeholder="请输入内容"
        show-word-limit
      />
    </van-dialog>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ConfirmTextInput",
  props: {
    finishCall: {
      type: Function,
      required: true,
    }
  },
  setup(props) {
    const show = ref(true);
    const val = ref("");

    function onConfirm() {
      show.value = false;
      props.finishCall(val.value);
    }
    return {
      show,
      val,
      onConfirm
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
