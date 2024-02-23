<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("coupons") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" to="/coupons/add">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_coupon") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="coupon/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="coupon/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>
              <template #item-actions="{ item }">
                <td class="d-flex align-center">
                  <ShowDialog
                    :title="$t('coupon_details')"
                    @handle-show="handleItemDetails(item.id)"
                    :item="itemData"
                  />
                  <v-btn icon class="mx-1" :to="`/coupons/${item.id}/edit`">
                    <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                  </v-btn>
                </td>
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>



<script>
export default {
  name: "BranchesRecord",
  data() {
    return {
      rendering: true,
      toggle_value: [],
      search: "",
      dialog: false,
      showDialog: false,
      tableItem: {},
      tableIndex: 0,
      itemData: {},
      form: {
        image: "",
      },
      photo: null,
      userId: null,
      reset: false,
      maxSize: 512,
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
          name: "code",
          value: "code",
          sortable: false,
          showColumn: true,
        },
        {
          name: "count",
          value: "count",
          sortable: false,
          showColumn: true,
        },

        {
          name: "branchName",
          value: "branchName",
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
  },
  methods: {
    handleDeleteImage() {
      this.form.image = null;
      this.photo = null;
    },
    handleUpdatePhoto(e, objectData) {
      this.form.image = objectData.file;
      this.photo = objectData.ImageUrl;
    },
    handleDelete() {
      this.$http
        .delete({
          reqName: `user/delete-image?Id=${this.userId}`,
        })
        .then((res) => {
          this.rendering = false;
          this.resetDate();
          setTimeout(() => {
            this.rendering = true;
          }, 10);
          // window.location.reload();
        })
        .finally(() => {
          this.dialog = false;
          this.reset = false;
        });
    },
    closeDialog() {
      this.dialog = false;
    },
    handleImage(item) {
      this.photo = item.avatarURL;
      this.dialog = true;
      this.userId = item.id;
    },
    handleSave() {
      const formData = new FormData();
      formData.append("Image", this.form.image);
      formData.append("id", this.userId);
      this.$http
        .post({
          reqName: `user/add-image`,
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
          this.dialog = false;
        });
    },
    resetDate() {
      this.photo = null;
      this.form.image = null;
      this.userId = null;
      this.reset = true;
    },
    submitDialog() {
      if (this.form.image) {
        this.handleSave();
      } else {
        this.handleDelete();
      }
    },
    handleItemDetails(id) {
      this.$http
        .get({
          reqName: `coupon/get-by-id?Id=${id}`,
        })
        .then(({ data: response }) => {
          const {
            code,
            minimumOrderValue,
            couponDescription,
            fixedValue,
            maxValueToApply,
            ratio,
            startDate,
            endDate,
          } = response.data;
          this.itemData = {
            code,
            minimumOrderValue,
            couponDescription,
            fixedValue,
            ratio,
            maxValueToApply,
            startDate,
            endDate,
          };
        });
    },
  },
};
</script>
