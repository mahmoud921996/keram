export const abandonedCartRoutes = {
  path: "/abandoned-cart",
  to: "/abandoned-cart",
  icon: "abandonedCart.svg",
  activeRoutes: ["record_abandonedCart"],
  meta: {
    title: "abandonedCart",
    // permissions: "",
  },
  name: "abandonedCart",
  allow_children: false,
  showInMenu: true,
  order: 3,

  component: () => import("@/views/abandonedCart"),
  children: [
    {
      path: "/",
      component: () => import("@/views/abandonedCart/record"),
      name: "record_abandonedCart",
      icon: "mdi-file-document-multiple-outline",
      to: "/abandoned-cart",
      allowed: false,
      meta: {
        title: "abandonedCart",
        // permissions: "countries-states-cities_view",

      }
    },
    {
      path: ":id/view",
      component: () => import("@/views/abandonedCart/view"),
      name: "view_abandonedCart",
      icon: "mdi-file-document-multiple-outline",
      allowed: false,
      meta: {
        title: "view_abandonedCart",
        // permissions: "countries-states-cities_view",

      }
    },


  ]
};
