import { render, createVNode, VNodeProps } from "vue";
import NumberInputConstructor from "./NumberInput.vue";
import TextInputConstructor from "./TextInput.vue";

function createVM(type: 'number' | 'text', params: object) {
    const confirmInputVM = createVNode(
        type === 'number' ? NumberInputConstructor : TextInputConstructor,
        params as VNodeProps,
        null
    )
    const confirmInputEl = document.createElement("div")
    render(confirmInputVM, confirmInputEl);
    document.body.appendChild(confirmInputEl);
}

interface IConfirmNumber {
    label?: string
}

export default {
    number: (params: IConfirmNumber = {}) => {
        const finishCall = new Promise(r => {
            createVM('number', {
                ...params,
                finishCall: r,
            })
        })
        return finishCall
    }
}