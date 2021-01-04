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
    label?: string,
    defaultVal?: string
}
interface IConfirmText {
    label?: string,
    defaultVal?: string
}

const confirmInstance: IComponentType = {}

function createInstance(type: componentType) {
    const { instance } = mountComponent({
        setup() {
            const usePopup = usePopupState();

            const confirmConstructor = (() => {
                const state = reactive({
                    props: {},
                    resolve() { }
                })
                const component = type === 'number' ? NumberInputConstructor : TextInputConstructor
                return {
                    render: () => (
                        <component {...state.props} onResolve={state.resolve} onClose={usePopup.close} />
                    ),
                    state
                };
            })();

            (getCurrentInstance() as any).render = () => (
                <Popup {...usePopup.state}>
                    {confirmConstructor.render()}
                </Popup>
            );

            return {
                open(props: IConfirmNumber | IConfirmText, resolve: Function) {
                    usePopup.open()
                    Object.assign(confirmConstructor.state, { props, resolve })
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
    number(props: IConfirmNumber = {}) {
        return new Promise(resolve => {
            const instance = getInstance('number');
            (instance as any).open(props, resolve);
        })
    },
    text(props: IConfirmText = {}) {
        return new Promise(resolve => {
            const instance = getInstance('text');
            (instance as any).open(props, resolve);
        })
    }
}