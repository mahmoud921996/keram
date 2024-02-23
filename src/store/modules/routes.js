import { asyncRoutes } from "@/router/asyncRoutes";
import router from "@/router";
export default {
  state: () => ({
    routes: [],
  }),
  mutations: {
    SET_ROUTES(state, payload) {
      state.routes = payload;
    },
    SET_CREATE_PERMISSION(state, payload) {
      state.hasCreatePermission = payload;
    },
    SET_EDIT_PERMISSION(state, payload) {
      state.hasEditPermission = payload;
    },
    SET_DELETE_PERMISSION(state, payload) {
      state.hasDeletePermission = payload;
    },

  },
  actions: {
    setAllowedRoutes({ commit }, { permissions }) {
      const allowedPermissions = asyncRoutes.filter((route) => {
        return permissions.some((permission) => {
          return permission.sub_permissions.some((subPermission) => {
            return route.meta.permissions === (permission.name.replaceAll(/[/ ]+/g, "-")).toLowerCase() && subPermission.name.includes("view");
          });

        });
      });
      commit("SET_ROUTES", allowedPermissions);
    },
  },
  getters: {
    getRoutes(state) {
      return asyncRoutes;
    },
  }
};