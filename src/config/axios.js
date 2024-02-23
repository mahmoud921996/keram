import axios from "axios";
import store from "@/store";
import { baseURL } from "@/config/baseUrl";
import { getToken, removeToken } from "@/utils/auth";
import router from "../router";

import cookie from "js-cookie";
import Vue from "vue";

// create an axios instance
const service = axios.create({
  timeout: 60000, // request timeout
  baseURL: 'http://keramv2-001-site1.atempurl.com/api/v1',
});

// request interceptor
service.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers["Authorization"] = `${"Bearer " + getToken()}`;
    }
    const timezoneOffset = -new Date().getTimezoneOffset() / 60;
    config.headers['Timezone'] = `${timezoneOffset + 12}`;

    // config.headers['Timezone'] =  `${-new Date().getTimezoneOffset() / 60}`;
    config.headers.common["Accept"] = "application/json"
    config.headers.common["Content-Type"] = "application/json";
    const flag = cookie.get("language") === "ar" ? 'eg' : 'us';
    config.headers.common["Accept-Language"] = `${cookie.get('language')}-${flag}`;
    const branchId = cookie.get("branchId");
    if (branchId) {
      console.log(branchId)
      config.headers["X-Branch-Id"] = branchId;
    }
    // config.headers["X-Branch-Id"] = `${cookie.get("branchId")}`;

    return config;
  },
  (error) => {
    // Do something with request error

    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // global success response message

    store.dispatch("ClearServerErrors");
    let { method } = response.config;
    if (method === "post" || method === "put" || method === "delete") {
      if (response.data.message) {
        Vue.toasted.success(response.data.message);
      }
    }
    return response;
  },
  (error) => {

    if (error.response.status === 401) {
      Vue.toasted.error(error.response.data.message)
      removeToken();
      return router.push("/login");
    }
    if ([400, 404].includes(error.response.status)) {
      Vue.toasted.error(error.response.data.message)
    }

    if (error.response.status === 403) {
      return router.push("/not-found");
    }
    if (error.response.status === 500) {
      store.dispatch("resetTableItems")
      Vue.toasted.error(error.response.data.message)
    }
    if (!getToken()) {
      Vue.toasted.error(error.response.data.message)
    }
    const { errors } = error.response.data;

    store.dispatch("SetServerErrors", errors);
    return Promise.reject(error);
  }
);


export default service;
