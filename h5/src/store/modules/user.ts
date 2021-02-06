import { getReadUserInfo, getUserWordHint, saveUserColorWord, saveUserCurrentWord, userLogin, userReg } from "@/api/bbUser";
import useRequest from "@/hooks/useRequest";
import { Module } from "vuex";
import _ from 'lodash'
import { Toast } from "vant";
import { IWordHintObj } from "@/storeComposition/cloudTyping/wordHint";
export interface IBBUserState {
  countSize: number;
  currentWordId: number;
  wordHintStyle: {
    fourC: string;
    fourWord: string;
    threeWord: string;
    twoWord: string
  },
  id: number;
  sign: string;
  qq: number;
  username: string;
  wordList: IWordHintObj[]
}
const $state: IBBUserState = {
  countSize: 0,
  currentWordId: 0,
  wordHintStyle: {
    fourC: 'rgba(152, 16, 221, 0.96)',
    fourWord: 'rgba(58, 216, 34, 0.73)',
    threeWord: 'rgba(24, 98, 209, 0.96)',
    twoWord: 'rgba(204, 22, 22, 0.96)'
  },
  id: 0,
  sign: '',
  qq: 52852983,
  username: '登陆/注册',
  wordList: []
};
export default {
  namespaced: true,
  state: _.cloneDeep($state),
  getters: {
    isLogin(state: IBBUserState) {
      return state.id !== 0
    },
    getWordsHintStyle(state: IBBUserState) {
      return state.wordHintStyle
    },
    getWordHintBase({ currentWordId, id, wordList }: IBBUserState) {
      /* 提供一个接口给词提模块返回牵扯的数据 */
      return { currentWordId, id, wordList }
    },
    currentWordId(state: IBBUserState) {
      return state.currentWordId
    }
  },
  mutations: {
    SET_WORD_HINT_STYLE(state: IBBUserState, wordHintStyle) {
      Object.assign(state.wordHintStyle, wordHintStyle)
    },
    SET_USER_BASE_INFO(state: IBBUserState, info) {
      Object.assign(state, info)
    },
    SET_USER_CURRENT_WORD_ID(state: IBBUserState, id) {
      state.currentWordId = id
    },
    SET_USER_COUNT_SIZE(state: IBBUserState, size) {
      state.countSize = size
    },
    RESET_STATE(state: IBBUserState) {
      Object.assign(state, _.cloneDeep($state))
    },
    SET_WORD_LIST(state: IBBUserState, wordList) {
      state.wordList = wordList
    }
  },
  actions: {
    // 登陆成功后的数据转换
    loginSuccessConvert({ commit }, result) {
      // 词提样式
      const { fourC, fourWord, threeWord, twoWord } = result
      commit('SET_WORD_HINT_STYLE', { fourC, fourWord, threeWord, twoWord })
      // 用户基本信息
      const { id, qq, sign, username } = result
      commit('SET_USER_BASE_INFO', { id, qq, sign, username })
      // 当前选中词提与目前已练字数
      const { currentWordId, countSize } = result
      commit('SET_USER_CURRENT_WORD_ID', currentWordId)
      commit('SET_USER_COUNT_SIZE', +countSize)
      localStorage.setItem('userId', id)
    },
    login({ dispatch }, { username = '', password = '' }): Promise<boolean> {
      return new Promise(r => {
        useRequest(userLogin(username, password), (result: any) => {
          if (result === '账号密码有误') {
            r(false)
          } else {
            dispatch('loginSuccessConvert', result)
            r(true)
          }
        })
      })
    },
    regAndLogin({ dispatch }, { username = '', password = '' }): Promise<boolean> {
      return new Promise(r => {
        useRequest(userReg(username, password), async (result: any) => {
          if (result === '存在此账号') {
            r(false)
          } else {
            const initResult = await dispatch('initUserInfo', result)
            if (initResult) {
              r(true)
            } else {
              const msg = '注册成功但自动登陆失败，请联系开发人员'
              Toast(msg)
              throw new Error(msg);
            }
          }
        })
      })
    },
    initUserInfo({ dispatch, state }, userId): Promise<boolean> {
      if (userId === void 0) {
        userId = state.id
      }
      return new Promise(r => {
        useRequest(getReadUserInfo(+userId), (result: any) => {
          if (result === '获取失败') {
            r(false)
          } else {
            dispatch('loginSuccessConvert', result)
            r(true)
          }
        })
      })
    },
    setCurrentWordId({ commit, state }, wordId): Promise<void> {
      return new Promise(r => {
        commit('SET_USER_CURRENT_WORD_ID', wordId)
        if (state.id !== void 0) {
          useRequest(saveUserCurrentWord(state.id, wordId), r)
        } else {
          r()
        }
      })
    },
    logout({ commit }) {
      localStorage.removeItem('userId')
      commit('RESET_STATE')
    },
    refreshUserWordList({ commit, state }): Promise<boolean> {
      return new Promise(r => {
        if (state.id !== 0) {
          useRequest(getUserWordHint(state.id), (result: IWordHintObj[]) => {
            commit('SET_WORD_LIST', result)
            r(true)
          }, false)
        } else {
          r(false)
        }
      })
    },
    refreshUserWordStyle({ state }): Promise<boolean> {
      return new Promise(r => {
        if (state.id !== 0) {
          const { twoWord, threeWord, fourWord, fourC } = state.wordHintStyle
          useRequest(saveUserColorWord(state.id, twoWord, threeWord, fourWord, fourC), (_: any) => {
            r(true)
          }, false)
        } else {
          r(false)
        }
      })
    },
  },
} as Module<IBBUserState, any>;