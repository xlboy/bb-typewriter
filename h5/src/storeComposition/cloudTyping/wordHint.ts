/**
 * @description 词提功能模块
 */

import { getDefaultWordHint, getQueryWordHint } from "@/api/bbPublic";
import useRequest from "@/hooks/useRequest";
import { computed, reactive, Ref, ref, toRef, watch } from "vue";
import store from "@/store/";
import { getUserWordHint } from "@/api/bbUser";

interface IWordHintObj {
    preceptName: string;
    id: number
}

interface IWordHintAll {
    default: IWordHintObj[],
    user: IWordHintObj[]
}

interface IWordHintState {
    userWordId: Ref<number>;
    defaultWord: IWordHintObj[],
}


const $store = store as any;

const state = reactive({
    userWordId: toRef($store.state.user, 'currentWordId') as Ref<number>,
    defaultWord: [] as IWordHintObj[],
    get list() {
        return 1
    }
} as IWordHintState)

const getters = {

}


const wordHint = {
    list: computed(() => {
        const userWordHintList = $store.state.user.wordHintList
        return {
            // default: defaultWord.value,
            user: userWordHintList
        }
    }),
    isOpen: ref(false), // 词提是否开启
    yardsLong: ref(false), // 文章码长
    hintContrst: ref([]), // 词提渲染数据格式
    currentSelectWordName: computed(() => {
        const wordId = 1 //userWordId.value
        const list = wordHint.list.value as IWordHintAll;
        // 用户当前选中的词提码表为“未登陆状态的0”或者是“登陆后没选中某个码表的null”
        if ([0, null].includes(1)) {
            return list.default?.[0]?.preceptName ?? '词库异常'
        }
        return [...list.default, ...list.user]
            .find((o: IWordHintObj) => o.id === wordId)?.preceptName ?? '词库异常'
    }),
    updateHintContrst(str: string) {
        if (this.isOpen.value) {
            useRequest(getQueryWordHint(str, 1), (result: any) => {
                const { llmc, wordAry, zjs } = result
                this.hintContrst.value = wordAry
                this.yardsLong.value = llmc
                console.log('zjs', zjs)
            })
        }
    }
}

// 当前用户状态发生了改变，则更新一次用户词库 
watch(() => $store.state.user.id, (newVal) => {
    if (newVal !== 0) {
        useRequest(getUserWordHint(newVal), (result: IWordHintObj[]) => {
            $store.commit('user/SET_USER_WORD_HINT_LIST', result)
        }, false)
    }
})
// 初始化请求一遍默认词库
useRequest(getDefaultWordHint(), (result: IWordHintObj[]) => {
    state.defaultWord = result
}, false)

export default wordHint