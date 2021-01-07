import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { vantPlugins } from "./plugins/vant";
// import Bmob, { globalPlugins } from "./plugins/global";
import "./assets/style/reset.scss";
import "./assets/style/global.scss";
import "./utils/theme";


export const app = createApp(App);
app.config.globalProperties.$bmob = 123;
app
  .use(store)
  .use(router)
  // .use(globalPlugins)
  .use(vantPlugins)
  .mount("#app");
