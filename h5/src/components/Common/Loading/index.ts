import { render, createVNode } from "vue";
import LoadingConstructor, { show } from "./Loading.vue";
const loadingVM = createVNode(LoadingConstructor)
const loadingEl = document.createElement("div")
render(loadingVM, loadingEl);
document.body.appendChild(loadingEl);
export default {
    show() {
        show.value = true
    },
    close() {
        show.value = false
    }
}