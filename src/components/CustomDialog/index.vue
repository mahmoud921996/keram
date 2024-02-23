<template>
  <v-dialog
    :max-width="maxWidth"
    :value="dialog"
    class="radius-8"
    @click:outside="$emit('close-dialog')"
    v-bind="$attrs"
  >
    <v-card class="dialog__card">
      <v-card-title class="pt-0 pb-1 px-0 d-block">
        <slot name="header"> </slot>
      </v-card-title>
      <v-card-text class="mt-3">
        <slot />
      </v-card-text>
      <v-card-actions class="py-0">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CustomDialog",
  inheritAttrs: false,
  props: {
    dialog: {
      default: false,
      type: Boolean,
    },
    maxWidth: {
      type: String,
      default: "500",
    },
    // heading: {
    //   type: String,
    //   default: "",
    // },
    // hasHeading: {
    //   type: Boolean,
    //   default: true,
    // },
    // resource: {
    //   type: String,
    //   default: "",
    // },
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>