const base = function () {
  if (process.env.NODE_ENV === "production") {
    return process.env.VUE_APP_ADMIN_PRODUCTION
  } else if (process.env.NODE_ENV === "dev") {
    return process.env.VUE_APP_ADMIN_DEV;
  }
  else {
    return process.env.VUE_APP_ADMIN_TEST;
  }
};
export const baseURL = base();

