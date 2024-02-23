<template>
  <v-tooltip top :color="color">
    <template #activator="{ on, attrs }">
      <v-btn
        v-if="noIcon"
        icon
        v-bind="[attrs, $attrs]"
        v-on="{ ...on, ...$listeners }"
      >
        <!-- <v-icon>{{ icon }}</v-icon> -->
        <img :src="require(`@/assets/imgs/icons/${icon}`)" width="18px" />
        <slot />
      </v-btn>

      <div v-else v-bind="[attrs, $attrs]" v-on="{ ...on, ...$listeners }">
        <slot />
      </div>
    </template>
    <span v-if="noIcon" v-html="text"> </span>
    <div v-else v-html="text"></div>
  </v-tooltip>
</template>

<script>
export default {
  name: "Tooltip",
  inheritAttrs: false,
  props: {
    text: {
      type: String || Number,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    noIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
