<template>
  <v-card class="statistics">
    <div class="statistics__body" :style="`border-left: 3px solid ${color}`">
      <div class="d-flex align-center justify-space-between">
        <div class="statistics__body--media">
          <span>{{ title }}</span>
          <h4>{{ count }}</h4>
        </div>
        <div
          class="statistics__body--icon"
          :style="`background-color:${bgColor}`"
        >
          <v-icon :color="color">{{ icon }}</v-icon>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "StatisticsCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    count: {
      type: String,
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
    bgColor: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>