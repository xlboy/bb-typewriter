<template>
  <div class="loading" v-show="show">
    <img
      src="../../../assets/images/gif-loading.gif"
      class="loading-img"
      alt=""
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Loading",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return { ...props };
  },
});
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100vh;
  position: fixed;
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
