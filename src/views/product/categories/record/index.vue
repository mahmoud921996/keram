<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("categories") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" to="/products/categories/add">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_category") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="category/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}</template
              >
              <template #item-image="{ item }">
                <img
                  class="rounded-circle mx-auto"
                  width="45"
                  height="45"
                  v-if="item.image"
                  :src="item.image"
                  alt="user logo"
              /></template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="category/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>
              <template #item-actions="{ item }">
                <td class="d-flex align-center">
                  <v-btn
                    icon
                    class="mx-1"
                    :to="`/products/categories/${item.id}/edit`"
                  >
                    <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <ImageDialog
                    :image="item.image"
                    url="category/add-image"
                    deleteUrl="category/delete-image"
                    :hasDeleteOption="true"
                    :id="item.id"
                    @update-table="updateTable"
                  />
                  <v-btn
                    icon
                    class="mx-1 delete-btn"
                    @click="handleDeleteItem(item)"
                  >
                    <v-icon color="#ef3f3e">mdi-delete-outline</v-icon>
                  </v-btn>
                </td>
              </template>
            </CustomTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <GenericDialog
      :dialog.sync="deleteDialog"
      @update:dialog="closeDialog"
      :tableItem="tableItem"
      reqName="category/delete"
    >
    </GenericDialog>
  </v-container>
</template>



<script>
export default {
  name: "CateoriesRecord",
  data() {
    return {
      rendering: true,
      toggle_value: [],
      search: "",
      dialog: false,
      deleteDialog: false,
      showDialog: false,
      tableItem: {},
      tableIndex: 0,
      form: {
        image: "",
      },
      photo: null,
      categoryId: null,
      reset: false,
      maxSize: 512,
      loading: false,
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
          name: "image",
          value: "image",
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
    closeDialog() {
      this.deleteDialog = false;
      this.tableItem = {};
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