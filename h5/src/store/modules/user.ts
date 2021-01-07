import { getReadUserInfo, userLogin, userReg } from "@/api/bbUser";
import useRequest from "@/hooks/useRequest";
import { Module } from "vuex";
import _ from 'lodash'
import { Toast } from "vant";
export interface IBBUserState {
  countSize: number;
  currentWordId: number;
  wordHintList: Array<any>
  wordsHint: {
    fourC: string;
    fourWord: string;
    threeWord: string;
    twoWord: string
  },
  id: number;
  sign: string;
  qq: number;
  username: string
}
const $state: IBBUserState = {
  countSize: 0,
  currentWordId: 0,
  wordsHint: {
    fourC: '',
    fourWord: '',
    threeWord: '',
    twoWord: ''
  },
  id: 0,
  sign: '',
  qq: 52852983,
  wordHintList: [],
  username: '登陆/注册'
};
export default {
  namespaced: true,
  state: _.cloneDeep($state),
  getters: {
    isLogin(state: IBBUserState) {
      return state.id !== 0
    },
    baseInfo(state: IBBUserState) {
      const { sign, username, qq, id } = state;
      return { sign, username, qq, id };
    }
  },
  mutations: {
    SET_WORDS_HINT(state: IBBUserState, wordsHint) {
      Object.assign(state.wordsHint, wordsHint)
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
    SET_USER_WORD_HINT_LIST(state: IBBUserState, list) {
      state.wordHintList = list
    }
  },
  actions: {
    // 登陆成功后的数据转换
    loginSuccessConvert({ commit }, result) {
      // 词提样式
      const { fourC, fourWord, threeWord, twoWord } = result
      commit('SET_WORDS_HINT', { fourC, fourWord, threeWord, twoWord })
      // 用户基本信息
      const { id, qq, sign, username } = result
      commit('SET_USER_BASE_INFO', { id, qq, sign, username })
      // 当前选中词提与目前已练字数
      const { currentWordId, countSize } = result
      commit('SET_USER_CURRENT_WORD_ID', currentWordId)
      commit('SET_USER_COUNT_SIZE', +countSize)
      localStorage.setItem('userId', id)
    },
    async login({ dispatch }, { username = '', password = '' }): Promise<boolean> {
      return await new Promise(r => {
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
    async regAndLogin({ dispatch }, { username = '', password = '' }): Promise<boolean> {
      return await new Promise(r => {
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
    async initUserInfo({ dispatch, state }, userId): Promise<boolean> {
      if (userId === void 0) {
        userId = state.id
      }
      return await new Promise(r => {
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
    logout({ commit }) {
      localStorage.removeItem('userId')
      commit('RESET_STATE')
    }
  },
} as Module<IBBUserState, any>;