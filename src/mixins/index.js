import Vue from "vue";
import { mapGetters } from "vuex";
export const globalMixin = {
  computed: {
    ...mapGetters({
      pagination: "getPagination",
      user: "getUser",
      getQuery: "getQuery",
      getLocale: "getLocale"
    }),
    serverErrors() {
      return this.$store.getters.serverErrors;
    },
    routeHashed() {
      if (this.$route.hash === "record") {
        return true;
      } else {
        return false;
      }
    },
    // checkPermissionForCurrentRoute() {
    //   return this.checkPermissionManually(this.$route.meta.permissions);
    // }

  },

  methods: {
    // checkPermissionManually(permissionName) {
    //   let mainPermission = permissionName.split("_")[0];
    //   let permissionCurrentRoute = this.getPermissions?.find(permission => permission.name.replaceAll(/[/ ]+/g, "-").toLowerCase()  == mainPermission) || null;
    //   let hasPermission = {
    //     view: false,
    //     create: false,
    //     edit: false,
    //     delete: false,
    //   };
    //   if (!permissionCurrentRoute) return hasPermission;
    //   console.log(permissionCurrentRoute);
    //   permissionCurrentRoute.sub_permissions.forEach(subPermission => {
    //     let subPermissionName = subPermission.name.split("_")[1];
    //     hasPermission[subPermissionName] = true;
    //   })
    //   console.log(hasPermission);
    //   return hasPermission;
    // },
    handleDebounce(callback) {
      if (this.timStamp) {
        clearTimeout(this.timStamp);
      }
      this.timStamp = setTimeout(() => {
        callback();
      }, 500);
    },

    popUp(
      title = this.$t("message.warning"),
      type = "question",
      singleButton = false
    ) {
      const swal = this.$swal.fire({
        title,
        type,
        showCloseButton: false,
        showCancelButton: !singleButton,
        showConfirmButton: true,
        confirmButtonText: `${this.$t("buttons.confirm")}`,
        cancelButtonText: `${this.$t("buttons.cancel")}`
      });
      return swal;
    },
    convertDate(date , format = "LL") {
      return this.$moment(date).locale(this.$i18n.locale).format(format);
    }
  },
  filters: {
    truncate(value, count) {
      if (value && value.length > count) {
        return value && value.substring(0, count) + "...";
      } else {
        return value;
      }
    }
  }
};

Vue.mixin(globalMixin);
