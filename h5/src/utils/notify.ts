import { Notify as notifyDefault } from "vant";
const Notify = function (message: string) {
    notifyDefault({ type: 'success', message })
}
Notify.primary = function (message: string) {
    notifyDefault({ type: 'primary', message });
}
Notify.warning = function (message: string) {
    notifyDefault({ type: 'warning', message });
}
Notify.danger = function (message: string) {
    notifyDefault({ type: 'danger', message });
}
export default Notify