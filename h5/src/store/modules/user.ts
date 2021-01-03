import { userLogin } from "@/api/bbUser";
import useRequest from "@/hooks/useRequest";
import { StoreOptions } from "vuex";

interface IBBUserState {
  countSize: number;
  currentWordId: number;
  wordsHint: {
    fourC: string;
    fourWord: string;
    threeWord: string;
    twoWord: string
  },
  id: number;
  sign: string;
  qq: number
}
const state: IBBUserState = {
  countSize: 0,
  currentWordId: 0,
  wordsHint: {
    fourC: '',
    fourWord: '',
    threeWord: '',
    twoWord: ''
  },
  id: 0,
  sign: '这个人很懒，什么都没有留下',
  qq: 52852983
};
export default {
  namespaced: true,
  state,
  actions: {
    async login(store, { username = '', password = '' }): Promise<string> {
      return await new Promise(r => {
        useRequest(userLogin(username, password), (result: any) => {
          console.log('result', result)
          r('')
        })
      })
    },
    async regAndLogin(store, { username = '', password = '' }): Promise<string> {
      if (!username || !password) {
        return '账号或密码不可为空'
      }
      return await new Promise(r => {
        useRequest(userLogin(username, password), (result: any) => {
          console.log('result', result)
          r('')
        })
      })
    }
  },
} as StoreOptions<IBBUserState>;