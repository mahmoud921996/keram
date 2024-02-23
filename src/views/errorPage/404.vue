<template>
  <v-app id="404">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <div class="text-center">
          <!-- <lottie :options="undefinedAnimate" :width="600" class="pb-5" /> -->

          <img :src="require('/src/assets/imgs/404.svg')" />
          <h2 class="my-3 headline text-center">
            {{ $t("not_found") }}
          </h2>
          <div class="text-center">
            <v-btn color="primary" @click="goHome">{{ $t("go_home") }}</v-btn>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
<style scoped lang="css">
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}

.v-application h2.headline {
  font-family: inherit !important;
}
</style>
