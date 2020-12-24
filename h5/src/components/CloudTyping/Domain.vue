<template>
  <div class="domain">
    <button class="domain-button waves-btn" @click="showLoadArticle">
      载文
    </button>
    <button class="domain-button waves-btn" @click="showPostArticle">
      发文
    </button>
    <button class="domain-button waves-btn" @click="showTypingModel">
      模式
    </button>
  </div>
  <van-action-sheet
    v-model:show="actionSheet.data.show"
    :actions="actionSheet.data.actions"
    @select="actionSheet.onSelect"
    cancel-text="取消"
  />
  <SelectCustomize v-model:show="selectCustomizeVisible" />
</template>
<script lang="ts">
import useRequest from "@/hooks/useRequest";
import { defineComponent, inject, reactive, ref } from "vue";
import {
  IActionSheet,
  loadArticle,
  postArticle,
  typingModel,
} from "./model/actionSheet";
import {
  getGroupMatchArticle,
  getGroupLatestArticle,
} from "@/api/qqGroupArticle";
import Notify from "@/utils/notify";
import { TypingSymbol } from "@/hooks/useTyping";
import typingGroup from "@/model/typingGroup";
import ConfirmInput from "../Common/ConfirmInput";
import SelectCustomize from "./components/SelectCustomize.vue";
import typingContent from "@/utils/typingContent";

export default defineComponent({
  name: "Domain",
  components: { SelectCustomize },
  setup() {
    const { mutations: typingMutations }: any = inject(TypingSymbol);
    const selectCustomizeVisible = ref(false);
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
        data.actions = actions as never;
      }
      // 处理选择动作面板后的分类回调匹配
      function handleSelectType(type: string, name: string) {
        try {
          switch (type) {
            case "loadArticle":
              onLoadArticle(name);
              break;
            case "loadGroupMatchArticle":
              onLoadGroupMatchArticle(name);
              break;
            case "loadGroupLatestArticle":
              onLoadGroupLatestArticle(name);
              break;
            case "postChinesePhrase":
              onPostChinesePhrase(name);
              break;
            case "postASingleWord":
              onPostASingleWord(name);
              break;
            case "postArticle":
              onPostArticle(name);
              break;
            case "typingModel":
              onTypingModel(name);
              break;
          }
        } catch (error) {
          Notify.danger("出错啦，快联系开发人员呀" + error);
          throw new Error(error);
        }

        // 模式切换
        function onTypingModel(name: string) {
          data.actions.forEach((e: IActionSheet) => (e.disabled = false));
          const action: any = data.actions.find(
            (e: IActionSheet) => e.name === name
          );
          action.disabled = true;
          typingMutations.SetTypingModel(name);
        }
        // 处理载文
        function onLoadArticle(name: string) {
          switch (name) {
            case "剪贴板":
              Notify.primary("功能正在开发中哦...");
              break;
          }
        }
        // 处理群载文，param name is group nme
        function onLoadGroupLatestArticle(name: string) {
          // 群号
          const guid: number =
            typingGroup.find((o) => o.name === name)?.guid ?? 522394334;
          // 请求老谭的接口，取到实时的文章内容并赋上
          useRequest(getGroupLatestArticle(guid), function (result: any) {
            if (result.code === 200) {
              const { content, id } = result.result;
              typingMutations.SetTypingType("群载文");
              typingMutations.SetSource({
                content,
                index: id,
              });
              Notify("载入成功，干它丫的吧");
            } else Notify("获取实时文章失败，请稍后重试");
          });
        }
        // 处理群赛文，param name is group nme
        function onLoadGroupMatchArticle(name: string) {
          // 群号
          const guid: number =
            typingGroup.find((o) => o.name === name)?.guid ?? 522394334;
          // 请求小拆的接口，取到文章内容并赋上
          useRequest(getGroupMatchArticle(guid), function (result: any) {
            if (result.code === 0) {
              const [data] = result?.data?.data;
              if (data) {
                typingMutations.SetTypingType("群赛文");
                typingMutations.SetSource({
                  content: data.content,
                  index: data.number,
                });
                Notify("载入成功，干它丫的吧");
              } else Notify("此群今日无赛文，请换群尝试");
            }
          });
        }
        // 处理发文：随机一文/自定义等等
        function onPostArticle(name: string) {
          switch (name) {
            case "自定义文章":
              selectCustomizeVisible.value = true;
              break;
            case "随机一文":
              Notify("随机一文功能正在努力开发中...");
              break;
          }
        }
        // 处理发文：常用词组
        function onPostChinesePhrase(name: string) {
          ConfirmInput.number({ label: "练习字数" }).then((size: any) => {
            typingMutations.SetTypingType("词组", { size, name });
            typingMutations.SetSource({
              content: typingContent.phrase(name, +size),
              index: 1,
            });
            Notify("载入成功，干它丫的吧");
          });
        }
        // 处理发文：单字
        function onPostASingleWord(name: string) {
          ConfirmInput.number({ label: "练习字数" }).then((size: any) => {
            typingMutations.SetTypingType("单字", { size, name });
            typingMutations.SetSource({
              content: typingContent.word(name, +size),
              index: 1,
            });
            Notify("载入成功，干它丫的吧");
          });
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
    // 跟打模式选择
    function showTypingModel() {
      actionSheet.setActions(typingModel);
      actionSheet.data.show = true;
    }
    return {
      actionSheet,
      showLoadArticle,
      showPostArticle,
      showTypingModel,
      selectCustomizeVisible,
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
  }
}
</style>
