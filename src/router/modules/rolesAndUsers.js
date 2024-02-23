export const rolesAndUsersRoutes = {
  path: "/",
  to: "/",
  icon: "users.svg",
  activeRoutes: ["record_users"],
  meta: {
    title: "rolesAndUsers",
    // permissions: "",
  },
  order: 7,
  allow_children: true,
  showInMenu: true,
  name: "rolesAndUsers",
  component: () => import("@/views/roles-users"),
  children: [
    {
      path: "/users",
      component: () => import("@/views/roles-users/users/index"),
      name: "record_users",
      icon: "dash.svg",
      to: "/users",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_users", "add_user", "user_user"],
      meta: {
        title: "record_users",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/roles-users/users/record/index"),
          name: "record_users",
          icon: "arrow.svg", // < arrow icon
          to: "/users",
          allowed: true,
          meta: {
            title: "record_users",
            permissions: "users_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/roles-users/users/actions"),
          name: "record_users",
          icon: "arrow.svg",
          to: "/users/add",
          allowed: true,
          meta: {
            title: "add_user",
            permissions: "users_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/roles-users/users/actions"),
          name: "edit_user",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "users_edit",
            permissions: "users_edit",
          },
        },
      ],
    },
    {
      path: "/roles",
      component: () => import("@/views/roles-users/roles/index"),
      name: "record_roles",
      icon: "dash.svg",
      to: "/roles",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_roles", "add_role", "role_role"],
      meta: {
        title: "record_roles",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/roles-users/roles/record/index"),
          name: "record_roles",
          icon: "arrow.svg", // < arrow icon
          to: "/roles",
          allowed: true,
          meta: {
            title: "record_roles",
            permissions: "roles_view",
          },
        },

      ],
    },
    {
      path: "/permissions",
      component: () => import("@/views/roles-users/permissions/index"),
      name: "record_permission",
      icon: "dash.svg",
      to: "/permissions",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_permissions"],
      meta: {
        title: "record_permissions",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/roles-users/permissions/record/index"),
          name: "record_permissions",
          icon: "arrow.svg", // < arrow icon
          to: "/permissions",
          allowed: true,
          meta: {
            title: "record_permissions",
            permissions: "permissions_view",
          },
        },

      ],
    },
  ]
}