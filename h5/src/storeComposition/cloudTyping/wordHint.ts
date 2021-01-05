/**
 * @description 词提功能模块
 */

import { getDefaultWordHint } from "@/api/bbPublic";
import useRequest from "@/hooks/useRequest";
import { computed, ref } from "vue";
import store from '@/store/'
const $store = store as any
console.log('$store', $store)
const defaultWordHintList = ref([])

useRequest(getDefaultWordHint(),(result: any) => {
    console.log('让我看看，这请求回来了个什么东西', result)
}, false)

export default {
    wordHints: computed(() => {
        // const userWordHintList = $store.state.user.wordHintList
        // return {
        //     default: defaultWordHintList.value,
        //     user: userWordHintList
        // }
    }),
    
}