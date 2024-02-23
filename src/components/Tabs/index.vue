<template>
  <v-list dense class="d-flex flex-row tabs transparent py-0">
    <v-list-item-group
      v-model="selectedItem"
      color="primary"
      class="d-flex flex-row"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="localePath(item.to)"
      >
        <v-list-item-icon v-html="item.icon"> </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "Tabs",
};
</script>