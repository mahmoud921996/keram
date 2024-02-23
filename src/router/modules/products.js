export const productsRoutes = {
  path: "/",
  to: "/",
  icon: "products.svg",
  activeRoutes: ["record_products", "add_products", "products"],
  meta: {
    title: "product",
    // permissions: "",
  },
  order: 6,
  allow_children: true,
  showInMenu: true,
  name: "product",
  component: () => import("@/views/product"),
  children: [
    {
      path: "/products",
      component: () => import("@/views/product/products/index"),
      name: "products",
      icon: "dash.svg",
      to: "/products",
      allowed: true,
      meta: {
        title: "products",
        // permissions: "account-permissions_edit"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/product/products/record/index"),
          name: "record_products",
          icon: "arrow.svg", // < arrow icon
          to: "/products",
          allowed: true,
          meta: {
            title: "record_products",
            permissions: "products_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/product/products/actions"),
          name: "record_products",
          icon: "arrow.svg",
          to: "/products/add",
          allowed: true,
          meta: {
            title: "add_product",
            permissions: "products_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/product/products/actions"),
          name: "edit_product",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "products_edit",
            permissions: "products_edit",
          },
        },

      ],
    },
    {
      path: "/products/units",
      component: () => import("@/views/product/units/index"),
      name: "units",
      icon: "dash.svg",
      allowed: true,
      to: "/products/units",
      meta: {
        title: "units",
        // permissions: "account-permissions_edit"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/product/units/record/index"),
          name: "record_units",
          icon: "arrow.svg", // < arrow icon
          to: "/units",
          allowed: true,
          meta: {
            title: "record_units",
            permissions: "units_view",
          },
        },
      ]
    },
    {
      path: "/products/categories",
      component: () => import("@/views/product/categories/index"),
      name: "categories",
      icon: "dash.svg",
      to: "/products/categories",
      allowed: true,
      meta: {
        title: "categories",
        // permissions: "account-permissions_edit"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/product/categories/record/index"),
          name: "record_categories",
          icon: "arrow.svg", // < arrow icon
          to: "/categories",
          allowed: true,
          meta: {
            title: "record_categories",
            permissions: "categories_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/product/categories/actions"),
          name: "add_catogry",
          hidden: true,
          icon: "mdi-plus-circle-outline",
          meta: {
            title: "catogries_create",
            permissions: "catogries_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/product/categories/actions"),
          name: "edit_category",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "categories_edit",
            permissions: "categories_edit",
          },
        },
      ]
    },

    {
      path: "/products/branch",
      component: () => import("@/views/product/branch/index"),
      name: "branch",
      icon: "dash.svg",
      to: "/products/branch",
      allowed: true,
      meta: {
        title: "product_branch",
        // permissions: "account-permissions_edit"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/product/branch/record/index"),
          name: "record_branch",
          icon: "arrow.svg", // < arrow icon
          to: "/branch",
          allowed: true,
          meta: {
            title: "record_branch",
            permissions: "branch_view",
          },
        },
      ]
    },
    {
      path: "/all-products",
      component: () => import("@/views/product/AllProducts/index"),
      name: "AllProducts",
      icon: "dash.svg",
      to: "/all-products",
      allowed: true,
      meta: {
        title: "allProducts",
        // permissions: "account-permissions_edit"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/product/AllProducts/record/index"),
          name: "record_AllProducts",
          icon: "arrow.svg", // < arrow icon
          to: "/AllProducts",
          allowed: true,
          meta: {
            title: "record_AllProducts",
            permissions: "AllProducts_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/product/AllProducts/actions"),
          name: "record_AllProducts",
          icon: "arrow.svg",
          to: "/AllProducts/add",
          allowed: true,
          meta: {
            title: "add_product",
            permissions: "AllProducts_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/product/AllProducts/actions"),
          name: "edit_product",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "AllProducts_edit",
            permissions: "AllProducts_edit",
          },
        },

      ],
    },
  ]
};
