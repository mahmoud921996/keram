import { login, userInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import Cookies from "js-cookie";
import router from "@/router";
const userCookie = Cookies.get('user');

const user = {
  state: {
    token: getToken(),
    language: Cookies.get("language") || "en",
    user: userCookie ? JSON.parse(userCookie) : null,
    permissions: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      console.log(user)
      Cookies.set("user", JSON.stringify(user));
    },
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    }
  },
  actions: {
    Login({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then((response) => {
            console.log(response.data)
            const { data } = response.data;
            commit("SET_TOKEN", data.accessToken);
            dispatch("setBranch", data.branch)
            dispatch("GetUserInfo").then(() => {
            });
            resolve();
          })
          .catch((error) => {
            console.log(error)
            reject(error);
          });
      });
    },
    GetUserInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        userInfo()
          .then((res) => {
            const { data: user } = res.data;
            // dispatch("setPermissions", user);
            commit("SET_USER", user);
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setPermissions({ commit, dispatch }, { role }) {
      let permissions = role.permissions;
      // if role is super admin add all permissions 
      if (role.id === 0) {
        permissions.push({
          name: "roles",
          sub_permissions: [{ name: "view" }, { name: "create" }, { name: "edit" }, { name: "delete" }]
        })
      }
      commit("SET_PERMISSIONS", permissions);
      dispatch("setAllowedRoutes", role);
    },

    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        removeToken();
        Cookies.remove("user");
        Cookies.remove("branchId")
        commit("SET_PERMISSIONS", []);
        commit("SET_USER", null);

        return resolve();
      });
    },
    setUserInfo({ commit }, user) {
      commit("SET_USER", user);
    },
  },
  getters: {
    getPermissions(state) {
      return state.permissions;
    },
    getUser(state) {
      return state.user;
    },
  },
};

export default user;
