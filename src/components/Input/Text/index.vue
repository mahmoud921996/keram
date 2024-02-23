<template>
  <div>
    <v-text-field
      :autofocus="focus"
      persistent-hint
      v-bind="$attrs"
      :id="name"
      flat
      v-on="$listeners"
      outlined
      @input="clearServerErrors"
      class="input"
    >
      <template #append-outer>
        <slot name="append-outer" />
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    name: {
      type: String,
      default: () => "",
    },
    focus: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    clearServerErrors() {
      if (this.serverErrors) {
        this.$store.dispatch("ClearServerErrors");
      }
    },
  },
};
</script>



<style lang="scss">
@import "index.scss";
</style>