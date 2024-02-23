<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("environment_variables") }}</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              :formStore="true"
            >
              <template #item-actions>
                <v-btn icon class="mx-1" @click="dialog = true">
                  <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                </v-btn>
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <CustomDialog :dialog="dialog" @close-dialog="closeDialog">
      <template #header>
        <DialogHeader :title="$t('settings')" />
      </template>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit()">
          <v-row>
            <v-col cols="12" class="relative">
              <FormGroup
                rules="required"
                name="minimumOrderValue"
                errorName="MinimumOrderValue"
              >
                <template #default="{ attrs }">
                  <InputNumber
                    v-bind="attrs"
                    id="minimumOrderValue"
                    v-model="form.minimumOrderValue"
                    focus
                    name="minimumOrderValue"
                    :label="$t('minimumOrderValue')"
                  />
                </template>
              </FormGroup>
            </v-col>
            <v-col cols="12" class="relative">
              <FormGroup
                rules="required"
                name="orderAmountForFreeDeleviry"
                errorName="OrderAmountForFreeDeleviry"
              >
                <template #default="{ attrs }">
                  <InputNumber
                    v-bind="attrs"
                    id="orderAmountForFreeDeleviry"
                    v-model="form.orderAmountForFreeDeleviry"
                    name="orderAmountForFreeDeleviry"
                    :label="$t('orderAmountForFreeDeleviry')"
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
          <v-btn class="primary" min-width="120" @click="submitForm">{{
            $t("buttons.save")
          }}</v-btn>
        </div>
      </template>
    </CustomDialog>
  </v-container>
</template>



<script>
import { mapActions } from "vuex";
export default {
  name: "settingsRecord",
  data() {
    return {
      rendering: true,
      dialog: false,
      form: {
        orderAmountForFreeDeleviry: "",
        minimumOrderValue: "",
      },
      item: {},
    };
  },
  computed: {
    headers() {
      const headers = [
        {
          name: "branchName",
          value: "branchName",
          sortable: false,
          showColumn: true,
        },
        {
          name: "orderAmountForFreeDeleviry",
          value: "orderAmountForFreeDeleviry",
          sortable: false,
          showColumn: true,
        },
        {
          name: "minimumOrderValue",
          value: "minimumOrderValue",
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
  },
  methods: {
    ...mapActions({
      getTableItems: "getTableItems",
    }),
    closeDialog() {
      this.dialog = false;
      this.$refs.form.reset();
    },

    resetDate() {
      this.form.image = null;
      this.userId = null;
    },

    getItems() {
      this.getTableItems({
        reqName: `system-setting/get`,
        selectedKey: null,
        paginated: false,
      });
    },
    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success && !this.serverErrors) {
          this.$http
            .put({
              reqName: "system-setting/update",
              data: this.generateData(),
            })
            .then(() => {
              this.closeDialog();
              this.resetData();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    generateData() {
      const formData = new FormData();
      for (let key in this.form) {
        formData.append(key, this.form[key]);
      }
      return formData;
    },
    resetData() {
      this.$refs.form.reset();
      for (const key in this.form) {
        this.form[key] = "";
      }
    },
  },
  mounted() {
    this.$store.dispatch("resetTableItems");

    this.getItems();
  },
};
</script>
