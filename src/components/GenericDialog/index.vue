<template>
  <v-dialog
    persistent
    max-width="400"
    :value="dialog"
    class="radius-8"
    @input="$emit('update:dialog')"
  >
    <v-card max-width="400" class="pb-2 radius-8">
      <v-card-text class="pa-5">
        <p class="text-center font-weight-bold">
          {{ $t("are_you_sure") }}
        </p>
      </v-card-text>
      <v-card-actions class="px-0 justify-center">
        <!-- if back-->
        <v-btn class="error" @click="$emit('update:dialog')">
          <span class="white--text">
            {{ $t(`buttons.cancel`) }}
          </span>
        </v-btn>
        <v-btn class="primary" @click="onConfirm">
          <span class="white--text"> {{ $t(`buttons.confirm`) }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GenericDialog",
  inheritAttrs: false,
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },
    tableItem: {
      type: Object,
      default: () => ({ id: "" }),
    },
    reqName: {
      type: String,
      default: "",
    },
    by: {
      type: String,
      default: "id",
    },
    isDelete: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    handleDelete() {
      this.$store
        .dispatch("deleteTableItem", {
          reqName: `${this.reqName}?Id=${this.tableItem[this.by]}`,
          id:this.tableItem.id
        })
        .then(() => this.$emit("update:dialog"));
    },
    onConfirm() {
      if (this.isDelete) {
        // in case delete item in table
        this.handleDelete();
      } else {
        // in case we need to confirm first before send request like block user
        this.$emit("on-confirm");
      }
    },
  },
};
</script>
