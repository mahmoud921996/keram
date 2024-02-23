<template>
  <v-container class="mt-4">
    <v-card class="page-card pa-6 mx-auto">
      <v-card-title class="py-0">
        <h4>{{ $t("branch_information") }}</h4>
        <v-spacer />
        <div class="photo_content" v-if="!isEdit">
          <v-img
            v-if="photo"
            :src="photo"
            width="87"
            height="87"
            class="mx-5 my-2"
            alt="branch image"
            contain
            style="border-radius: 5px"
          >
            <v-icon @click="handleDeleteImage" color="red">
              mdi-delete
            </v-icon></v-img
          >
          <ImageUpload
            @add-image="handleUpdatePhoto"
            :imagePreview="form.image"
            :seperatedLabel="$t('image')"
            :hasDeleteOption="true"
            @delete-image="handleDeleteImage"
            class="pa-2"
            v-else
          />
        </div>
      </v-card-title>
      <v-row class="mt-3">
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
                  <FormGroup
                    rules="required|email"
                    name="email"
                    errorName="email"
                  >
                    <template #default="{ attrs }">
                      <InputText
                        :label="$t('email')"
                        outlined
                        v-bind="attrs"
                        v-model="form.email"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="city" errorName="CityId">
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('city')"
                        :items="cities"
                        outlined
                        v-bind="attrs"
                        v-model="form.cityId"
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
                    name="manager"
                    errorName="ManagerId"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('manager')"
                        :items="manegers"
                        outlined
                        v-bind="attrs"
                        v-model="form.mangerId"
                        item-text="name"
                        item-value="id"
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="tel" errorName="tel">
                    <template #default="{ attrs }">
                      <InputText
                        :label="$t('tel')"
                        outlined
                        v-bind="attrs"
                        v-model="form.tel"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="mobile" errorName="mobile">
                    <template #default="{ attrs }">
                      <InputText
                        :label="$t('mobile')"
                        outlined
                        v-bind="attrs"
                        v-model="form.mobile"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="snapchat"
                    errorName="snapchat"
                  >
                    <template #default="{ attrs }">
                      <InputText
                        :label="$t('snapchat')"
                        outlined
                        v-bind="attrs"
                        v-model="form.snapchat"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    :name="$t('whatsapp')"
                    errorName="whatsapp"
                  >
                    <template #default="{ attrs }">
                      <InputText
                        :label="$t('whatsapp')"
                        outlined
                        v-bind="attrs"
                        v-model="form.whatsapp"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="address"
                    errorName="Address"
                  >
                    <template #default="{ attrs }">
                      <InputTextArea
                        :label="$t('address')"
                        outlined
                        v-bind="attrs"
                        rows="1"
                        v-model="form.address"
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
        nameAr: "",
        nameEn: "",
        email: "",
        tel: "",
        mobile: "",
        whatsapp: "",
        snapchat: "",
        cityId: null,
        address: "",
        mangerId: null,
        taxNo: "",
        image: null,
      },
      photo: null,
      maxSize: 512,
      isEdit: false,
      loadingForm: false,
      cities: [],
      manegers: [],
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleUpdatePhoto(e, objectData) {
      this.form.image = objectData.file;
      this.photo = objectData.ImageUrl;
    },
    handleDeleteImage() {
      this.photo = null;
      this.form.image = null;
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
          reqName: "branch/create",
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
        formData.delete("Image");
        formData.append("Id", this.$route.params.id);
      }
      return formData;
    },
    handleUpdate() {
      this.$http
        .put({
          reqName: "branch/update",
          data: this.generatePayload(),
        })
        .then(() => {
          this.$router.push("/branches");
          this.resetData();
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },
    getCities() {
      this.$http
        .get({
          reqName: "city/paginated?GetActiveOnly=false",
        })
        .then(({ data: response }) => {
          this.cities = response.data;
        });
    },
    getMangers() {
      this.$http
        .get({
          reqName: `user/paginated?GetUsers=true`,
        })
        .then(({ data: response }) => {
          this.manegers = response.data;
        });
    },
    handleShow() {
      this.$http
        .get({
          reqName: `branch/get-by-id?Id=${this.$route.params.id}`,
        })
        .then(({ data: response }) => {
          for (const key in this.form) {
            this.form[key] = response.data[key];
          }
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
  mounted() {
    Promise.all([this.getCities(), this.getMangers()]);
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


<style lang="scss">
.photo_content {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: auto;
  margin: 10px auto;
}
</style>