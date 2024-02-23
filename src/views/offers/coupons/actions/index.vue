<template>
  <v-container class="mt-4">
    <v-card class="page-card pa-6 mx-auto">
      <v-card-title class="py-0">
        <h4>{{ $t("coupon_information") }}</h4>
      </v-card-title>
      <v-row class="mt-4">
        <v-col cols="12">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(SubmitForm)">
              <v-row align="center">
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="code" errorName="Code">
                    <template #default="{ attrs }">
                      <InputText
                        maxlength="100"
                        :label="$t('code')"
                        outlined
                        v-bind="attrs"
                        v-model="form.code"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="ratio" errorName="Ratio">
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('ratio')"
                        outlined
                        v-bind="attrs"
                        v-model="form.ratio"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="fixedValue"
                    errorName="FixedValue"
                  >
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('fixedValue')"
                        outlined
                        v-bind="attrs"
                        v-model="form.fixedValue"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="couponType"
                    errorName="CouponType"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('couponType')"
                        :items="couponTypes"
                        outlined
                        v-bind="attrs"
                        v-model="form.couponType"
                        item-text="name"
                        item-value="id"
                      >
                      </InputSelect> </template
                  ></FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="minimumOrderValue"
                    errorName="MinimumOrderValue"
                  >
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('minimumOrderValue')"
                        outlined
                        v-bind="attrs"
                        v-model="form.minimumOrderValue"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="maxValueToApply"
                    errorName="MaxValueToApply"
                  >
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('maxValueToApply')"
                        outlined
                        v-bind="attrs"
                        v-model="form.maxValueToApply"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="count" errorName="Count">
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('count')"
                        outlined
                        v-bind="attrs"
                        v-model="form.count"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <InputDate
                    :label="$t('startDate')"
                    outlined
                    v-model="form.startDate"
                    name="startDate"
                  >
                  </InputDate>
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
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="couponDescription"
                    errorName="CouponDescription"
                  >
                    <template #default="{ attrs }">
                      <InputTextArea
                        :label="$t('couponDescription')"
                        outlined
                        v-bind="attrs"
                        rows="1"
                        v-model="form.couponDescription"
                      >
                      </InputTextArea>
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
        code: "",
        ratio: "",
        fixedValue: "",
        minimumOrderValue: "",
        maxValueToApply: "",
        count: "",
        endDate: "",
        startDate: null,
        couponDescription: "",
        couponType: "",
      },

      isEdit: false,
      loadingForm: false,
    };
  },
  computed: {
    couponTypes() {
      return [
        { name: this.$t("fixedValue"), id: 0 },
        { name: this.$t("ratio"), id: 1 },
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
          reqName: "coupon/create",
          data: this.generatePayload(),
        })
        .then(({ data }) => {
          this.resetData();
        })
        .catch((err) => {
          console.log(err);
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
          reqName: "coupon/update",
          data: this.generatePayload(),
        })
        .then(() => {
          this.$router.push("/coupons");
          this.resetData();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },

    handleShow() {
      this.$http
        .get({
          reqName: `coupon/get-by-id?Id=${this.$route.params.id}`,
        })
        .then(({ data: response }) => {
          this.form = response.data;
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
      this.photo = null;
    },
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
