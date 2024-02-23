import { $http } from "@/api";
import Vue from "vue";
const vm = new Vue();
export default {
  state: () => ({
    items: [],
    pagination: {
      currentPage: 1,
      totalPages: 0,
      pageSize: 0,
      totalCount: 0,
    },
  }),
  mutations: {
    RESET_TABLE_ITEMS(state) {
      state.items = [];
      state.pagination = {
        currentPage: 1,
        totalPages: 0,
        pageSize: 0,
        totalCount: 0,
      };
    },
    SET_TABLE_ITEMS(state, items) {
      state.items = items;
    },
    SET_TABLE_ITEM(state, { index, item }) {
      const newItem = { ...state.items[index], ...item };
      vm.$set(state.items, index, newItem);
    },
    SET_TABLE_DEPARTMENTS(state, departments) {
      state.departments = departments;
    },
    SET_TABLE_PAGINATION(state, meta) {
      state.pagination = { ...state.pagination, ...meta };
    },
    DELETE_TABLE_ITEM(state, id) {
      state.items = state.items.filter((item) => item.id !== id);
    },
    RESET_PAGINATION(state) {
      state.pagination = {
        currentPage: 1,
        totalPages: 0,
        pageSize: 0,
        totalCount: 0,
      };
    },
  },
  actions: {
    async getTableItems({ commit, rootState }, { reqName, selectedKey, paginated = true }) {
      return $http
        .get({
          reqName,
          query: {
            ...rootState.query.query
          },
        })
        .then((res) => {
          const { data, meta } = res.data;
          if (!paginated) {

            commit("SET_TABLE_ITEMS", [data]);
          } else {

            commit("SET_TABLE_ITEMS", data);
          }

          if (selectedKey) {
            commit("SET_TABLE_ITEMS", data[selectedKey]);
          }
          if (meta) {
            commit("SET_TABLE_PAGINATION", meta);
          }
        }).catch(error => {
          console.log(error)
        })
    },
    async deleteTableItem({ commit }, { reqName, id }) {
      return $http
        .delete({
          reqName: `${reqName}`,
        })
        .then(() => {
          commit("DELETE_TABLE_ITEM", id);
        });
    },
    resetPagination({ commit }) {
      commit("RESET_PAGINATION");
    },
    resetTableItems({ commit }) {
      commit('RESET_TABLE_ITEMS')
    }
  },
  getters: {
    getsTableItems(state) {
      return state.items;
    },
    getDepartments(state) {
      return state.departments;
    },
    getPagination(state) {
      return state.pagination;
    },
  },
};
