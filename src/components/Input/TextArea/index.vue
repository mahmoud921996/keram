<template>
  <v-textarea
    auto-grow
    :rows="rows"
    v-bind="$attrs"
    :id="name"
    class="mt-1"
    outlined
    v-on="$listeners"
  >
  </v-textarea>
</template>
<script>
export default {
  name: "InputTextarea",
  props: {
    name: {
      type: String,
      default: () => "",
    },
    rows: {
      type: String,
      default: () => "",
    },
  },
};
</script>
