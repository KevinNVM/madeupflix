import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";

import Vue3VideoPlayer from "@cloudgeek/vue3-video-player";
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";

const app = createApp(App);

app.use(router);
app.use(Vue3VideoPlayer);

app.mount("#app");

// createApp(App).use(router).mount("#app");
