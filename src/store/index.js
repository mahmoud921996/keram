import Vue from "vue";
import Vuex from "vuex";
import errors from "./modules/errors";
import notification from "./modules/notification";
import user from "./modules/user";
import query from "./modules/query";
import routes from "./modules/routes";
import tables from "./modules/tables";
import locale from "./modules/locale";
import branch from "./modules/branch";


import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: false,
  modules: {
    errors,
    notification,
    user,
    query,
    routes,
    tables,
    locale,
    branch
  },
  getters: getters
});
