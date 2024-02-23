export const offersRoutes = {
  path: "/",
  to: "/",
  icon: "offers.svg",
  activeRoutes: ["record_offers", "add_offer", "offers_edit"],
  meta: {
    title: "offers",
    // permissions: "",
  },
  order: 4,
  allow_children: true,
  showInMenu: true,
  name: "offers",
  component: () => import("@/views/offers"),
  children: [
    {
      path: "/offers",
      component: () => import("@/views/offers/index"),
      name: "record_offers",
      icon: "dash.svg",
      to: "/offers",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_offers", "add_offer", "offers_edit"],
      meta: {
        title: "offers",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/offers/record/index"),
          name: "record_offers",
          icon: "arrow.svg", // < arrow icon
          to: "/offers",
          allowed: true,
          meta: {
            title: "record_offers",
            permissions: "offers_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/offers/actions"),
          name: "record_offers",
          icon: "arrow.svg",
          to: "/offers/add",
          allowed: true,
          meta: {
            title: "add_offer",
            permissions: "offers_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/offers/actions"),
          name: "edit_offer",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "offers_edit",
            permissions: "offers_edit",
          },
        },
      ],
    },
    {
      path: "/coupons",
      component: () => import("@/views/offers/coupons/index"),
      name: "record_coupons",
      icon: "dash.svg",
      to: "/coupons",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_coupons", "add_coupon", "coupons_edit"],
      meta: {
        title: "record_coupons",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/offers/coupons/record/index"),
          name: "record_coupons",
          icon: "arrow.svg", // < arrow icon
          to: "/coupons",
          allowed: true,
          meta: {
            title: "record_coupons",
            permissions: "coupons_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/offers/coupons/actions"),
          name: "record_coupons",
          icon: "arrow.svg",
          to: "/coupons/add",
          allowed: true,
          meta: {
            title: "add_coupon",
            permissions: "coupons_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/offers/coupons/actions"),
          name: "edit_coupon",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "coupons_edit",
            permissions: "coupons_edit",
          },
        },

      ],
    },

    {
      path: "/image-show",
      component: () => import("@/views/offers/imageShow/index"),
      name: "record_imageShow",
      icon: "dash.svg",
      to: "/image-show",
      allowed: true,
      hideInMenu: false,
      allow_children: false,
      activeRoutes: ["record_imageShow", "add_imageShow", "imageShow_edit"],
      meta: {
        title: "record_imageShow",
        // permissions: "account-permissions_view"
      },
      children: [
        {
          path: "",
          component: () => import("@/views/offers/imageShow/record/index"),
          name: "record_imageShow",
          icon: "arrow.svg", // < arrow icon
          to: "/image-show",
          allowed: true,
          meta: {
            title: "record_imageShow",
            permissions: "imageShow_view",
          },
        },
        {
          path: "add",
          component: () => import("@/views/offers/imageShow/actions"),
          name: "record_imageShow",
          icon: "arrow.svg",
          to: "/image-show/add",
          allowed: true,
          meta: {
            title: "add_imageShow",
            permissions: "imageShow_create",
          },
        },
        {
          path: ":id/edit",
          component: () => import("@/views/offers/imageShow/actions"),
          name: "edit_imageShow",
          icon: "mdi-square-edit-outline",
          hidden: true,
          meta: {
            title: "imageShow_edit",
            permissions: "imageShow_edit",
          },
        },
      ],
    },
  ]
}