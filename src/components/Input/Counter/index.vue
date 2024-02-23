<template>
  <div class="counter-input">
    <v-row>
      <v-col cols="6" class="align-self-center">
        <v-label :for="name">
          <strong class="font-weight-dark px-2"> {{ $t(name) }}</strong>
        </v-label>
      </v-col>
      <v-col cols="6" class="algin-self-center">
        <v-text-field
          v-model="form[name]"
          readonly
          v-bind="$attrs"
          type="number"
          rounded
          v-on="$listeners"
          flat
          label=""
        >
          <template #prepend-inner>
            <v-btn
              small
              width="32px"
              height="32px"
              class="primary"
              @click.stop="onIncrement"
              :loading="$attrs.loadingIncrement"
              :disabled="form[name] >= max || !isValid"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <template #append>
            <v-btn
              :disabled="form[name] <= min || !isValid"
              small
              width="32px"
              height="32px"
              class="secondary"
              @click.stop="onDecrement"
              :loading="$attrs.loadingDecrement"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  name: "CounterInput",
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100000,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onDecrement() {
      if (this.form[this.name] > this.min) {
        this.form[this.name]--;
      }
      this.$emit("on-decrement");
    },
    onIncrement() {
      if (this.form[this.name] < this.max) {
        this.form[this.name]++;
        this.$emit("on-increment");
      }
    },
  },
};
</script>

<style lang="scss">
@import "index.scss";
</style>