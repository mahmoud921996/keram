export const ordersRoutes = {
  path: "/orders",
  to: "/orders",
  icon: "orders.svg",
  activeRoutes: ["record_orders"],
  meta: {
    title: "orders",
    // permissions: "",
  },
  name: "orders",
  allow_children: false,
  showInMenu: true,
  order: 2,

  component: () => import("@/views/orders"),
  children: [
    {
      path: "/",
      component: () => import("@/views/orders/record"),
      name: "record_orders",
      icon: "mdi-file-document-multiple-outline",
      to: "/orders",
      allowed: false,
      meta: {
        title: "record_orders",
        // permissions: "countries-states-cities_view",

      }
    },
    {
      path: ":id/order-details",
      component: () => import("@/views/orders/actions"),
      name: "edit_order",
      icon: "mdi-square-edit-outline",
      hidden: true,
      meta: {
        title: "order_edit",
        permissions: "order_edit",
      },
    },

  ]
};
