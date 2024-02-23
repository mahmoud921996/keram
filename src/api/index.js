import service from "@/config/axios";
import Vue from "vue";

class HttpClient {
  static instance;
  constructor() {
    if (HttpClient.instance instanceof HttpClient) {
      return HttpClient.instance;
    }
    HttpClient.instance = Object.freeze(this);
  }
  get({ reqName, query, locale = "en" }) {
    return service({
      url: reqName,
      params: { ...query },
      method: "get",
    });
  }
  post({ reqName, data }) {
    return service({ url: reqName, data, method: "post" });
  }
  put({ reqName, data }) {
    return service({ url: reqName, data, method: "put" });
  }
  delete({ reqName, data }) {
    return service({ url: reqName, data, method: "delete" });
  }
}

export const $http = new HttpClient();

Vue.prototype.$http = $http;
