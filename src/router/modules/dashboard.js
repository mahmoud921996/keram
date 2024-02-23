export const dashboardRoutes = {
  path: "/dashboard",
  to: "/dashboard",
  icon: "dashboard.svg",
  activeRoutes: ["view_dashboard"],
  meta: {
    title: "dashboard",
    permissions: "dashboard",
  },
  showInMenu: true,
  order: 1,
  component: () => import("@/views/home"),
};
