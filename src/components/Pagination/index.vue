<template>
  <div class="text-xs-center">
    <!--       v-if="pagination.total > 0 && pagination.totalPages > 1" -->
    <v-pagination
      :value="pagination.currentPage"
      :length="pagination.totalPages"
      :total-visible="10"
      @input="handlePagination"
      circle
    ></v-pagination>
  </div>
</template>

<script>
import { isEqual } from "lodash";
import { mapGetters } from "vuex";
export default {
  name: "Pagination",
  data() {
    return {
      queries: {},
    };
  },
  computed: {
    ...mapGetters({
      items: "getsTableItems",
      pagination: "getPagination",
    }),
  },
  watch: {
    items: {
      handler(val) {
        const { currentPage, totalPages } = this.pagination;
        if (val.length === 0 && currentPage >= totalPages && totalPages > 1) {
          this.$store.dispatch("setQuery", {
            ...this.getQuery,
            page: currentPage - 1,
          });
        }
        if (
          val.length > this.pagination.pageSize &&
          this.getQuery.page >= totalPages
        ) {
          this.$store.dispatch("setQuery", {
            ...this.getQuery,
            page: currentPage + 1,
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handlePagination(page) {
      this.queries = { ...this.queries, ...this.getQuery, PageNumber: page };
      if (!isEqual(this.queries, this.getQuery)) {
        this.$store.dispatch("setQuery", this.queries);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
};
</script>
