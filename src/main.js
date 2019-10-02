import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "babel-polyfill";
import store from "./store";
import * as VueThreejs from "vue-threejs";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueThreejs);

new Vue({
  router,
  store,
  // VueThreejs,
  vuetify,
  render: h => h(App)
}).$mount("#app");
