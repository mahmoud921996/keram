<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("customer_reviews") }}</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="customer_review/paginated?GetVerifiedOnly=false"
            >
              <template #item-#="{ item, index }">
                {{ index + pagination.from }}
              </template>
              <template #item-avatarURL="{ item }">
                <img
                  class="rounded-circle"
                  width="45"
                  height="45"
                  v-if="item.avatarURL"
                  :src="item.avatarURL"
                  alt="user logo"
                />
              </template>
              <template #item-isActive="{ item }">
                <toggle-service
                  :is-edit="true"
                  model-name="customer_review/verify"
                  :model-id="item.id"
                  v-model="item.isVerified"
                />
              </template>
              <template #item-actions="{item}">
                <ShowDialog
                  :title="$t('customer_review')"
                  @handle-show="showItemDetails(item.id)"
                  :item="itemData"
                />
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
  name: "CustomerReveiew",
  data() {
    return {
      rendering: true,
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
          value: "nickName",
          sortable: false,
          showColumn: true,
        },
        {
          name: "review",
          value: "detailReview",
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
          reqName: `customer_review/get-by-id?Id=${id}`,
        })
        .then(({ data: response }) => {
          const { nickName, detailReview, rating, orderId } = response.data;
          this.itemData = { nickName, detailReview, rating, orderId };
        });
    },
  },
};
</script>