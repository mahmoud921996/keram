import cookie from "js-cookie";
export default {
  state: () => ({
    locale: cookie.get("language") || "en"
  }),

  mutations: {
    SET_LOCALE(state, locale) {
      state.locale = locale;
      console.log( state.locale)
    }
  },

  actions: {
    setLocale({ commit }, payload) {
      commit("SET_LOCALE", payload);
      console.log(payload)
    }
  },
  getters: {
    getLocale(state) {
      return state.locale;
    }
  }
};
