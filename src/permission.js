import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // getToken from cookie

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
// import { IndexData } from "@/helpers/apiMethods";
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const queries = store.getters["getQuery"];
  if (getToken()) {
    if (Object.keys(queries).length > 0) {
      store.dispatch("removeQuery");
    }
    store.commit("RESET_TABLE_ITEMS");
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
