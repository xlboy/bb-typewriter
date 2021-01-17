<template>
  <van-popup
    class="hint-analysis"
    closeable
    close-icon="close"
    @clickOverlay="closePopup"
    @clickCloseIcon="closePopup"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <van-collapse v-model="activeNames">
      <van-collapse-item
        v-for="(hintObj, index) in hintAnalysis"
        :key="index"
        :title="hintObj.typeName"
        :name="hintObj.typeName"
      >
        <van-tag
          v-for="(word, _index) in hintObj.words"
          :key="_index"
          mark
          style="margin-right: 5px;"
          type="primary"
        >
          {{ word }}
        </van-tag>
      </van-collapse-item>
    </van-collapse>
  </van-popup>
</template>
<script lang="ts">
import storeWordHint from "@/storeComposition/cloudTyping/wordHint";
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "WordHintAnalysis",
  emits: ["update:show"],
  setup(props, { emit }) {
    function closePopup() {
      emit("update:show", false);
    }
    return {
      closePopup,
      activeNames: ref(['']),
      hintAnalysis: computed(() => storeWordHint.getters.hintAnalysis),
    };
  },
});
</script>
<style lang="scss">
.hint-analysis {
  box-sizing: border-box;
  padding-top: 45px;
}
</style>
