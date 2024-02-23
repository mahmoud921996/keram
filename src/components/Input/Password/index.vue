<template>
  <v-text-field
    :hint="hint"
    persistent-hint
    v-bind="$attrs"
    :id="name"
    class="mt-1"
    outlined
    :label="label"
    flat
    v-on="$listeners"
    @click:append="showPassword = !showPassword"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    :prepend-inner-icon="icon"
  >
  </v-text-field>
</template>



<script>
export default {
  name: "InputPassword",
  props: {
    // form: {
    //   type: Object,
    //   default: () => {},
    // },
    name: {
      type: String,
      default: () => "",
    },
    label: {
      type: String,
      default: () => null,
    },
    icon: {
      type: String,
      default: () => "",
    },
    hint: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>

