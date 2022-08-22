import vuetify from "./plugins/vuetify";

import initPlugins from "./plugins";
import Vue from 'vue'

import router from "./router/index";
import App from './App.vue'

import store from './store';


export const eventBus = new Vue();

const app = {
  router,
  store,
  vuetify,
  render: h => h(App)
};

initPlugins(app);

new Vue(app).$mount("#app");
