<template>
  <div class="domain">
    <button class="domain-button" @click="getArticle">载文</button>
  </div>
  <van-action-sheet
    v-model:show="actionSheet.show.value"
    :actions="actionSheet.actions"
    @select="actionSheet.onSelect"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "Domain",
  setup() {
    // 下拉面板的功能区
    const actionSheet = (() => {
      const show = ref(false);
      const actions = [
        {
          name: "one",
        },
        {
          name: "two",
        }
      ];
      function onSelect(item: any) {
        console.log("item", item);
      }
      
      return {
        show,
        actions,
        onSelect,
      };
    })();
    
    // 载文
    function getArticle() {
      actionSheet.show.value = true;
    }

    return {
      actionSheet,
      getArticle,
    };
  },
});
</script>
<style lang="scss" scoped>
.domain {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 5px;
  &-button {
    font-size: 14px;
    box-sizing: border-box;
    letter-spacing: 1px;
    border: 0px;
    position: relative;
    outline: none;
    border: 2px solid var(--theme-color);
    color: var(--theme-color);
    background: transparent;
    transition: all 0.3s;
    padding: 5px 10px;
    border-radius: 100px;
    filter: opacity(50%);
    overflow: hidden;
    &:after {
      width: 100%;
      padding-top: 100%;
      background: transparent;
      border-radius: 50%;
      content: "";
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
    }
    @keyframes btnAnm {
      from {
        transform: translate(-50%, -50%) scale(0);
        background: rgba(0, 0, 0, 0.45);
      }
      to {
        transform: translate(-50%, -50%) scale(1);
        background: transparent;
      }
    }
    &:hover {
      &:after {
        animation: btnAnm 0.7s;
      }
    }
  }
}
</style>
