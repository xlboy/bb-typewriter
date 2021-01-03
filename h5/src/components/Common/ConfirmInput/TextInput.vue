<template>
  <van-dialog
    v-model:show="show"
    :title="label"
    show-cancel-button
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <van-field
      v-model="val"
      rows="7"
      label="内容"
      type="textarea"
      maxlength="20000"
      placeholder="请输入内容"
      show-word-limit
    />
  </van-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "ConfirmTextInput",
  props: {
    label: {
      type: String,
      default: "标签",
    },
  },
  emits: ["close", "resolve"],
  setup(props, { emit }) {
    const val = ref("");

    function closeReset() {
      val.value = "";
      emit("close");
    }
    function onConfirm() {
      emit("resolve", val.value);
      closeReset();
    }
    function onCancel() {
      closeReset();
    }
    return {
      show: true,
      val,
      onCancel,
      onConfirm,
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
