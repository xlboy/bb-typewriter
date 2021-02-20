import LocalStore from '@/utils/localStore'
import { Toast } from 'vant'
import { ref } from 'vue'

/**
 * @description 最近练习的成绩，在本地存储里
 */
export interface IRencentResult {
    id?: number;
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

const recentResults = {
    initData() {
        store.initStore()
        this.list.value = store.toArray()
    },
    add(result: IRencentResult) {
        result.id = parseInt(String(Math.random() * 1E8))
        this.list.value.unshift(result)
        store.writeJson(this.list.value)
    },
    delete(id: number) {
        const index = this.list.value.findIndex(item => item.id === id)
        if (index !== undefined) {
            this.list.value.splice(index, 1)
            store.writeJson(this.list.value)
        }
    },
    list: ref([] as IRencentResult[]),
    findPage(startPage: number, size: number) {
        const list = this.list.value
        const countPage = ~~(list.length / size) + 1
        return {
            data: getData(),
            countPage
        }
        function getData() {
            const startIndex = startPage * size
            const result = list.slice(
                startIndex,
                startIndex + size)
            return result
        }
    }
}

recentResults.initData()

export default recentResults