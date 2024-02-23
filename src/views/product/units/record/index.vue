<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("units") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" @click="dialog = true">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_unit") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="unit/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>

              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="unit/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>

              <template #item-actions="{ item }">
                <v-btn icon class="mx-1">
                  <v-icon color="#4aa4d9" @click="handleEdit(item.id)"
                    >mdi-pencil-outline</v-icon
                  >
                </v-btn>
                <v-btn icon class="mx-1 delete-btn">
                  <v-icon color="#ef3f3e" @click="handleDeleteItem(item)"
                    >mdi-delete-outline</v-icon
                  >
                </v-btn>
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <CustomDialog :dialog="dialog" @close-dialog="closeDialog">
      <template #header>
        <DialogHeader :title="$t('add_new_unit')" />
      </template>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(handleLogin)">
          <v-row>
            <v-col cols="12" class="relative">
              <FormGroup rules="required" name="nameAr" errorName="NameAr">
                <template #default="{ attrs }">
                  <InputText
                    v-bind="attrs"
                    id="nameAr"
                    v-model="form.nameAr"
                    focus
                    name="NameAr"
                    :label="$t('nameAr')"
                  />
                </template>
              </FormGroup>
            </v-col>
            <v-col cols="12" class="relative">
              <FormGroup rules="required" name="nameEn" errorName="NameEn">
                <template #default="{ attrs }">
                  <InputText
                    v-bind="attrs"
                    id="nameEn"
                    v-model="form.nameEn"
                    name="NameEn"
                    :label="$t('nameEn')"
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
          <v-btn class="primary" min-width="120" @click="saveUnit">{{
            $t("buttons.save")
          }}</v-btn>
        </div>
      </template>
    </CustomDialog>
    <GenericDialog
      :dialog.sync="deleteDialog"
      @update:dialog="closeDialog"
      :tableItem="tableItem"
      reqName="unit/delete"
    >
    </GenericDialog>
  </v-container>
</template>


<script>
export default {
  name: "Units",
  data() {
    return {
      rendering: true,
      toggle_value: [],
      search: "",
      dialog: false,
      deleteDialog: false,
      showDialog: false,
      tableItem: {},
      tableIndex: 0,
      form: {
        nameAr: "",
        nameEn: "",
      },
      unitId: false,
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
      if (this.unitId) {
        return this.$t("edit_unit");
      } else {
        return this.$t("new_unit");
      }
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    generateFormData() {
      const formData = new FormData();
      for (let key in this.form) {
        // formData.append(key, this.form[key]);
        formData.append(this.capitalizeFirstLetter(key), this.form[key]);
      }
      if (this.unitId) {
        formData.append("Id", this.unitId);
      }
      return formData;
    },
    onToggle(item) {
      this.$http
        .put({
          reqName: `/unit/activate-deactivate?Id=${item.id}`,
        })
        .then(() => {
          this.rendering = false;
          setTimeout(() => {
            this.rendering = true;
          }, 10);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addUnit() {
      this.$http
        .post({
          reqName: `/unit/create`,
          data: this.generateFormData(),
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
      // .finally(() => {
      //   this.dialog = false;
      // });
    },
    closeDialog() {
      this.dialog = false;
      this.unitId = null;
      this.deleteDialog = false;
      this.tableItem = {};
      this.$refs.form.reset();
    },
    handleEdit(id) {
      this.unitId = id;
      this.dialog = true;
    },
    resetData() {
      this.form.nameAr = "";
      this.form.nameEn = "";
      this.$refs.form.reset();
      this.unitId = null;
    },
    updateUnit() {
      this.$http
        .put({
          reqName: `/unit/update`,
          data: this.generateFormData(),
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
    saveUnit() {
      if (this.unitId) {
        //
        this.updateUnit();
      } else {
        this.addUnit();
      }
    },
    handleDeleteItem(item) {
      this.tableItem = item;
      this.deleteDialog = !this.deleteDialog;
    },
  },
  watch: {
    unitId: {
      handler(newVal) {
        if (newVal) {
          this.$http
            .get({
              reqName: `/unit/get-by-id?Id=${this.unitId}`,
            })
            .then(({ data: response }) => {
              this.form.nameAr = response.data.nameAr;
              this.form.nameEn = response.data.nameEn;
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