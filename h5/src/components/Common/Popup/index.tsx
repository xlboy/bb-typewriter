import { defineComponent, reactive } from "vue";
import './index.scss';

export function usePopupState() {
    const state = reactive({
        show: false,
    });

    function toggle(show = true) {
        state.show = show
    }

    function close() {
        toggle(false);
    }
    function open() {
        toggle(true)
    }
    return {
        open,
        close,
        state,
    };
}

export default defineComponent({
    props: {
        show: Boolean
    },
    setup(props, { slots }) {
        return () => {
            return (
                <div class="popup" v-show={props.show}>
                    {slots?.default?.()}
                </div>
            );
        }
    }
})