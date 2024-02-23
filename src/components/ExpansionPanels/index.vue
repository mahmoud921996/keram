<template>
  <v-expansion-panels accordion >
    <slot />
  </v-expansion-panels>
</template>



<script>
export default {
  name: "ExpansionPanels",
};
</script>

<style lang="scss">
@import "index.scss";
</style>