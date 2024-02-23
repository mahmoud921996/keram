<template>
  <main>
    <v-navigation-drawer
      v-model="drawer"
      :width="drawerWidth"
      :right="right"
      :mini-variant="miniVariant"
      :clipped="clipped"
      mini-variant-width="80"
      fixed
      app
      class="layout__drawer pa-4"
    >
      <v-list
        class="layout__drawer--logo d-flex align-center justify-space-between"
      >
        <!-- img -->
        <v-list-item target="_blank" v-if="!miniVariant">
          <div class="layout__drawer--logo-wrapper mx-auto">
            <img
              :src="require('@/assets/imgs/keram-logo.png')"
              height="100%"
              class="mx-auto"
              width="100%"
              alt="keram logo"
            />
          </div>
        </v-list-item>
        <!-- toggle -->
        <v-list-item class="justify-end" @click="handleSwitch">
          <v-icon size="24" v-text="'$menuIcon'"></v-icon>
        </v-list-item>
      </v-list>
      <v-list class="d-flex align-center justify-space-between">
        <v-list-item>
          <v-icon color="#ffa53b">mdi-map-marker-star-outline</v-icon>
          <h5 class="white--text size-18 font-weight-regular">
            {{ branchName }}
          </h5>
        </v-list-item>
        <v-list-item class="d-flex justify-end pointer" @click="changeBranch">
          <span class="size-14 white--text">{{ $t("change") }}</span>
        </v-list-item>
      </v-list>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-group
            v-if="item.allow_children && item.children"
            :key="index"
            :no-action="drawer"
            :value="item.activeRoutes.includes($route.meta.title)"
            :class="{
              'active-group': item.allow_children,
            }"
          >
            <template #activator>
              <ToolTip
                color="#fff"
                :icon="item.icon"
                :text="$t(`sidebar.${item.meta.title}`)"
                :disabled="drawer"
              >
              </ToolTip>
              <v-list-item-content>
                <v-list-item-title class="white--text">
                  {{ $t(`sidebar.${item.meta.title}`) }}</v-list-item-title
                >
              </v-list-item-content>
            </template>
            <template v-for="(child, index) in item.children">
              <v-list-item
                exact
                v-if="child.allowed && !item.hidden && !child.hidden"
                :key="index"
                :to="child.to"
                @click="handleClick(child)"
              >
                <ToolTip
                  color="primary"
                  :icon="child.icon"
                  :text="$t(`sidebar.${child.meta.title}`)"
                  :disabled="drawer"
                >
                </ToolTip>
                <v-list-item-content>
                  <v-list-item-title
                    class="white--text"
                    v-text="$t(`sidebar.${child.meta.title}`)"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-group
                class="sub-group"
                sub-group
                v-if="child.allow_children && child.children"
                :key="index"
                :no-action="drawer"
                :value="child.activeRoutes.includes($route.meta.title)"
                :class="{
                  'active-group': item.allow_children,
                }"
              >
                <template #activator>
                  <ToolTip
                    color="#fff"
                    :icon="child.icon"
                    :text="$t(`sidebar.${child.meta.title}`)"
                    :disabled="drawer"
                  >
                  </ToolTip>
                  <v-list-item-content>
                    <v-list-item-title class="white--text">
                      {{ $t(`sidebar.${child.meta.title}`) }}</v-list-item-title
                    >
                  </v-list-item-content>
                </template>
                <template v-for="(item, index) in child.children">
                  <v-list-item
                    exact
                    v-if="item.allowed && !item.hidden"
                    :key="index"
                    :to="item.to"
                    @click="handleClick(item)"
                  >
                    <ToolTip
                      color="primary"
                      :icon="item.icon"
                      :text="$t(`sidebar.${item.meta.title}`)"
                      :disabled="drawer"
                    >
                    </ToolTip>
                    <v-list-item-content>
                      <v-list-item-title
                        class="white--text"
                        v-text="$t(`sidebar.${item.meta.title}`)"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list-group>
            </template>
          </v-list-group>
          <v-list-item
            v-else-if="item.showInMenu"
            @click="handleClick(item)"
            :key="item.meta.title"
            :to="item.to"
            :ripple="!item.icon ? false : true"
            :style="{ cursor: !item.icon ? 'initial' : 'pointer' }"
          >
            <ToolTip
              :noIcon="item.icon ? true : false"
              color="#fff"
              :icon="item.icon"
              :text="$t(`sidebar.${item.meta.title}`)"
              :disabled="drawer"
            >
            </ToolTip>
            <v-list-item-content>
              <v-list-item-title
                style="padding: 0 10px"
                class="white--text"
                v-text="$t(`sidebar.${item.meta.title}`)"
              >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      flat
      min-height="80"
      style="overflow: hidden"
      class="layout__header"
    >
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div
        class="d-md-flex align-center hidden-sm-and-down"
        style="width: 40%; gap: 16px"
      >
        <InputText
          :form="form"
          name="search"
          placeholder="Search..."
          hide-details
          dense
          outlined
          filled
          class="input-search"
        >
          <template #append-outer>
            <div class="layout__header--search">
              <v-icon size="18" color="#fff">mdi-magnify</v-icon>
            </div>
          </template>
        </InputText>
      </div>

      <v-spacer />
      <div class="d-flex justify-center align-center">
        <v-menu rounded offset-y bottom transition="slide-x-transition">
          <template #activator="{ attrs, on }">
            <v-badge color="#ff7272" content="2" offset-x="22" offset-y="22">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon size="24">mdi-bell-outline</v-icon>
              </v-btn>
            </v-badge>
          </template>
          <!-- <v-list class="pa-0">
            <v-list-item> Notifications </v-list-item>
          </v-list> -->
        </v-menu>
        <v-btn icon class="mx-1" @click="handleChangeLanguage">
          <v-icon
            v-text="$i18n.locale == 'en' ? '$arabicIcon' : '$englishIcon'"
          />
        </v-btn>
        <v-btn icon class="mx-1" @click="toggleDarkTheme">
          <v-icon size="24">mdi-weather-night</v-icon>
        </v-btn>
        <v-menu bottom min-width="200px" rounded offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar>
                <img :src="user.imageURL" alt="user" v-if="user.imageURL" />
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                  v-else
                />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar>
                  <img :src="user.imageURL" alt="user" v-if="user.imageURL" />
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                    v-else
                  />
                </v-avatar>
                <h4>{{ user.roleName }}</h4>
                <p class="text-caption mt-1 mb-1 size-14">{{ user.name }}</p>
                <p class="mb-3 size-14">{{ user.email }}</p>

                <v-divider class="my-1"></v-divider>
                <v-btn depressed rounded text @click="logout">
                  {{ $t("logout") }}
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-footer
      fixed
      bottom
      app
      :style="{
        width: `calc(100% - ${footerWidth}) !important`,
        footerPosition,
      }"
      class="layout__footer"
    >
      <p class="primary--text">
        {{ $t("copyright") }} {{ new Date().getFullYear() }} &copy;
        {{ $t("keram") }}
      </p>
    </v-footer>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import cookies from "js-cookie";

import { getLanguage, setLanguage } from "@/utils/languages";

export default {
  name: "SideBar",
  props: {
    branches: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      miniVariant: false,
      drawerWidth: 280,
      right: true,
      form: {
        search: "",
        branch: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      items: "getRoutes",
      user: "getUser",
      getCurrentBranch: "getCurrentBranch",
    }),
    profileDropdown() {
      return [{ title: this.$t("profile"), to: "/profile" }];
    },
    footerWidth() {
      if (this.drawer) {
        return !this.miniVariant ? "280px" : "80px";
      } else {
        return "0px";
      }
    },
    footerPosition() {
      if (this.$i18n.locale === "ar") {
        return { left: `${this.miniVariant ? "80px" : "280px"} !important` };
      } else {
        return { right: `${this.miniVariant ? "80px" : "280px"} !important` };
      }
    },
    branchName() {
      const currentBranch = this.getCurrentBranch;
      const branch = this.branches.find(
        (branch) => branch.id === currentBranch
      );
      if (branch) {
        return branch.name;
      } else {
        return "";
      }
    },
  },
  created() {
    this.handleDirection();
  },
  methods: {
    handleDirection() {
      if (getLanguage() == "ar") {
        this.right = true;
        this.$vuetify.rtl = true;
      } else {
        this.right = false;
        this.$vuetify.rtl = false;
      }
    },
    handleChangeLanguage() {
      this.handleDirection();
      if (this.$i18n.locale == "ar") {
        setLanguage("en");
      } else {
        setLanguage("ar");
      }
      window.location.reload();
    },
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

      console.log(this.$vuetify.theme.dark);
      cookies.set("theme_mode", this.$vuetify.theme.dark ? "dark" : "light");
    },
    handleSwitch() {
      if (!this.$vuetify.breakpoint.mobile) {
        this.miniVariant = !this.miniVariant;
      } else {
        this.drawer = !this.drawer;
      }
    },
    handleClick({ to }) {
      if (this.getQuery && Object.keys(this.getQuery).length > 0) {
        this.$store.dispatch("removeQuery", null);
        this.$store.dispatch("resetTableItems");
        this.$eventBus.$emit("on-refresh");
      }
      this.$eventBus.$emit("on-sidebar-route-clicked", to);
    },
    logout() {
      this.$store.dispatch("Logout").then(() => {
        this.$router.push("/login");
      });
    },
    changeBranch() {
      this.$eventBus.$emit("on-change-branch");
    },
  },
  watch: {
    "$i18n.locale": {
      handler(val) {
        if (this.$vuetify.breakpoint.mobile) {
          this.drawer = false;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>
