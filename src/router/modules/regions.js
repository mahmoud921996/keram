export const regionsRoutes = {
  path: "/",
  to: "/",
  icon: "regions.svg",
  activeRoutes: ["record_regions"],
  meta: {
    title: "regions",
    // permissions: "",
  },
  order: 5,
  allow_children: true,
  showInMenu: true,
  name: "regions",
  component: () => import("@/views/regions"),
  children: [
    {
      path: "/cities",
      to: "/cities",
      component: () => import("@/views/regions/cities/index"),
      name: "cities",
      icon: "dash.svg",
      allowed: true,
      meta: {
        title: "cities",
        // permissions: "account-permissions_edit"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/regions/cities/record/index"),
          name: "record_cities",
          icon: "arrow.svg", // < arrow icon
          to: "/cities",
          allowed: true,
          meta: {
            title: "record_cities",
            permissions: "cities_view",
          },
        }

      ],
    },
    {
      path: "/branches",
      to: "/branches",
      component: () => import("@/views/regions/branches/index"),
      name: "branches",
      icon: "dash.svg",
      allowed: true,
      meta: {
        title: "branches",
        // permissions: "account-permissions_edit"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/regions/branches/record/index"),
          name: "record_branches",
          icon: "arrow.svg", // < arrow icon
          to: "/branches",
          allowed: true,
          meta: {
            title: "record_branches",
            permissions: "branches_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/regions/branches/actions"),
          name: "add_branch",
          hidden: true,
          icon: "mdi-plus-circle-outline",
          meta: {
            title: "branches_create",
            permissions: "branches_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/regions/branches/actions"),
          name: "edit_branch",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "branches_edit",
            permissions: "branches_edit",
          },
        },

      ],
    },


  ]
};
