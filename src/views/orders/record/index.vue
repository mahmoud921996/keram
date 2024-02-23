<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("orders") }}</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="order/paginated?GetActiveOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-orderStageName="{ item }">
                <v-btn
                  text
                  small
                  depressed
                  :class="orderStatus(item.orderStageId)"
                  class="white--text"
                >
                  {{ item.orderStageName }}
                </v-btn>
              </template>
              <template #item-actions="{ item }">
                <td class="d-flex align-center">
                  <ShowDialog
                    :title="$t('order_details')"
                    @handle-show="handleItemDetails(item.id)"
                    :item="itemData"
                  />
                  <v-btn
                    color="primary"
                    class="mx-1"
                    :to="`/orders/${item.id}/order-details`"
                    small
                    depressed
                  >
                    {{ $t("details") }}
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
      itemDetails: [],
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
          name: "customerName",
          value: "customerName",
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
          name: "amount",
          value: "amount",
          sortable: false,
          showColumn: true,
        },

        {
          name: "orderStage",
          value: "orderStageName",
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
    handleItemDetails(id) {
      this.$http
        .get({
          reqName: `order/get-by-id?Id=${id}`,
        })
        .then(({ data: response }) => {
          const filteredData = Object.keys(response.data)
            .filter(
              (key) =>
                !key.toLowerCase().includes("id") &&
                !key.toLowerCase().includes("orderdetails")
            )
            .reduce((obj, key) => {
              obj[key] = response.data[key];
              return obj;
            }, {});

          this.itemData = { ...this.itemData, ...filteredData };
          this.itemData.address = this.itemData.address?.addressDescription;
        });
    },
    orderStatus(status) {
      if (status === 1) {
        return "secondary";
      } else if (status === 2) {
        return "blue";
      } else if (status === 3) {
        return "primary";
      } else {
        return "red";
      }
    },
  },
};
</script>
