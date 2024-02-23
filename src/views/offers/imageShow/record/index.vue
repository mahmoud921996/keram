<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("image-show") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" to="/image-show/add">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_image_show") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="imgShow/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-image="{ item }">
                <v-img :src="item.image" width="80" height="80" contain />
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="imgShow/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>
              <template #item-actions="{ item }">
                <td class="d-flex align-center">
                  <v-btn icon class="mx-1" :to="`/image-show/${item.id}/edit`">
                    <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <ImageDialog
                    :image="item.image"
                    url="imgShow/add-image"
                    deleteUrl="imgShow/delete-image"
                    :hasDeleteOption="true"
                    :id="item.id"
                    @update-table="updateTable"
                  />
                  <v-btn icon class="delete-btn">
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
    <GenericDialog
      :dialog.sync="deleteDialog"
      @update:dialog="closeDialog"
      :tableItem="tableItem"
      reqName="imgShow/delete"
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
      deleteDialog: false,
      tableItem: {},
      form: {
        image: "",
      },
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
          name: "orderPriority",
          value: "orderPriority",
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
