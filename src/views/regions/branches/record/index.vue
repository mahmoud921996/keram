<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("branches") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" to="/branches/add">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_branch") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="branch/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="branch/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>
              <template #item-actions="{ item }">
                <td class="d-flex align-center">
                  <v-btn icon class="mx-1" :to="`/branches/${item.id}/edit`">
                    <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <ImageDialog
                    :image="item.image"
                    url="branch/add-image"
                    deleteUrl="branch/delete-image"
                    :hasDeleteOption="true"
                    :id="item.id"
                    @update-table="updateTable"
                  />

                  <v-btn icon class="mx-1 delete-btn">
                    <v-icon color="#ef3f3e" @click="handleDeleteItem(item)"
                      >mdi-delete-outline</v-icon
                    >
                  </v-btn>
                </td>
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <CustomDialog :dialog="dialog" @close-dialog="closeDialog">
      <template #header>
        <div class="d-flex align-center w-100 mb-3">
          <h4>اضافه صوره للفرع</h4>
          <v-spacer />
          <v-icon color="primary" class="pointer" @click="closeDialog"
            >mdi-close</v-icon
          >
        </div>
      </template>

      <v-row>
        <v-col cols="12" class="relative" v-if="photo">
          <div class="photo_content">
            <v-img
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

            <!-- <h3 class="mx-5 mb-4">{{ $t("Product.productImage") }}</h3> -->
          </div>
        </v-col>
        <v-col cols="12" v-else>
          <ImageUpload
            class="my-3 mx-2"
            @fileSelected="handleUpdatePhoto"
            text="upload_img"
            :imgUrl="photo"
            :maxSize="maxSize"
            :reset="reset"
          ></ImageUpload>
        </v-col>
      </v-row>

      <template #actions>
        <div class="d-flex justify-end w-100">
          <v-btn class="primary" @click="submitDialog">{{
            $t("buttons.save")
          }}</v-btn>
        </div>
      </template>
    </CustomDialog>
    <GenericDialog
      :dialog.sync="deleteDialog"
      @update:dialog="closeDialog"
      :tableItem="tableItem"
      reqName="branch/delete"
    >
    </GenericDialog>
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
      form: {
        image: "",
      },
      photo: null,
      branchId: null,
      reset: false,
      maxSize: 512,
      deleteDialog: false,
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
          name: "address",
          value: "address",
          sortable: false,
          showColumn: true,
        },
        {
          name: "cityName",
          value: "cityName",
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
      console.log(this.photo);
    },
    handleDelete() {
      const formData = new FormData();
      formData.append("Id", this.branchId);
      this.$http
        .delete({
          reqName: `branch/delete-image`,
          data: formData,
        })
        .then((res) => {
          this.resetDate();
          this.updateTable();
          // window.location.reload();
        })
        .finally(() => {
          this.dialog = false;
          this.reset = false;
        });
    },
    closeDialog() {
      this.dialog = false;
      this.deleteDialog = false;
    },
    handleImage(item) {
      this.photo = item.image;
      this.dialog = true;
      this.branchId = item.id;
    },
    handleSave() {
      const formData = new FormData();
      formData.append("Image", this.form.image);
      formData.append("id", this.branchId);
      this.$http
        .post({
          reqName: `branch/add-image`,
          data: formData,
        })
        .then((res) => {
         this.updateTable();
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
      this.branchId = null;
      this.reset = true;
    },
    submitDialog() {
      if (this.form.image) {
        this.handleSave();
      } else {
        this.handleDelete();
      }
    },
    handleDeleteItem(item) {
      this.tableItem = item;
      this.deleteDialog = !this.deleteDialog;
    },
    updateTable() {
      this.rendering = false;
      setTimeout(() => {
        this.rendering = true;
      }, 10);
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