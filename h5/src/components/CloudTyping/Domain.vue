<template>
  <div class="domain">
    <button class="domain-button" @click="showLoadArticle">载文</button>
    <button class="domain-button" @click="showPostArticle">发文</button>
  </div>
  <van-action-sheet
    v-model:show="actionSheet.data.show"
    :actions="actionSheet.data.actions"
    @select="actionSheet.onSelect"
    cancel-text="取消"
  />
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { IActionSheet, loadArticle, postArticle } from "./model/actionSheet";
export default defineComponent({
  name: "Domain",
  setup() {
    // 下拉面板的功能区
    const actionSheet = (() => {
      const data = reactive({
        show: false,
        actions: [],
      });

      return {
        data,
        onSelect,
        setActions,
      };

      // 动作面板选择后的回调
      function onSelect(action: IActionSheet) {
        if (action.children) {
          setActions(action.children);
        } else {
          handleSelectType(action.type, action.name);
          data.show = false;
        }
      }
      // 抛出去的设置动作面板数据函数
      function setActions(actions: IActionSheet[]) {
        console.log("actions", actions);
        data.actions = actions as never;
      }
      // 处理选择动作面板后的分类回调匹配
      function handleSelectType(type: string, name: string) {
        switch (type) {
          case "loadArticle":
            onLoadArticle(name);
            break;
          case "loadGroupArticle":
            onLoadGroupArticle(name);
            break;
          case "postArticle":
            onPostArticle(name);
            break;
          
          case "postWords":
            onPostWords(name);
            break;
        }
        // 处理载文
        function onLoadArticle(name: string) {
          switch (name) {
            case "剪贴板":
              console.log("进行剪贴板内容读取");
              break;
          }
        }
        // 处理群载文，param name is group nme
        function onLoadGroupArticle(name: string) {
          console.log("要进行群载文咯");
        }
        // 处理发文：随机一文/自定义等等
        function onPostArticle(name: string) {
          switch (name) {
            case '自定义文章':
              console.log('好好好，准备给他发自定义文章')
              break;
            case '随机一文':
              console.log('好好好，准备随机一文，OK')
              break;
          }
        }
        // 处理发文：单字
        function onPostWords(name: string) {
          console.log('打单字啦，看看这家伙要打啥单字--->>', name)
        }
      }
    })();

    // 载文
    function showLoadArticle() {
      actionSheet.setActions(loadArticle);
      actionSheet.data.show = true;
    }
    // 发文
    function showPostArticle() {
      actionSheet.setActions(postArticle);
      actionSheet.data.show = true;
    }
    return {
      actionSheet,
      showLoadArticle,
      showPostArticle
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
    margin-right: 7px;
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
