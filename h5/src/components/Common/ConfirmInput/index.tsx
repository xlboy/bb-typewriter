import { ComponentPublicInstance, getCurrentInstance, reactive } from "vue";
import NumberInputConstructor from "./NumberInput.vue";
import TextInputConstructor from "./TextInput.vue";
import { mountComponent } from "@/utils/mountComponent";
import Popup, { usePopupState } from "../Popup";

interface IComponentType {
    number?: ComponentPublicInstance,
    text?: ComponentPublicInstance
}

type componentType = 'number' | 'text'

interface IConfirmNumber {
    label?: string
}
interface IConfirmText {
    label?: string
}

const confirmInstance: IComponentType = {}

function createInstance(type: componentType) {
    const { instance } = mountComponent({
        setup() {
            const component = type === 'number' ? NumberInputConstructor : TextInputConstructor
            const { state, close, open } = usePopupState();
            const confirm = {
                params: reactive({
                    resolve(size: number) { console.log(size) }
                }),
                resolve(size: number) { console.log(size) }
            };
            (getCurrentInstance() as any).render = () => (
                <Popup {...state}>
                    <component {...confirm.params} onResolve={confirm.params.resolve} onClose={close} />
                </Popup>
            );
            return {
                open(params: IConfirmNumber | IConfirmText, resolve: Function) {
                    open()
                    Object.assign(confirm, resolve)
                    Object.assign(confirm.params, params)
                }
            }
        }
    })
    return instance
}
function getInstance(type: componentType) {
    // 返回实例，如实例未创建，则创建并赋值再进行返回
    return confirmInstance[type] || (confirmInstance[type] = createInstance(type))
}

export default {
    number(params: IConfirmNumber = {}) {
        return new Promise(r => {
            const instance = getInstance('number');
            (instance as any).open({
                ...params,
                resolve(size: string) {
                    console.log('是，收到', size)
                    r(size)
                }
            });
        })
    }
}