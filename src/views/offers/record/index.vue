<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("offers") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" to="/offers/add">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_offer") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="offer/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="offer/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>
              <template #item-actions="{ item }">
                <td class="d-flex align-center">
                  <ShowDialog
                    @handle-show="showItemDetails(item.id)"
                    :title="$t('offer_details')"
                    :item="itemData"
                  />
                  <v-btn icon class="mx-1" :to="`/offers/${item.id}/edit`">
                    <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                  </v-btn>
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
      reqName="offer/delete"
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
      showDialog: false,
      deleteDialog: false,
 
  
      itemData: {},
   
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
          name: "productName",
          value: "productName",
          sortable: false,
          showColumn: true,
        },
        {
          name: "amount",
          value: "amount",
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

    handleDeleteItem(item) {
      this.tableItem = item;
      this.deleteDialog = !this.deleteDialog;
    },
    showItemDetails(id) {
      this.$http
        .get({
          reqName: `offer/get-by-id?Id=${id}`,
        })
        .then(({ data: response }) => {
          const {
            nameAr,
            nameEn,
            productName,
            startDate,
            endDate,
            amount,
            minimumProdcutValue,
          } = response.data;
          this.itemData = {
            nameAr,
            nameEn,
            productName,
            startDate,
            endDate,
            amount,
            minimumProdcutValue,
          };
        });
    },
  },
};
</script>
