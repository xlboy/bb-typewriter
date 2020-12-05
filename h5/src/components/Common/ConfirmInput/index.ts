import { render, createVNode } from "vue";
import ConfirmInputConstructor, { show } from "./ConfirmInput.vue";

export default (() => {
    const confirmInputVM = createVNode(
        ConfirmInputConstructor,
        {},
        null
    )
    const confirmInputEl = document.createElement("div")
    render(confirmInputVM, confirmInputEl);
    document.body.appendChild(confirmInputEl);
    return {
        show() {
            show.value = true
        },
        close() {
            show.value = false
        }
    }
})();