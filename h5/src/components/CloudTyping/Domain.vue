<template>
  <div class="domain">
    这特么是功能区
    <Button label="Submit" />
  </div>
</template>
<script lang="ts">
import Button from 'primevue/button';
import { defineComponent } from "vue";
export default defineComponent({
  name: "Domain",
  components: { Button },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.domain {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
