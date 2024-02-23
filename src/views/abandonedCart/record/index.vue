<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("abandoned_cart") }}</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="abandoned_cart/users"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-actions="{ item }">
                <v-btn
                  depressed
                  icon
                  :to="`/abandoned-cart/${item.userId}/view`"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
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
          name: "userName",
          value: "userName",
          sortable: false,
          showColumn: true,
        },
        {
          name: "phone",
          value: "phone",
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
  },
};
</script>
