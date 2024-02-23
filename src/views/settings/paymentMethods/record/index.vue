<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>
        <h4>{{ $t("payment_methods") }}</h4>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <CustomTable
              v-if="rendering"
              :tableHeaders="headers"
              reqName="payment-method/all"
            >
              <template #item-#="{ item, index }">
                {{ index + 1 }}
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
  name: "PaymentMethodsRecord",
  data() {
    return {
      rendering: true,
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
      ];
      return headers.filter((head) => head.showColumn);
    },
  },
};
</script>
