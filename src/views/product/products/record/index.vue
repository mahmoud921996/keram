<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("products") }}</h4>
        <v-spacer />
        <v-btn depressed color="primary" to="/products/add">
          <v-icon left>mdi-plus-box-outline</v-icon>
          <span class="mx-1">{{ $t("add_product") }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="product/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>

              <template #item-images="{ item }">
                <img
                  class="rounded-circle"
                  width="45"
                  height="45"
                  v-if="item.images.length > 0"
                  :src="item.images[0].imageUrl"
                  alt="user logo"
                />
                <div v-else>-</div>
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="product/activate-deactivate"
                  :model-id="item.id"
                  field="isActive"
                  v-model="item.isActive"
                />
              </template>

              <template #item-actions="{ item }">
                <td class="d-flex align-center justify-center">
                  <ShowDialog
                    :title="$t('product_details')"
                    @handle-show="getItemData(item.id)"
                    :item="itemData"
                  />
                  <v-btn icon class="mx-1" :to="`/products/${item.id}/edit`">
                    <v-icon color="#4aa4d9">mdi-pencil-outline</v-icon>
                  </v-btn>
                  <ImageDialog
                    :id="item.id"
                    :image="item.images[0]?.imageUrl"
                    url="product/add-image"
                    :hasDeleteOption="false"
                    keyName="ProductId"
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
  name: "ProductsRecord",
  data() {
    return {
      rendering: true,
      itemData: null,
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
          value: "images",
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
          name: "price",
          value: "price",
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
    getItemData(id) {
      this.$http
        .get({
          reqName: `product/get-by-id-control?Id=${id}`,
        })
        .then(({ data: response }) => {
          const {
            nameAr,
            nameEn,
            unitName,
            categoryName,

            shortDescription,

            displayOrder,
            longDescription,
          } = response.data;
          this.itemData = {
            nameAr,
            nameEn,
            unitName,
            categoryName,

            shortDescription,

            displayOrder,
            longDescription,
          };
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

