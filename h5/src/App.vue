<template>
  <router-view v-slot="{ Component }" class="app-router">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <iframe src="http://bb.xlboy.cn" class="app-iframe"></iframe>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      includeRoutes: [],
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss">
/* @import url("https://fonts.font.im/css?family=PT+Sans"); */
* {
  padding: 0;
  margin: 0;
}
body {
  /* font-family: "PT Sans", sans-serif !important; */
}
.app-iframe {
  display: none;
}
@media screen and (min-width: 500px) {
  .app-router {
    display: none;
  }
  .app-iframe {
    width: 400px;
    height: 700px;
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    display: block;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
