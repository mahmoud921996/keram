<template>
  <v-container class="mt-4">
    <v-card class="page-card pa-6 mx-auto">
      <v-card-title class="py-0">
        <h4>{{$t('catgeory_information')}}</h4>
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
                    rules="required"
                    name="displayOrder"
                    errorName="DisplayOrder"
                  >
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('displayOrder')"
                        outlined
                        v-bind="attrs"
                        v-model="form.displayOrder"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>

                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="shortDescription"
                    errorName="ShortDescription"
                  >
                    <template #default="{ attrs }">
                      <InputTextArea
                        :label="$t('shortDescription')"
                        outlined
                        v-bind="attrs"
                        rows="1"
                        v-model="form.shortDescription"
                      >
                      </InputTextArea>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="longDescrption"
                    errorName="LongDescrption"
                  >
                    <template #default="{ attrs }">
                      <InputTextArea
                        :label="$t('longDescrption')"
                        outlined
                        v-bind="attrs"
                        rows="3"
                        v-model="form.longDescrption"
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
        displayOrder: "",
        image: null,
        shortDescription: "",
        longDescrption: "",
      },
      photo: null,
      maxSize: 512,
      isEdit: false,
      loadingForm: false,
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
          reqName: "category/create",
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
        formData.append(this.capitalizeFirstLetter(key), this.form[key]);
      }
      if (this.isEdit) {
        formData.delete("Image");
      }
      return formData;
    },
    handleUpdate() {
      this.$http
        .put({
          reqName: "category/update",
          data: this.generatePayload(),
        })
        .then(() => {
          this.$router.push("/products/categories");
          this.resetData();
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },

    handleShow() {
      this.$http
        .get({
          reqName: `category/get-by-id?Id=${this.$route.params.id}`,
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


<style lang="scss">
.photo_content {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: auto;
  margin: 10px auto;
}
</style>