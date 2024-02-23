<template>
  <v-container class="mt-4">
    <v-card class="page-card permissions">
      <v-card-title>
        <h4>{{ $t("permissions") }}</h4>
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          min-width="160"
          @click="updatePermissions"
          >{{ $t("update_permissions") }}</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" md="6">
                <InputSelect
                  :label="$t('roles')"
                  :items="roles"
                  outlined
                  v-model="form.roleId"
                  item-text="name"
                  item-value="id"
                >
                </InputSelect>
              </v-col>
              <v-col cols="12" md="6">
                <InputSelect
                  :label="$t('modules')"
                  :items="modules"
                  outlined
                  v-model="form.moduleId"
                  item-text="name"
                  item-value="id"
                >
                </InputSelect>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              :fromStore="true"
            >
              <template #prepend v-if="permissionsList.length > 0">
                <td class="text-center">
                  <v-checkbox
                    v-model="allPermissions"
                    :on-icon="'mdi-check-circle-outline'"
                    :off-icon="'mdi-checkbox-blank-circle-outline'"
                    color="primary"
                    @change="selectAllSubModules"
                  ></v-checkbox>
                </td>
                <td class="text-center">{{ $t("select_All") }}</td>
                <td>
                  <v-checkbox
                    v-model="priv.Access"
                    :on-icon="'mdi-check-circle-outline'"
                    :off-icon="'mdi-checkbox-blank-circle-outline'"
                    color="primary"
                    @change="selectAllPriv('Access')"
                  ></v-checkbox>
                </td>
                <td>
                  <v-checkbox
                    v-model="priv.Show"
                    :on-icon="'mdi-check-circle-outline'"
                    :off-icon="'mdi-checkbox-blank-circle-outline'"
                    color="primary"
                    @change="selectAllPriv('Show')"
                    :disabled="!priv.Access"
                  ></v-checkbox>
                </td>
                <td>
                  <v-checkbox
                    v-model="priv.Insert"
                    :on-icon="'mdi-check-circle-outline'"
                    :off-icon="'mdi-checkbox-blank-circle-outline'"
                    color="primary"
                    @change="selectAllPriv('Insert')"
                    :disabled="!priv.Access"
                  ></v-checkbox>
                </td>
                <td>
                  <v-checkbox
                    v-model="priv.Update"
                    :on-icon="'mdi-check-circle-outline'"
                    :off-icon="'mdi-checkbox-blank-circle-outline'"
                    color="primary"
                    @change="selectAllPriv('Update')"
                    :disabled="!priv.Access"
                  ></v-checkbox>
                </td>
                <td>
                  <v-checkbox
                    v-model="priv.Delete"
                    :on-icon="'mdi-check-circle-outline'"
                    :off-icon="'mdi-checkbox-blank-circle-outline'"
                    color="primary"
                    @change="selectAllPriv('Delete')"
                    :disabled="!priv.Access"
                  ></v-checkbox>
                </td>
              </template>
              <template #item-#="{ item }">
                <v-checkbox
                  v-model="permissions"
                  :on-icon="'mdi-check-circle-outline'"
                  :off-icon="'mdi-checkbox-blank-circle-outline'"
                  color="primary"
                  :value="item.subModuleId"
                  @change="selectAllSubPermissions(item.subModuleId)"
                ></v-checkbox>
              </template>

              <template #item-priv_Access="{ item }">
                <v-checkbox v-model="item.priv_Access"> </v-checkbox>
              </template>

              <template #item-priv_Show="{ item }">
                <v-checkbox
                  v-model="item.priv_Show"
                  :disabled="!item.priv_Access"
                >
                </v-checkbox>
              </template>
              <template #item-priv_Insert="{ item }">
                <v-checkbox
                  v-model="item.priv_Insert"
                  :disabled="!item.priv_Access"
                >
                </v-checkbox>
              </template>

              <template #item-priv_Update="{ item }">
                <v-checkbox
                  v-model="item.priv_Update"
                  :disabled="!item.priv_Access"
                >
                </v-checkbox>
              </template>
              <template #item-priv_Delete="{ item }">
                <v-checkbox
                  v-model="item.priv_Delete"
                  :disabled="!item.priv_Access"
                >
                </v-checkbox>
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>



<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PermissionsRecord",
  data() {
    return {
      form: {
        roleId: "",
        moduleId: "",
      },
      roles: [],
      modules: [],
      rendering: true,
      permissions: [],
      allPermissions: false,
      showAll: false,
      accessAll: false,
      priv: {
        Access: false,
        Show: false,
        Insert: false,
        Update: false,
        Delete: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      permissionsList: "getsTableItems",
    }),
    headers() {
      const headers = [
        {
          name: "#",
          value: "#",
          showColumn: true,
        },

        {
          name: "name",
          value: "subModuleName",
          sortable: false,
          showColumn: true,
        },
        {
          name: "access",
          value: "priv_Access",
          sortable: false,
          showColumn: true,
        },
        {
          name: "show",
          value: "priv_Show",
          sortable: false,
          showColumn: true,
        },

        {
          name: "create",
          value: "priv_Insert",
          sortable: false,
          showColumn: true,
        },

        {
          name: "update",
          value: "priv_Update",
          sortable: false,
          showColumn: true,
        },
        {
          name: "delete",
          value: "priv_Delete",
          sortable: false,
          showColumn: true,
        },
      ];
      return headers.filter((head) => head.showColumn);
    },
    reqName() {
      return `permissions/role-sub-modules-paginated?RoleId=${this.form.roleId}&ModuleId=${this.form.moduleId}`;
    },
  },

  methods: {
    ...mapActions({
      getTableItems: "getTableItems",
    }),
    getRoles() {
      this.$http
        .get({
          reqName: "role/paginated",
        })
        .then(({ data: response }) => {
          this.roles = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getModules() {
      this.$http
        .get({
          reqName: "permissions/modules-paginated",
        })
        .then(({ data: response }) => {
          this.modules = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPermissions() {
      this.getTableItems({
        reqName: `permissions/role-sub-modules-paginated?RoleId=${this.form.roleId}&ModuleId=${this.form.moduleId}`,
      });
    },
    selectAllSubPermissions(subModuleId) {
      if (!this.permissionsList) {
        return;
      }
      const exist = this.permissions.includes(subModuleId);
      this.permissionsList.forEach((permission) => {
        if (permission.subModuleId === subModuleId) {
          Object.keys(permission).forEach((key) => {
            if (key.startsWith("priv_")) {
              permission[key] = exist;
            }
          });
        }
      });
    },
    selectAllSubModules() {
      if (this.allPermissions) {
        this.permissionsList.forEach((permission) => {
          this.permissions.push(permission.subModuleId);
          this.selectAllSubPermissions(permission.subModuleId);
        });
      } else {
        this.permissions = [];
        this.permissionsList.forEach((permission) => {
          this.selectAllSubPermissions(permission.subModuleId);
        });
      }
      Object.keys(this.priv).forEach(
        (key) => (this.priv[key] = this.allPermissions)
      );
    },
    selectAllPriv(key) {
      this.permissionsList.forEach((permission) => {
        permission[`priv_${key}`] = this.priv[key];
      });
    },
    updatePermissions() {
      this.$http
        .put({
          reqName: "permissions/update",
          data: { aspNetRolesSubModules: this.generateData() },
        })
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    generateData() {
      const data = this.permissionsList.map((permission) => ({
        id: permission.id,
        roleId: this.form.roleId,
        subModuleId: permission.subModuleId,
        priv_Access: permission.priv_Access,
        priv_Insert: permission.priv_Insert,
        priv_Update: permission.priv_Update,
        priv_Delete: permission.priv_Delete,
        priv_Show: permission.priv_Show,
      }));
      return data;
    },
  },
  mounted() {
    this.$store.dispatch("resetTableItems");
    Promise.all([this.getRoles(), this.getModules()]);
  },
  watch: {
    permissionsList: {
      handler(val) {
        if (val) {
          this.permissionsList.forEach((permission) => {
            Object.keys(this.priv).forEach((privKey) => {
              let allPrivTrue = this.permissionsList.every((permission) => {
                return Object.keys(permission)
                  .filter((key) => key.startsWith(`priv_${privKey}`))
                  .every((key) => permission[key]);
              });
              this.priv[privKey] = allPrivTrue;
            });

            // i want to set other priviliages but don't want to repeat code

            let allPrivilegesTrue = true;
            Object.keys(permission).forEach((key) => {
              if (key.startsWith("priv_") && !permission[key]) {
                allPrivilegesTrue = false;
              }
            });
            if (allPrivilegesTrue) {
              this.permissions.push(permission.subModuleId);
            }
            // i want to check all access privilages and if all submodules priviligae true to make priv['Access'] to true
          });
        }
      },
      immediate: true,
      deep: true,
    },
    form: {
      handler(val) {
        if (val.roleId && val.moduleId) {
          this.getPermissions();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  // i want to push submodule it of permission then have all privileges true
}; ///
</script>



<style lang="scss">
@import "index.scss";
</style>