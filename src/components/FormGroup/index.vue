<template>
  <ValidationProvider
    ref="ValidationProvider_ref"
    v-slot="{ errors }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot
      :attrs="{
        'error-messages':
          (serverErrors && serverErrors[$attrs.errorName]) || errors,
      }"
      :hasError="errors[0] || (serverErrors && serverErrors[$attrs.errorName])"
    />
    <!-- <p>
  <pre>
    {{errors}}
  </pre>
</p> -->
  </ValidationProvider>
</template>

<script>
export default {
  name: "FormGroup",
  inheritAttrs: false,

  data() {
    return {};
  },
  mounted() {},
  methods: {
    validateField(callbackFunction) {
      this.$refs.ValidationProvider_ref.validate().then(({ valid }) => {
        console.log(this.$refs.ValidationProvider_ref);
        if (valid) {
          callbackFunction();
        }
      });
    },
  },
};
</script>
