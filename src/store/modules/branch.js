import cookie from "js-cookie";
import { decreptBranch } from "@/api/login"
export default {
  state: () => ({
    branchId: cookie.get("branchId") || "",
    currentBranch: parseInt(cookie.get("currentBranch")) || ""
  }),
  mutations: {
    SET_BRANCH(state, payload) {
      state.branchId = payload;
      cookie.set("branchId", payload)
    },
    SET_CURRENT_BRANCH(state, payload) {
      state.currentBranch = payload
      cookie.set("currentBranch", payload)
    }
  },

  actions: {
    setBranch({ commit, dispatch }, payload) {
      commit("SET_BRANCH", payload);
      cookie.set("branchId", payload)
      dispatch("decreptBranch", payload)

    },
    decreptBranch({ commit }, payload) {
      const formData = new FormData();
      formData.append("", payload);
      decreptBranch(payload).then(({ data: response }) => {
        commit("SET_CURRENT_BRANCH", response.data)
      })
    }
  },
  getters: {
    getBranch(state) {
      return state.branchId;
    },
    getCurrentBranch(state) {
      return state.currentBranch
    }
  }
}


