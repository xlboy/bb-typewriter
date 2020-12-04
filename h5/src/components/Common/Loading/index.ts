import { render, createVNode } from "vue";
import LoadingConstructor, { show } from "./Loading.vue";

export default (() => {
    const loadingVM = createVNode(
        LoadingConstructor,
        {},
        null
    )
    const loadingEl = document.createElement("div")
    render(loadingVM, loadingEl);
    document.body.appendChild(loadingEl);
    return {
        show() {
            show.value = true
        },
        close() {
            show.value = false
        }
    }
})();