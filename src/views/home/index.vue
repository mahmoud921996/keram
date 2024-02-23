<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12" md="6" v-for="(item, index) in items" :key="index">
        <statistics-card
          :title="item.title"
          :count="item.count"
          :icon="item.icon"
          :color="item.color"
          :bgColor="item.bgColor"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      reports: [],
    };
  },
  computed: {
    items() {
      return [
        {
          title: this.$t("total_products"),
          count: this.reports.productsNo,
          icon: "mdi-chat",
          color: "#0da487",
          bgColor: "rgba(13, 164, 135, 0.1)",
        },
        {
          title: this.$t("total_orders"),
          count: this.reports.ordersNo,
          icon: "mdi-cart",
          color: "#747dc6",
          bgColor: "rgba(116,125,198,0.1)",
        },
        {
          title: this.$t("completed_orders"),
          count: this.reports.completedOrders,
          icon: "mdi-cash",
          color: "#ef3f3e",
          bgColor: "rgba(239,63,62,0.1)",
        },
        {
          title: this.$t("pending_orders"),
          count: this.reports.pendingOrders,
          icon: "mdi-timer-outline",
          color: "#9e65c2",
          bgColor: "rgba(158,101,194,0.1)",
        },
      ];
    },
  },
  methods: {
    getReports() {
      this.$http
        .get({
          reqName: "reports/get-branch-statistics",
        })
        .then(({ data: response }) => {
          this.reports = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getReports();
  },
};
</script>
