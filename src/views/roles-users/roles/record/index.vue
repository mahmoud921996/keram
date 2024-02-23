<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("roles") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" @click="dialog = true">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_role") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="role/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="role/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>
              <template #item-actions="{ item }">
                <v-btn icon class="mx-1" @click="handleEdit(item.id)">
                  <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn
                  icon
                  class="mx-1 delete-btn"
                  @click="handleDeleteItem(item)"
                >
                  <v-icon color="#ef3f3e">mdi-delete-outline</v-icon>
                </v-btn>
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <CustomDialog :dialog="dialog" @close-dialog="closeDialog">
      <template #header>
        <DialogHeader :title="$t('add_role')" />
      </template>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit()">
          <v-row>
            <v-col cols="12" class="relative">
              <FormGroup rules="required" name="name" errorName="name">
                <template #default="{ attrs }">
                  <InputText
                    v-bind="attrs"
                    v-model="form.name"
                    name="name"
                    :label="$t('name')"
                  />
                </template>
              </FormGroup>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
      <template #actions>
        <div class="d-flex justify-end w-100 gap-md">
          <v-btn
            outlined
            color="primary"
            min-width="120"
            @click="closeDialog"
            >{{ $t("buttons.cancel") }}</v-btn
          >
          <v-btn
            class="primary"
            @click="saveRole"
            min-width="120"
            type="submit"
            >{{ $t("buttons.save") }}</v-btn
          >
        </div>
      </template>
    </CustomDialog>
    <GenericDialog
      :dialog.sync="deleteDialog"
      @update:dialog="closeDialog"
      :tableItem="tableItem"
      reqName="role/delete"
    >
    </GenericDialog>
  </v-container>
</template>



<script>
export default {
  name: "RolesRecord",
  data() {
    return {
      rendering: true,
      deleteDialog: false,
      toggle_value: [],
      search: "",
      dialog: false,
      showDialog: false,
      tableItem: {},
      tableIndex: 0,
      form: {
        name: "",
      },
      roleId: null,
      reset: false,
    };
  },
  computed: {
    headers() {
      const headers = [
        {
          name: "#",
          value: "#",
          showColumn: true,
        },

        {
          name: "name",
          value: "name",
          sortable: false,
          showColumn: true,
        },

        {
          name: "status",
          value: "isActive",
          sortable: false,
          showColumn: true,
        },
        {
          name: "actions",
          value: "actions",
          showColumn: true,
        },
      ];
      return headers.filter((head) => head.showColumn);
    },
    dialogHeading() {
      if (this.roleId) {
        return this.$t("edit_role");
      } else {
        return this.$t("add_role");
      }
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.deleteDialog = false;
      this.tableItem = {};
      this.roleId = null;
      this.$refs.form.reset();
    },
    resetDate() {
      this.roleId = null;
      this.reset = true;
    },
    generatePayload() {
      const formData = new FormData();
      formData.append("Name", this.form.name);
      if (this.roleId) {
        formData.append("Id", this.roleId);
      }
      return formData;
    },
    saveRole() {
      if (this.roleId) {
        //
        this.updateRole();
      } else {
        this.addRole();
      }
    },
    addRole() {
      this.$http
        .post({
          reqName: `/role/create`,
          data: this.generatePayload(),
        })
        .then(() => {
          this.rendering = false;
          this.resetData();
          this.dialog = false;
          setTimeout(() => {
            this.rendering = true;
          }, 10);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetData() {
      this.form.name = "";
      this.$refs.form.reset();
      this.roleId = null;
    },
    updateRole() {
      this.$http
        .put({
          reqName: `/role/update`,
          data: this.generatePayload(),
        })
        .then(() => {
          this.rendering = false;
          this.resetData();
          setTimeout(() => {
            this.rendering = true;
          }, 10);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
    handleDeleteItem(item) {
      this.tableItem = item;
      this.deleteDialog = !this.deleteDialog;
    },
    handleEdit(id) {
      this.roleId = id;
      this.dialog = true;
    },
  },
  watch: {
    roleId: {
      handler(newVal) {
        if (newVal) {
          this.$http
            .get({
              reqName: `/role/get-by-id?Id=${newVal}`,
            })
            .then(({ data: response }) => {
              this.form.name = response.data.name;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.resetData();
        }
      },
    },
  },
};
</script>
