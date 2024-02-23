<template>
  <v-text-field
    type="number"
    v-bind="$attrs"
    :id="name"
    outlined
    flat
    v-on="$listeners"
  >
  </v-text-field>
</template>
  

<script>
export default {
  name: "InputNumber",
  props: {
    name: {
      type: String,
      default: () => "",
    },
  },
};
</script>