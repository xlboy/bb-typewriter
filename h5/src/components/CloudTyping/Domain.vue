<template>
  <div class="domain">
    <button class="domain-button waves-btn" @click="showLoadArticle">
      载文
    </button>
    <button class="domain-button waves-btn" @click="showPostArticle">
      发文
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
import { IActionSheet, loadArticle, postArticle } from "./model/actionSheet";
import {
  getGroupMatchArticle,
  getGroupLatestArticle,
} from "@/api/getGroupArticle";
import Notify from "@/utils/notify";
import { TypingSymbol } from "@/hooks/useTyping";
import typingGroup from "@/model/typingGroup";
import aSingleWord from "@/model/aSingleWord";
import chinesePhrase from "@/model/chinesePhrase";
import { shuffleArray } from "@/utils/utils";
import ConfirmInput from "../Common/ConfirmInput";
import SelectCustomize from "./components/SelectCustomize.vue";

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
          }
        } catch (error) {
          Notify.danger("出错啦，快联系开发人员呀" + error);
          throw new Error(error);
        }

        // 处理载文
        function onLoadArticle(name: string) {
          switch (name) {
            case "剪贴板":
              Notify.primary('功能正在开发中哦...')
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
              console.log("好好好，准备给他发自定义文章");
              selectCustomizeVisible.value = true;
              break;
            case "随机一文":
              console.log("好好好，准备随机一文，OK");
              break;
          }
        }
        // 处理发文：常用词组
        function onPostChinesePhrase(name: string) {
          ConfirmInput.number({ label: "练习字数" }).then((size: any) => {
            size = +size;
            const phraseContents: any[] = chinesePhrase[name];
            // 如若输入的练习字数超过源文件的字数，则将源文件字数进行扩展大于练习字数
            const phraseContentStr = phraseContents.join("");
            if (size > phraseContentStr.length) {
              const difference =
                ~~(size - phraseContentStr.length) / phraseContentStr.length;
              // 因为词组数组的原因，特殊处理，将相差数进行循环，再加入源文件至目标变量中
              for (let i = 0; i < difference; i++) {
                phraseContents.push(...phraseContents);
              }
            }
            typingMutations.SetSource({
              content: shuffleArray(phraseContents).join("").substr(0, size),
              index: 1,
            });
            Notify("载入成功，干它丫的吧");
          });
        }
        // 处理发文：单字
        function onPostASingleWord(name: string) {
          ConfirmInput.number({ label: "练习字数" }).then((size: any) => {
            size = +size;
            let wordContents: string[] = aSingleWord[name].split("");
            // 如若输入的练习字数超过源文件的字数，则将源文件字数进行扩展大于练习字数
            if (size > wordContents.length) {
              const difference =
                ~~(size - wordContents.length) / wordContents.length;
              wordContents = wordContents.concat(
                String(wordContents).repeat(difference).split("")
              );
            }
            typingMutations.SetSource({
              content: shuffleArray(wordContents).slice(0, size).join(""),
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
    return {
      actionSheet,
      showLoadArticle,
      showPostArticle,
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
