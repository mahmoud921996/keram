<template>
  <v-card elevation="0" class="pa-3">
    <ShimmerLoader type="table" :loading="loading">
      <transition name="fade" mode="out-in">
        <v-data-table
          v-if="toggleTable"
          :mobile-breakpoint="0"
          :sort-desc.sync="sortDesc"
          :items="tableItems"
          :loading="loading"
          hide-default-footer
          class="table card-shadow"
          :items-per-page="per_page"
          :no-data-text="$t('no_data')"
          :loading-text="$t('loading')"
          v-bind="$attrs"
          v-on="$listeners"
          item-key="id"
          ref="table_ref"
        >
          <template #header>
            <thead>
              <tr>
                <th
                  class="text-center"
                  v-for="(header, index) in headers"
                  :key="index"
                >
                  <slot :name="'header-' + header.value">
                    {{ header.text }}
                  </slot>
                </th>
              </tr>
            </thead>
          </template>
          <template #item="{ item, index }">
            <tr>
              <td v-for="(header, headerIndex) in headers" :key="headerIndex">
                <slot
                  :name="'item-' + header.value"
                  :item="item"
                  :index="index"
                >
                  {{ item[header.value] }}
                </slot>
              </td>
            </tr>
          </template>
          <template slot="no-data">
            {{ $t(`no_data`) }}
          </template>
          <template #body.prepend>
            <slot name="prepend"></slot>
          </template>
        </v-data-table>
      </transition>
      <v-row class="my-3 mb-10" v-if="showPagination">
        <v-col cols="12" class="align-self-center order-lg-2">
          <Pagination />
        </v-col>
      </v-row>
    </ShimmerLoader>
  </v-card>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CustomTable",
  inheritAttrs: false,
  props: {
    reqName: {
      type: String,
      default: "",
    },
    tableHeaders: {
      type: Array,
      default: () => [],
    },
    itemsData: {
      type: Array,
      default: () => [],
    },
    fromStore: {
      type: Boolean,
      default: true,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      headers: [],
      loading: true,
      sortDesc: true,
      toggleTable: true,
      disableSort: false,
      per_page: 10,
    };
  },
  computed: {
    ...mapGetters({
      items: "getsTableItems",
      pagination: "getPagination",
    }),
    tableItems() {
      if (this.fromStore) {
        return this.items;
      } else {
        return this.itemsData;
      }
    },
  },
  mounted() {
    this.$eventBus.$on("on-refresh", () => {
      this.toggleTable = false;
      setTimeout(() => {
        this.toggleTable = true;
      }, 0);
    });
    this.$eventBus.$on("on-refetch-data", () => {
      this.getTableData();
    });
  },
  created() {
    this.createTableHeaders();
    if (this.reqName) {
      this.getTableData();
    }
  },
  methods: {
    ...mapActions({ getTableItems: "getTableItems" }),
    getTableData() {
      this.getTableItems({ reqName: this.reqName }).then(() => {
        this.loading = false;
      });
    },
    generateTableHeaders(headersName = []) {
      return headersName.map((header) => {
        return {
          text: header ? this.$t(`table.${header.name}`) : "",
          value: header.value,
          align: "start",
          sortable: header.sortable ? header.sortable : false,
        };
      });
    },
    createTableHeaders() {
      this.headers = this.generateTableHeaders(this.tableHeaders);
    },
  },
  watch: {
    getQuery: {
      handler(query) {
        if (query && Object.keys(query).length > 0) {
          this.getTableData();
        }
      },
      immediate: false,
    },
    reqName: {
      handler(value) {
        if (!value) this.loading = false;
      },
      immediate: true,
    },
  },
};
</script>


<style lang="scss">
@import "index.scss";
</style>