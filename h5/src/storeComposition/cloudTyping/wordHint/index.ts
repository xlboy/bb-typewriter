/**
 * @description 词提功能模块
 */

import { getDefaultWordHint, getQueryWordHint } from "@/api/bbPublic";
import useRequest from "@/hooks/useRequest";
import { computed, reactive, watch } from "vue";
import store from "@/store/";
import { getUserWordHint } from "@/api/bbUser";
import { IContrstCharObj } from "@/interface/ITyping";
import contrstRender from "./contrstRender";
export interface IWordHintObj {
    preceptName: string;
    id: number
}

interface IWordHintAll {
    default: IWordHintObj[],
    user: IWordHintObj[]
}

interface IWordHintState {
    defaultWord: IWordHintObj[];
    userWord: IWordHintObj[];
    isOpen: boolean;
    yardsLong: number;
    hintContrst: IContrstCharObj[]
}

const $store = store;

const userState = computed(() => $store.getters['user/getWordHintBase'] as {
    currentWordId: number | null;
    id: number;
})
const state = reactive({
    defaultWord: [], // 系统默认的词提码表列表
    userWord: [], // 用户的词提码表列表
    isOpen: false, // 是否打开词提
    yardsLong: 0, // 文章码长
    hintContrst: [], // 词提对照的数据
} as IWordHintState)

const getters = reactive({
    get allWordList(): IWordHintAll {
        return {
            user: state.userWord,
            default: state.defaultWord
        }
    },
    get currentSelectWordName(): string {
        const userWordid = userState.value.currentWordId
        // 用户当前选中的词提码表为“未登陆状态的0”或者是“登陆后没选中某个码表的null”
        if ([0, null].includes(userWordid)) {
            return state.defaultWord[0]?.preceptName ?? '无'
        }

        function findWord() {
            return [
                ...getters.allWordList.user,
                ...getters.allWordList.default
            ].find((o: IWordHintObj) => o.id === userWordid)?.preceptName ?? '无'
        }
        return findWord()
    },
    get hintContrst() {
        return state.hintContrst
    },
    get isOpen() {
        return state.isOpen
    }
})
const mutations = {
    SET_DEFAULT_WORD(word: IWordHintObj[]) {
        state.defaultWord = word
    },
    SET_USER_WORD(word: IWordHintObj[]) {
        state.userWord = word
    },
    SET_IS_OPEN(status: boolean) {
        state.isOpen = status
    },
    SET_YARDS_LONG(long: number) {
        state.yardsLong = long
    },
    SET_HINT_CONTRST(contrst: IContrstCharObj[]) {
        state.hintContrst = contrst
    }
}
const actions = {
    updateHintContrst(content: string): Promise<boolean> {
        return new Promise(r => {
            if (state.isOpen && content.length !== 0) {
                const currentWordId = userState.value.currentWordId || 1
                useRequest(
                    getQueryWordHint(
                        content,
                        currentWordId,
                        state.defaultWord.find(o => o.id === currentWordId) ? 'default' : 'user'
                    ), (result: any) => {
                        if (result.llmc) {
                            mutations.SET_HINT_CONTRST(contrstRender(result.wordAry))
                            mutations.SET_YARDS_LONG(result.llmc)
                            r(true)
                        } else {
                            r(false)
                        }
                    }, true)
            } else {
                r(false)
            }
        })
    }
}
function init() {
    getDefaultWord()
    listenUserStateChange()

    // 监听用户状态，发生改变则重新请求用户词库
    function listenUserStateChange() {
        function handleChange(userId: number) {
            if (userId !== 0) {
                useRequest(getUserWordHint(userId), (result: IWordHintObj[]) => {
                    mutations.SET_USER_WORD(result)
                }, false)
            }
        }
        watch(() => userState.value.id, handleChange, {
            immediate: true
        })
    }
    // 初始化请求一遍默认词库
    function getDefaultWord() {
        useRequest(getDefaultWordHint(), (result: IWordHintObj[]) => {
            mutations.SET_DEFAULT_WORD(result)
        }, false)
    }
}

init()

export default {
    getters,
    mutations,
    actions
}