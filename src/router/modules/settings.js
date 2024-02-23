export const settingsRoutes = {
  path: "/settings",
  to: "/settings",
  icon: "settings.svg",
  activeRoutes: ["record_settings"],
  meta: {
    title: "settings",
    // permissions: "",
  },
  name: "settings",
  allow_children: true,
  showInMenu: true,
  order: 9,

  component: () => import("@/views/settings"),
  children: [
    {
      path: "/environment-variables",
      component: () => import("@/views/settings/system/index"),
      name: "record_environment-variables",
      icon: "dash.svg",
      to: "/environment-variables",
      allowed: true,
      meta: {
        title: "record_environment-variables",
        // permissions: "countries-states-cities_view",

      },
      children: [
        {
          path: "",
          component: () => import("@/views/settings/system/record/index"),
          name: "record_settings",
          icon: "arrow.svg", // < arrow icon
          to: "/environment-variables",
          allowed: true,
          meta: {
            title: "record_environment-variables",
          },
        }
      ]
    },


    {
      path: "/payment-methods",
      component: () => import("@/views/settings/paymentMethods/index"),
      name: "record_paymentMethods",
      icon: "dash.svg",
      to: "/payment-methods",
      allowed: true,
      meta: {
        title: "record_paymentMethods",
        // permissions: "countries-states-cities_view",

      },
      children: [
        {
          path: "",
          component: () => import("@/views/settings/paymentMethods/record/index"),
          name: "record_paymentMethods",
          icon: "arrow.svg", // < arrow icon
          to: "/payment-methods",
          allowed: true,
          meta: {
            title: "record_payment-methods",
          },
        }
      ]
    },

  ]
};
