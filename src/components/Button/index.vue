<template>
  <v-btn v-on="$listeners" v-bind="$attrs" :width="width">
    <slot name="prepend" />
    <v-icon left v-if="icon">{{ icon }}</v-icon>
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  inheritAttrs: false,
  props: {
    width: {
      type: String,
      default: () => "",
    },
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>

