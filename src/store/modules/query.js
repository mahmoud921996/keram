export default {
  state: () => ({
    query: {
    }
  }),

  mutations: {
    SET_QUERY(state, query) {
      state.query = { ...query };
    },
    REMOVE_QUERY(state, payload = {}) {
      state.query = payload;
    }
  },

  actions: {
    removeQuery({ commit }, payload) {
      commit("REMOVE_QUERY", payload);
    },
    setQuery({ commit }, payload) {
      commit("SET_QUERY", payload);
    }
  },
  getters: {
    getQuery(state) {
      return state.query;
    }
  }
};
