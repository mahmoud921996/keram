<template>
  <div
    class="divider"
    :style="`height: ${height}px; background-color: var(--${backgroundColor})`"
  ></div>
</template>

<script>
export default {
  name: "Divider",
  props: {
    height: {
      type: String,
      default: () => "3",
    },
    backgroundColor: {
      type: String,
      default: () => "primary",
    },
  },
};
</script>
<style lang="scss">
@import "index.scss";
</style>