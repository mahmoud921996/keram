import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";
import cookie from "js-cookie";
import store from "@/store";
import { asyncRoutes } from "./asyncRoutes";
Vue.use(Router);
//Catching errors in push replace
//Of course, errors in replace can be captured the same way
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
// Base Routes
export const constantRouterMap = [

  {
    path: "/",
    component: Layout,
    name: "layout",
    props: true,
    meta: {
      title: "home"
    },
    children: [

      ...asyncRoutes
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    meta: {
      title: "login"
    },
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    name: "Page401",
    meta: {
      title: "Page401"
    },
    hidden: true
  },
  {
    path: "/not-found",
    component: () => import("@/views/errorPage/404"),
    name: "404",
    meta: {
      title: "404"
    },
    hidden: true
  },
  {
    path: "*",
    component: () => import("@/views/errorPage/404"),
    name: "Page404",
    meta: {
      title: "Page404"
    },
    hidden: true
  }
];
const router = new Router({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes: constantRouterMap
});
router.beforeEach((to, from, next) => {
  if (cookie.get("token")) {
    if (
      to.path === "/login"
    ) {
      next("/");
    } else {

      next();
    }
  } else {
    if (
      to.path === "/login"
    ) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
