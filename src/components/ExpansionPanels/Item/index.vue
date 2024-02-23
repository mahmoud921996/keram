<template>
  <v-expansion-panel class="expansion-panel">
    <v-expansion-panel-header>
      <template v-slot:actions="{ open }" v-if="customIcon">
        <v-icon color="#454F5B">{{ open ? openIcon : closeIcon }} </v-icon>
      </template>
      <slot name="header"> </slot>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <slot name="content" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "Item",
  props: {
    customIcon: {
      type: Boolean,
      default: false,
    },
    openIcon: {
      type: String,
      default: "",
    },
    closeIcon: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>
