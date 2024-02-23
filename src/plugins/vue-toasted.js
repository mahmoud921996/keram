import Toasted from "vue-toasted";
import Vue from "vue";
Vue.use(Toasted, {
  position: "top-center",
  className: "toasted-style",
  duration: 5000,
  action: {
    text: false,
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
});
