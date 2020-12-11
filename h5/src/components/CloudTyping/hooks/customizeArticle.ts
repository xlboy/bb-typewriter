import LocalStore from '@/utils/localStore'
import { ref } from 'vue'

/**
 * @description 最近练习的成绩，在本地存储里
 */
export interface ICustomizeArticle {
    id: number; // 索引
    title: string;
    content: string; // 内容
    currentIndex: number; // 当前跟打至的长度
}
const store = new LocalStore('bb-customizeArticle')
export default {
    initData() {
        store.initStore()
        this.list.value = store.toArray().slice(0, 10) as never
    },
    add(customizeArticle: ICustomizeArticle) {
        this.list.value.unshift(customizeArticle as never)
        store.writeJson(this.list.value)
    },
    updateCurrentIndex(id: number, addSize: number) {
        const customizeArticle: any = this.list.value.find((o: any) => o.id === id)
        customizeArticle && (customizeArticle.currentIndex += addSize) && store.writeJson(this.list.value)
    },
    delete(id: number) {
        const index = this.list.value.findIndex((o: any) => o.id === id)
        if (index !== void 0) {
            this.list.value.splice(index, 1)
            store.writeJson(this.list.value)
        }
    },
    list: ref([])
}