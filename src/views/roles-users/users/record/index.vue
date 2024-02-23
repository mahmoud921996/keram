<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("users") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" to="/users/add">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_user") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="user/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-imageURL="{ item }">
                <img
                  class="rounded-circle"
                  width="45"
                  height="45"
                  v-if="item.imageURL"
                  :src="item.imageURL"
                  alt="user logo"
                />
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="user/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>
              <template #item-actions="{ item }">
                <td class="d-flex align-center">
                  <ShowDialog
                    :title="$t('user_details')"
                    @handle-show="showItemDetails(item.id)"
                    :item="itemData"
                    :itemDetails="itemDetails"
                  />
                  <v-btn icon class="mx-1" :to="`/users/${item.id}/edit`">
                    <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <ImageDialog
                    :image="item.imageURL"
                    url="user/add-image"
                    deleteUrl="user/delete-image"
                    :hasDeleteOption="true"
                    :id="item.id"
                    @update-table="updateTable"
                  />
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
      showDialog: false,
      tableItem: {},
      itemData: {},
      itemDetails: [],
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
          name: "image",
          value: "imageURL",
          sortable: false,
          showColumn: true,
        },
        {
          name: "name",
          value: "name",
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
    showItemDetails(id) {
      this.$http
        .get({
          reqName: `user/get-by-id?Id=${id}`,
        })
        .then(({ data: response }) => {
          const { name, email, phone, roleName, userBranches } = response.data;
          this.itemData = {
            name,
            email,
            phone,
            roleName,
          };
          this.itemDetails = userBranches;
        });
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
