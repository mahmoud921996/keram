<template>
  <v-snackbar
    top left
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :multi-line="true"
    :color="snackbar.color"
  >
    <span class="snack">{{ snackbar.text }}</span>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.getters.notification;
    },
  },
  methods: {
    closeNotification() {
      this.$store.dispatch("CloseNotification");
    },
  },
};
</script>
