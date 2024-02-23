<template>
  <div>
    <div class="d-flex align-center">
      <v-chip :title="$t('tooltip.change_status')" @click="onToggle" style="cursor: pointer"
        :class="item[fieldName] ? 'success' : 'error'">
        <slot>
          {{ item[fieldName] ? $t("status.active") : $t("status.in_active") }}
        </slot>
      </v-chip>
    </div>
    <GenericDialog :dialog.sync="dialog" :isDelete="false" @on-confirm="confirm()" />
  </div>
</template>

<script>
export default {
  name: "CustomToggle",
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    fieldName: {
      type: String,
      default: ""
    },
    field: {
      type: String,
      default: "blocked"
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    onToggle() {
      this.dialog = !this.dialog;
    },
    confirm() {
      this.$emit('onConfirm')
      this.dialog = !this.dialog;

    }
  }
};
</script>
