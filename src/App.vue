<template>
  <v-app>
    <Notification />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import cookies from "js-cookie";
export default {
  name: "App",
  components: { Notification: () => import("@/components/Notification") },
  methods: {
    handleTheme() {
      const theme_mode = cookies.get("theme_mode") || "light";
      if (cookies.get("theme_mode") === "dark") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    },
  },
  created() {
    this.handleTheme();
  },
};
</script>
