<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("cities") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" @click="dialog = true">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_city") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="city/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="city/activate-deactivate"
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
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <CustomDialog :dialog="dialog" @close-dialog="closeDialog">
      <template #header>
        <DialogHeader :title="$t('add_city')" />
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
                    name="nameAr"
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
                    name="nameEn"
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
          <v-btn class="primary" @click="saveUnit" min-width="120">{{
            $t("buttons.save")
          }}</v-btn>
        </div>
      </template>
    </CustomDialog>
  </v-container>
</template>

<script>
export default {
  name: "cities",
  data() {
    return {
      rendering: true,
      toggle_value: [],
      search: "",
      dialog: false,
      showDialog: false,
      tableItem: {},
      tableIndex: 0,
      form: {
        nameAr: "",
        nameEn: "",
      },
      cityId: false,
    };
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
      if (this.cityId) {
        formData.append("Id", this.cityId);
      }
      return formData;
    },
    addCity() {
      this.$http
        .post({
          reqName: `/city/create`,
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
      this.cityId = null;
      this.$refs.form.reset();
    },
    handleEdit(id) {
      this.cityId = id;
      this.dialog = true;
    },
    resetData() {
      this.form.nameAr = "";
      this.form.nameEn = "";
      this.cityId = null;
      this.dialog = false;
      this.$refs.form.reset();
    },
    updateCity() {
      this.$http
        .put({
          reqName: `/city/update`,
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
        });
    },
    saveUnit() {
      if (this.cityId) {
        //
        this.updateCity();
      } else {
        this.addCity();
      }
    },
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
      if (this.cityId) {
        return this.$t("edit_city");
      } else {
        return this.$t("new_city");
      }
    },
  },
  watch: {
    cityId: {
      handler(newVal) {
        if (newVal) {
          this.$http
            .get({
              reqName: `/city/get-by-id?Id=${this.cityId}`,
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