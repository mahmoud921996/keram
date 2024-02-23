<template>
  <v-container class="mt-4">
    <v-card class="page-card pa-6 mx-auto">
      <v-card-title class="py-0">
        <h4>{{ $t("product_information") }}</h4>
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
                    name="category"
                    errorName="CategoryId"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('category')"
                        :items="categories"
                        outlined
                        v-bind="attrs"
                        v-model="form.categoryId"
                        item-text="name"
                        item-value="id"
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="unit" errorName="UnitId">
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('unit')"
                        :items="units"
                        outlined
                        v-bind="attrs"
                        v-model="form.unitId"
                        item-text="name"
                        item-value="id"
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4" v-if="!isEdit">
                  <FormGroup
                    rules="required"
                    name="branches"
                    errorName="branchesId"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('branches')"
                        :items="branches"
                        outlined
                        v-bind="attrs"
                        v-model="branchesId"
                        item-text="name"
                        item-value="id"
                        multiple
                        chips
                        deletable-chips
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4" v-if="!isEdit">
                  <FormGroup rules="required" name="price" errorName="Price">
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('price')"
                        outlined
                        v-bind="attrs"
                        v-model="form.price"
                      >
                      </InputNumber>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4" v-if="!isEdit">
                  <FormGroup
                    rules="required"
                    name="taxRatio"
                    errorName="TaxRatio"
                  >
                    <template #default="{ attrs }">
                      <InputNumber
                        :label="$t('taxRatio')"
                        outlined
                        v-bind="attrs"
                        v-model="form.taxRatio"
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
                    name="seoField"
                    errorName="Seofield"
                  >
                    <template #default="{ attrs }">
                      <InputTextArea
                        :label="$t('seoField')"
                        outlined
                        v-bind="attrs"
                        rows="1"
                        v-model="form.seofield"
                      >
                      </InputTextArea>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="longDescription"
                    errorName="LongDescription"
                  >
                    <template #default="{ attrs }">
                      <InputTextArea
                        :label="$t('longDescription')"
                        outlined
                        v-bind="attrs"
                        rows="3"
                        v-model="form.longDescription"
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
    <ExpansionPanels class="accordion my-5" v-if="isEdit">
      <ExpansionPanelsItem>
        <template #header>
          <div>
            <v-icon class="px-2" color="primary">mdi-image</v-icon>
            <span>{{ $t("product_images") }}</span>
          </div>
        </template>
        <template #content>
          <v-row>
            <v-col cols="12">
              <ImageUpload
                @add-image="handleUpdatePhoto"
                :seperatedLabel="$t('image')"
                :hasDeleteOption="true"
              />
            </v-col>
            <v-col
              cols="12"
              class="relative d-flex align-center"
              v-if="productImages.length > 0"
            >
              <div
                class="photo_content"
                v-for="(image, index) in productImages"
                :key="index"
                style="width: 120px"
              >
                <v-img
                  :src="image.imageUrl"
                  width="87"
                  height="87"
                  class="mx-5 my-2"
                  alt="branch image"
                  contain
                  style="border-radius: 5px"
                >
                  <v-icon @click="handleDeleteImage(image.id)" color="red">
                    mdi-delete
                  </v-icon></v-img
                >
              </div>
            </v-col>
          </v-row>
        </template>
      </ExpansionPanelsItem>
    </ExpansionPanels>
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
        shortDescription: "",
        longDescription: "",
        categoryId: "",
        unitId: "",
        price: "",
        taxRatio: "",
        seofield: "",
        productBranches: [],
      },

      productImages: [],

      reset: false,
      maxSize: 512,
      isEdit: false,
      loadingForm: false,
      units: [],
      categories: [],
      branches: [],
      branchesId: [],
    };
  },
  methods: {
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
          reqName: "product/create",
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
      const productBranches = this.branchesId.map((branchId) => ({
        branchId,
        price: this.form.price,
        taxRatio: this.form.taxRatio,
      }));
      const data = {
        nameAr: this.form.nameAr,
        nameEn: this.form.nameEn,
        displayOrder: this.form.displayOrder,
        shortDescription: this.form.shortDescription,
        longDescription: this.form.longDescription,
        categoryId: this.form.categoryId,
        unitId: this.form.unitId,
        productBranches,
        seofield: this.form.seofield,
      };
      return data;
    },
    handleUpdate() {
      const data = {
        id: this.$route.params.id,
        nameAr: this.form.nameAr,
        nameEn: this.form.nameEn,
        displayOrder: this.form.displayOrder,
        shortDescription: this.form.shortDescription,
        longDescription: this.form.longDescription,
        categoryId: this.form.categoryId,
        unitId: this.form.unitId,
        seofield: this.form.seofield,
      };
      this.$http
        .put({
          reqName: "product/update",
          data,
        })
        .then(() => {
          this.$router.push("/all-products");
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
          reqName: `product/get-by-id-control?Id=${this.$route.params.id}`,
        })
        .then(({ data: response }) => {
          this.form = response.data;
          this.branchesId = response.data.productBranches.map(
            (branch) => branch.branchId
          );
          this.productImages = response.data.images;
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
    getCatgeroies() {
      this.$http
        .get({
          reqName: "category/paginated",
        })
        .then(({ data: response }) => {
          this.categories = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUnits() {
      this.$http
        .get({
          reqName: "unit/paginated",
        })
        .then(({ data: response }) => {
          this.units = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBranches() {
      this.$http
        .get({
          reqName: "branch/all",
        })
        .then(({ data: response }) => {
          this.branches = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleUpdatePhoto(e, objectData) {
      const image = objectData.file;
      const formData = new FormData();
      formData.append("Images", image);
      formData.append("ProductId", this.$route.params.id);
      this.$http
        .post({
          reqName: `product/add-multi-images`,
          data: formData,
        })
        .then((res) => {
          this.handleShow();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDeleteImage(id) {
      this.$http
        .delete({
          reqName: `product/delete-image?ProductImageId=${id}`,
        })
        .then((res) => {
          this.handleShow();
        })
        .finally(() => {
          this.reset = false;
        });
    },
    handleSave() {
      const formData = new FormData();
      const images = this.form.images.join(",");
      formData.append("Image", images);
      formData.append("ProductBranchId", this.$route.params.id);
      this.loadingForm = true;
      this.$http
        .post({
          reqName: `product/add-multi-images`,
          data: formData,
        })
        .then((res) => {
          this.rendering = false;

          setTimeout(() => {
            this.rendering = true;
          }, 10);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },
  },

  created() {
    if (this.isEdit) {
      this.handleShow();
    }
  },
  mounted() {
    Promise.all([this.getCatgeroies(), this.getUnits(), this.getBranches()]);
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
