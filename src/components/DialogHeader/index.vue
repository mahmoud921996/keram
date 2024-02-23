<template>
  <div class="dialog-header">
    <h5 class="primary--text mb-1 text-capitalize">
      {{ title }}
    </h5>
    <Divider />
  </div>
</template>

<script>
export default {
  name: "dialog-header",
  props: ["title"],
};
</script>

<style lang="scss">
@import "index.scss";
</style>
