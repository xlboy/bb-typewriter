import { render, createVNode, VNode } from "vue";
import NumberInputConstructor from "./NumberInput.vue";
import TextInputConstructor from "./TextInput.vue";
import { app } from '@/main'
interface IInstance {
    instance: VNode,
    element: HTMLElement
}
interface IComponentType {
    number?: IInstance,
    text?: IInstance
}
type componentType = 'number' | 'text'
const confirmInputVM: IComponentType = {}
// 今晚得知了app抛出了.mount的玩法。。瞬间尴尬，等看完VNode patch相关的内容了，再看看有没有不错的优化方法
function loadVM(type: componentType, props: object): HTMLElement {
    function getInstance(type: componentType): IInstance {
        // 创建实例，如若创建过，则返回创建过的实例
        if (confirmInputVM[type]) {
            return confirmInputVM[type] as IInstance
        } else {
            // 未创建过，重新创建一遍并返回
            const component = type === 'number' ? NumberInputConstructor : TextInputConstructor
            const instance = createVNode(component)
            // 将全局安装的插件引置此VNode处，让其在patch的时候可以享受到全局安装的插件
            instance.appContext = app._context
            return (confirmInputVM[type] = {
                instance,
                element: document.createElement("div")
            })
        }
    }
    const { instance, element } = getInstance(type)
    instance.props = props
    render(instance, element);
    document.body.appendChild(element);
    return element
}


interface IConfirmNumber {
    label?: string
}
interface IConfirmText {
    label?: string
}
export default {
    number(params: IConfirmNumber = {}): Promise<any> {
        let element: HTMLElement
        return new Promise(r => {
            element = loadVM('number', {
                ...params,
                finishCall: r,
            })
        }).then(res => {
            document.body.removeChild(element)
            return res
        })
    },
    text(params: IConfirmText = {}): Promise<any> {
        let element: HTMLElement
        return new Promise(r => {
            element = loadVM('number', {
                ...params,
                finishCall: r,
            })
        }).then(res => {
            document.body.removeChild(element)
            return res
        })
    }
}