<template>
  <v-container class="mt-4">
    <v-card class="page-card pa-6 mx-auto">
      <v-card-title class="py-0">
        <h4>{{$t('offer_information')}}</h4>
      </v-card-title>
      <v-row class="mt-4">
        <v-col cols="12">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(SubmitForm)">
              <v-row align="center">
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="nameAr" errorName="NameAr">
                    <template #default="{ attrs }">
                      <InputText
                        maxlength="100"
                        :label="$t('nameAr')"
                        outlined
                        v-bind="attrs"
                        v-model="form.nameAr"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="nameEn" errorName="NameEn">
                    <template #default="{ attrs }">
                      <InputText
                        maxlength="100"
                        :label="$t('nameEn')"
                        outlined
                        v-bind="attrs"
                        v-model="form.nameEn"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="amount" errorName="Amount">
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('amount')"
                        outlined
                        v-bind="attrs"
                        v-model="form.amount"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="product"
                    errorName="ProductBranchId"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('product')"
                        :items="products"
                        outlined
                        v-bind="attrs"
                        v-model="form.productBranchId"
                        item-text="name"
                        item-value="productBranchId"
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="offerType"
                    errorName="OfferType"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('offerType')"
                        :items="offerTypes"
                        outlined
                        v-bind="attrs"
                        v-model="form.offerType"
                        item-text="name"
                        item-value="id"
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="minimumProductValue"
                    errorName="MinimumProductValue"
                  >
                    <template #default="{ attrs }">
                      <InputNumber
                        maxlength="100"
                        :label="$t('minimumProductValue')"
                        outlined
                        v-bind="attrs"
                        v-model="form.minimumProductValue"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="endDate"
                    errorName="EndDate"
                  >
                    <template #default="{ attrs }">
                      <InputDate
                        :label="$t('startDate')"
                        outlined
                        v-model="form.startDate"
                        name="startDate"
                        v-bind="attrs"
                      >
                      </InputDate>
                    </template>
                  </FormGroup>
                </v-col>

                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="endDate"
                    errorName="EndDate"
                  >
                    <template #default="{ attrs }">
                      <InputDate
                        :label="$t('endDate')"
                        outlined
                        v-bind="attrs"
                        v-model="form.endDate"
                        name="endDate"
                      >
                      </InputDate>
                    </template>
                  </FormGroup>
                </v-col>
              </v-row> </v-form
          ></ValidationObserver>
        </v-col>
      </v-row>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          class="primary"
          min-width="150"
          @click="SubmitForm"
          :loading="loadingForm"
          >{{ $t("buttons.save") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>



<script>
export default {
  name: "Actions",
  data() {
    return {
      form: {
        nameAr: "",
        nameEn: "",
        amount: "",
        productBranchId: "",
        startDate: "",
        endDate: "",
        minimumProdcutValue: "",
        offerType: "",
      },

      isEdit: false,
      loadingForm: false,
      products: [],
    };
  },
  computed: {
    offerTypes() {
      return [
        { name: this.$t("price_discount"), id: 0 },
        { name: this.$t("quantity_discount"), id: 1 },
      ];
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    SubmitForm() {
      this.$refs.form.validate().then((success) => {
        if (success && !this.serverErrors) {
          this.onConfirm();
        }
      });
    },
    onConfirm() {
      this.loadingForm = true;
      if (this.isEdit) {
        this.handleUpdate();
      } else {
        this.handleCreate();
      }
    },
    handleCreate() {
      this.$http
        .post({
          reqName: "offer/create",
          data: this.generatePayload(),
        })
        .then(({ data }) => {
          this.resetData();
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },
    generatePayload() {
      const formData = new FormData();
      for (let key in this.form) {
        // formData.append(key, this.form[key]);
        formData.append(this.capitalizeFirstLetter(key), this.form[key]);
      }
      if (this.isEdit) {
        formData.append("Id", this.$route.params.id);
      }
      return formData;
    },
    handleUpdate() {
      this.$http
        .put({
          reqName: "offer/update",
          data: this.generatePayload(),
        })
        .then(() => {
          this.$router.push("/offers");
          this.resetData();
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },

    handleShow() {
      this.$http
        .get({
          reqName: `offer/get-by-id?Id=${this.$route.params.id}`,
        })
        .then(({ data: response }) => {
          const {
            nameAr,
            nameEn,
            amount,
            productBranchId,
            startDate,
            endDate,
            minimumProdcutValue,
            offerType,
          } = response.data;
          this.form = {
            nameAr,
            nameEn,
            amount,
            productBranchId,
            startDate,
            endDate,
            minimumProdcutValue,
            offerType,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetData() {
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.$refs.form.reset();
    },
    getProducts() {
      this.$http
        .get({
          reqName: "product/paginated?PageSize=100",
        })
        .then(({ data: response }) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProducts();
  },

  created() {
    if (this.isEdit) {
      this.handleShow();
    }
  },
  watch: {
    $route: {
      handler({ params }) {
        if (params.id) {
          this.isEdit = true;
        } else {
          this.isEdit = false;
        }
      },
      immediate: true,
    },
  },
};
</script>
