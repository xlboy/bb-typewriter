import { vantPlugins } from "@/plugins/vant";
import { Component, createApp } from "vue";

export function mountComponent(RootComponent: Component) {
    const app = createApp(RootComponent);
    app.use(vantPlugins)
    const root = document.createElement('div');

    document.body.appendChild(root);

    return {
        instance: app.mount(root),
        unmount() {
            app.unmount(root);
            document.body.removeChild(root);
        },
    };
}