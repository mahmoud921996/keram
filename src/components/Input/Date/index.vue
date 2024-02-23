<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="currentDate"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        class="input-date"
        :value="dateValue"
        @input="handleChange"
        readonly
        v-bind="{ ...$attrs, ...attrs }"
        v-on="on"
        :id="name"
        outlined
      >
      </v-text-field>
    </template>
    <v-date-picker
      :min="min"
      :value="dateValue"
      @input="handleChange"
      no-title
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(currentDate)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>


<script>
export default {
  data() {
    const currentDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);
    return {
      currentDate,
      menu: false,
      dateValue: this.value,
    };
  },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: () => "",
    },
    min: {
      type: String,
      default: "",
    },
    svgColor: {
      type: String,
      default: "#0F6FFD",
    },
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleChange(val) {
      this.dateValue = val;
      this.$emit("input", val);
    },
  },

};
</script>


<style lang="scss">
@import "index.scss";
</style>