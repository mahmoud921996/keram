<template>
  <section>
    <v-btn min-width="20px" text>
      <v-icon @mouseenter="handleShow" color="#747dc6">mdi-eye</v-icon>
    </v-btn>
    <CustomDialog
      maxWidth="900"
      :dialog="dialog"
      @close-dialog="dialog = false"
    >
      <template #header>
        <DialogHeader :title="$t(title)" />
      </template>
      <v-row>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="12" md="6" v-for="(value, key) in item" :key="key">
              <div class="d-flex align-center gap-md">
                <label class="seperated-label">{{ $t(key) }}</label>
                <p class="black--text mb-0">{{ value ? value : "-" }}</p>
              </div>
            </v-col>
          </v-row>
          <div
            v-for="(item, index) in filteredItemDetails"
            :key="index"
            class="mt-6"
          >
            <h4 class="mb-3 primary--text font-weight-bold">
              {{ $t("user_branches") }}
            </h4>
            <v-row>
              <v-col cols="12" md="6" v-for="(value, key) in item" :key="key">
                <div class="d-flex align-center gap-md">
                  <label class="seperated-label">{{ $t(key) }}</label>
                  <p class="black--text mb-0">{{ value }}</p>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </CustomDialog>
  </section>
</template>

<script>
export default {
  name: "Show",
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    // i want to remove id and image from itemDetails

    filteredItemDetails() {
      // i want to remove id and image from itemDetails
      return this.itemDetails.map(({ id, image, ...rest }) => rest);
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: () => "",
    },
    itemDetails: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleShow() {
      this.$emit("handle-show");
      this.dialog = true;
    },
  },
};
</script>