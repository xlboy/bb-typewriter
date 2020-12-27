import { render, createVNode, VNodeProps } from "vue";
import NumberInputConstructor from "./NumberInput.vue";
import TextInputConstructor from "./TextInput.vue";
import { app } from '@/main'
let confirmInputVM
// 今晚得知了app抛出了.mount的玩法。。瞬间尴尬，等看完VNode patch相关的内容了，再看看有没有不错的优化方法
function createVM(type: 'number' | 'text', params: object) {
    confirmInputVM = createVNode(
        type === 'number' ? NumberInputConstructor : TextInputConstructor,
        params as VNodeProps
    )
    confirmInputVM.appContext = app._context
    const confirmInputEl = document.createElement("div")
    render(confirmInputVM, confirmInputEl);
    document.body.appendChild(confirmInputEl);
}

interface IConfirmNumber {
    label?: string
}
interface IConfirmText {
    label?: string
}
export default {
    number(params: IConfirmNumber = {}): Promise<any> {
        return new Promise(r => {
            createVM('number', {
                ...params,
                finishCall: r,
            })
        })
    },
    text(params: IConfirmText = {}): Promise<any> {
        return new Promise(r => {
            createVM('text', {
                ...params,
                finishCall: r,
            })
        })
    }
}