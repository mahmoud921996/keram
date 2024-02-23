<template>
  <v-switch
    v-bind="$attrs"
    hide-details
    @change="handleToggle"
    v-model="toggleValue"
  ></v-switch>
</template>

<script>
import { updateToggle } from "@/api/toggle";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    modelName: {
      type: String,
      default: null,
    },
    modelId: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: "visible",
    },
    value: {},
    validate: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    toggleValue: {
      handler(newValue) {
        this.toggleValue = newValue;
      },
      immediate: true,
    },
    value: {
      handler(value) {
        this.toggleValue = value;
      },
      immediate: true,
    },
    $route: {
      handler() {
        this.toggleValue = this.value;
      },
      immediate: true,
    },
  },
  data() {
    return {
      toggleValue: false,
    };
  },
  methods: {
    handleToggle(toggleValue) {
      event.stopPropagation();
      if (this.isEdit) {
        this.toggleRequest();
      } else {
        if (toggleValue === null) {
          toggleValue = false;
        }
        this.$emit("input", toggleValue);
      }
    },
    toggleRequest() {
      let reqData = {
        name: this.modelName,
        id: this.modelId,
      };
      updateToggle(reqData)
        .then(() => {})
        .catch(() => {
          this.toggleValue = !this.toggleValue;
        });
    },
  },
};
</script>



<style lang="scss">
@import "index.scss";
</style>