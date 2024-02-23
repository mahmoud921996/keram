<template>
  <v-select
    v-bind="$attrs"
    :id="name"
    class="mt-1"
    :items="items"
    outlined
    v-on="$listeners"
    :menu-props="{ bottom: true, offsetY: true, closeOnClick: true }"
  >
    <template #prepend-inner>
      <slot name="prepend-inner" />
    </template>

    <template #item="{ item }" v-if="hasItemSlot">
      <slot name="item" :item="item" />
    </template>
    <template v-slot:selection="{ item }" v-if="hasSelectionSlot">
      <slot name="selection" :item="item" />
    </template>
    <template v-slot:append-item>
      <slot name="append-item" />
    </template>
  </v-select>
</template>


<script>
export default {
  name: "InputSelect",
  props: {
    name: {
      type: String,
      default: () => "",
    },

    items: {
      type: Array,
      default: () => [],
    },

    hasItemSlot: {
      type: Boolean,
      default: false,
    },
    hasSelectionSlot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>