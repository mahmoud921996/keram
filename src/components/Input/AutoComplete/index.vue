<template>
  <v-autocomplete
    dense
    v-model="form[name]"
    :items="items"
    v-bind="$attrs"
    v-on="$listeners"
    :hint="hint"
    persistent-hint
    outlined
    :label="label"
    :menu-props="{
      bottom: true,
      offsetY: true,
      closeOnClick: true,
      closeOnContentClick: true,
      auto: true,
      overflowY: true,
    }"
    :prepend-inner-icon="icon"
  >
  </v-autocomplete>
</template>



<script>
export default {
  name: "InputAutoComplete",
  props: {
    name: {
      type: String,
      default: "",
    },
    form: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: () => "",
    },
    hint: {
      type: String,
      default: "",
    },
  },
};
</script>