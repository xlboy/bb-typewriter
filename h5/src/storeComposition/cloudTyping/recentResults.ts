import LocalStore from '@/utils/localStore'
import { ref } from 'vue'

/**
 * @description 最近练习的成绩，在本地存储里
 */
export interface IRencentResult {
    index: number; // 段号
    speed: number; // 速度
    keystroke: number; // 击键
    yardsLong: number; // 码长
    totalTime: number; // 总耗时长
    backSpace: number; // 退格
    backChange: number; // 回改
    totalKey: number; // 总键数
    totalCharSize: number; // 总字数
    errorNum: number; // 错误字数
    insertTime: string; // 插入时间
}
const store = new LocalStore('bb-recentResults')
export default {
    initData() {
        store.initStore()
        this.list.value = store.toArray().slice(0, 10) as never
    },
    add(result: IRencentResult) {
        this.list.value.unshift(result as never)
        store.writeJson(this.list.value)
    },
    list: ref([])
}