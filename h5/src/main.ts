import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { vantPlugins } from "./plugins/vant";
// import Bmob, { globalPlugins } from "./plugins/global";
import "./assets/style/reset.scss";
import "./assets/style/global.less";
import "./utils/theme";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';

// import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
// app.config.globalProperties.$bmob = Bmob;
app
  .use(store)
  .use(router)
  // .use(globalPlugins)
  // .use(vantPlugins)
  .mount("#app");
