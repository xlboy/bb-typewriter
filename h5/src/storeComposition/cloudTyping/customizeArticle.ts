import LocalStore from '@/utils/localStore'
import Notify from '@/utils/notify';
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
    list: ref([]),
    find(id: number): { index: number, content: ICustomizeArticle } {
        const index = this.list.value.findIndex((o: ICustomizeArticle) => o.id === id);
        if (index !== -1) {
            return { index, content: this.list.value[index] }
        } else {
            const msg = `自定义文章模块有误，请联系开发者\nid:${id}`
            Notify.danger(msg)
            throw new Error(msg);
        }
    },
    initData() {
        store.initStore()
        this.list.value = store.toArray().slice(0, 10) as never
    },
    add(customizeArticle: ICustomizeArticle) {
        this.list.value.unshift(customizeArticle as never)
        store.writeJson(this.list.value)
    },
    update(id: number, customizeArticle: ICustomizeArticle) {
        const { index } = this.find(id);
        (this.list.value[index] as ICustomizeArticle) = customizeArticle
        store.writeJson(this.list.value)
    },
    updateCurrentIndex(id: number, addSize: number) {
        const { content: customizeArticle } = this.find(id);
        customizeArticle.currentIndex += addSize
        if (customizeArticle.currentIndex > customizeArticle.content.length) {
            customizeArticle.currentIndex = customizeArticle.content.length
        }
        store.writeJson(this.list.value)
    },
    resetCurrentIndex(id: number) {
        const { content: customizeArticle } = this.find(id);
        customizeArticle.currentIndex = 0
        store.writeJson(this.list.value)
    },
    delete(id: number) {
        const { index } = this.find(id)
        this.list.value.splice(index, 1)
        store.writeJson(this.list.value)
    }
}