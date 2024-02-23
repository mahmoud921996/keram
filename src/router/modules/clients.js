export const clientsRoutes = {
  path: "/",
  to: "/",
  icon: "users.svg",
  activeRoutes: ["record_clients"],
  meta: {
    title: "clients",
    // permissions: "",
  },
  order: 8,
  allow_children: true,
  showInMenu: true,
  name: "clients",
  component: () => import("@/views/clients"),
  children: [
    {
      path: "/customers",
      component: () => import("@/views/clients/customers/index"),
      name: "record_customers",
      icon: "dash.svg",
      to: "/customers",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_customers"],
      meta: {
        title: "record_customers",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/clients/customers/record/index"),
          name: "record_customers",
          icon: "arrow.svg", // < arrow icon
          to: "/customers",
          allowed: true,
          meta: {
            title: "record_customers",
            permissions: "customers_view",
          },
        },

      ],
    },
    {
      path: "/customerReview",
      component: () => import("@/views/clients/customerReview/index"),
      name: "record_customerReview",
      icon: "dash.svg",
      to: "/customerReview",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_customerReview"],
      meta: {
        title: "record_customerReview",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/clients/customerReview/record/index"),
          name: "record_customerReview",
          icon: "arrow.svg", // < arrow icon
          to: "/customerReview",
          allowed: true,
          meta: {
            title: "record_customerReview",
            permissions: "customerReview_view",
          },
        },

      ],
    },

  ]
}