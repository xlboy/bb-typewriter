import { render, createVNode, ref } from "vue";
import LoadingConstructor from "./Loading.vue";
const show = ref(false)
const loadingVM = createVNode(LoadingConstructor, { show })
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