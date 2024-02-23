<template>
  <main class="auth--layer">
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <div class="auth__container">
          <v-row no-gutters class="fill-height">
            <v-col cols="12" md="6" class="hidden-sm-and-down">
              <div class="auth__right-side auth__right-side--layer"></div>
            </v-col>
            <v-col cols="12" md="6" class="text-center">
              <div
                class="auth__left-side light-primary relative d-flex justify-center align-start align-md-center"
              >
                <v-col>
                  <div class="auth__left-side__wrap-card">
                    <div class="move-radius">
                      <img
                        class="relative auth__left-side__wrap-card__img bounce"
                        :src="require(`@/assets/imgs/auth/${img}`)"
                        alt="photo"
                      />
                    </div>
                  </div>
                </v-col>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </main>
</template>
  
<script>
export default {
  name: "Start",
  props: {
    img: {
      type: String,
      default: () => "start.svg",
    },
  },
};
</script>
  