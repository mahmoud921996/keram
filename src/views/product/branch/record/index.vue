<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("product_branches") }}</h4>
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          v-if="productId"
          @click="dialog = true"
          >{{ $t("link_with_branches") }}</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="4">
            <InputSelect
              :label="$t('products')"
              :items="products"
              outlined
              v-model="productId"
              item-text="name"
              item-value="id"
              @change="getItems"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              :fromStore="true"
            >
              <template #item-actions="{ item }">
                <v-btn icon class="mx-1 delete-btn">
                  <v-icon color="#ef3f3e" @click="handleDeleteItem(item.id)"
                    >mdi-delete-outline</v-icon
                  >
                </v-btn>
                <v-btn icon class="mx-1" @click="handleUpdate(item)">
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
        <DialogHeader :title="$t('link_with_branches')" />
      </template>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit()">
          <v-row>
            <v-col cols="12" class="relative">
              <FormGroup rules="required" name="branch" errorName="BranchId">
                <template #default="{ attrs }">
                  <InputSelect
                    :label="$t('branch')"
                    :items="branches"
                    outlined
                    v-model="form.branchId"
                    v-bind="attrs"
                    item-text="name"
                    item-value="id"
                  >
                  </InputSelect>
                </template>
              </FormGroup>
            </v-col>
            <v-col cols="12" class="relative">
              <FormGroup rules="required" name="price" errorName="Price">
                <template #default="{ attrs }">
                  <InputNumber
                    :label="$t('price')"
                    outlined
                    v-model="form.price"
                    v-bind="attrs"
                  >
                  </InputNumber>
                </template>
              </FormGroup>
            </v-col>
            <v-col cols="12" class="relative">
              <FormGroup rules="required" name="taxRatio" errorName="TaxRatio">
                <template #default="{ attrs }">
                  <InputNumber
                    :label="$t('taxRatio')"
                    outlined
                    v-model="form.taxRatio"
                    v-bind="attrs"
                  >
                  </InputNumber>
                </template>
              </FormGroup>
            </v-col>
            <v-col cols="12" class="relative">
              <FormGroup
                rules="required"
                name="displayOrder"
                errorName="DisplayOrder"
              >
                <template #default="{ attrs }">
                  <InputNumber
                    :label="$t('displayOrder')"
                    outlined
                    v-model="form.displayOrder"
                    v-bind="attrs"
                  >
                  </InputNumber>
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ProductBranches",
  data() {
    return {
      rendering: true,
      toggle_value: [],
      dialog: false,
      search: "",
      form: {
        price: "",
        taxRatio: "",
        branchId: "",
        displayOrder: "",
      },
      tableItem: {},
      tableIndex: 0,
      deleteDialog: false,
      branches: [],
      products: [],
      productId: "",
      productBranchId: "",
      isEdit: false,
    };
  },
  methods: {
    ...mapActions({
      getTableItems: "getTableItems",
    }),
    handleDeleteItem(id) {
      this.$http
        .put({
          reqName: "product/delete-product-branch",
          data: { productBranchId: id },
        })
        .then(() => {
          this.getItems();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeDialog() {
      this.deleteDialog = false;
      this.tableItem = {};
      this.dialog = false;
      this.isEdit = false;
      this.form.branchId = "";
      this.$refs.form.reset();
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
    async addProductBranch() {
      try {
        await this.$http.put({
          reqName: "product/add-multi-product-branch",
          data: this.generatePayload(),
        });
        this.resetData();
        this.getItems();
      } catch (error) {
        console.error(error);
      }
    },
    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success && !this.serverErrors) {
          this.onConfirm();
        }
      });
    },
    onConfirm() {
      if (this.isEdit) {
        this.updateProductBranch();
      } else {
        this.addProductBranch();
      }
    },
    generatePayload() {
      const branch = {
        branchId: this.form.branchId,
        price: this.form.price,
        taxRatio: this.form.taxRatio,
        displayOrder: this.form.displayOrder,
      };
      const data = {
        productBranches: [branch],
      };
      data.productId = this.productId;

      return data;
    },
    resetData() {
      this.form.branchId = null;
      this.form.price = "";
      this.form.taxRatio = "";
      this.form.displayOrder = "";
      this.isEdit = false;
      this.$refs.form.reset();
      this.dialog = false;
    },
    getItems() {
      this.getTableItems({
        reqName: `product/get-by-id-control?Id=${this.productId}`,
        selectedKey: "productBranches",
      });
    },
    getProducts() {
      this.$http
        .get({
          reqName: "product/paginated",
        })
        .then(({ data: response }) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleUpdate(item) {
      console.log(item);
      const { branchId, price, taxRatio, id } = item;
      this.productBranchId = id;
      this.form.branchId = branchId;
      this.form.price = price;
      this.form.taxRatio = taxRatio;
      this.isEdit = true;
      this.dialog = true;
    },
    updateProductBranch() {
      const productBranchData = {
        productBranchId: this.productBranchId,
        price: this.form.price,
        taxRatio: this.form.taxRatio,
        displayOrder: this.form.displayOrder,
      };
      this.$http
        .put({
          reqName: "product/update-multi-product-branch",
          data: { productBranches: [productBranchData] },
        })
        .then(() => {
          this.resetData();
          this.getItems();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.$store.dispatch("resetTableItems");
    Promise.all([this.getProducts(), this.getBranches()]);
  },
  computed: {
    ...mapGetters({
      getsTableItems: "getsTableItems",
    }),
    headers() {
      const headers = [
        {
          name: "branchName",
          value: "branchName",
          sortable: false,
          showColumn: true,
        },
        {
          name: "price",
          value: "price",
          sortable: false,
          showColumn: true,
        },
        {
          name: "taxRatio",
          value: "taxRatio",
          sortable: false,
          showColumn: true,
        },
        {
            name:"costPrice",
            value:"costPrice",
            sortable:false,
            showColumn:true,
        },
        {
          name: "quantityIn",
          value: "quantityIn",
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
};
</script>