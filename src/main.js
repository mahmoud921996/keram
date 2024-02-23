import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "@/lang";
import "./plugins/vee-validate";
import "./plugins/vue-notification"
import "./plugins/vue-toasted"
import "./bootstrap";
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
