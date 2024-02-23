<template>
  <section class="auth login-page">
    <Start img="login.png"></Start>
    <Preloader />
    <v-card
      class="auth__card-content move-card primary-radius py-md-6 px-md-11 col-md-4 col-12 px-2 py-4"
      max-width="490"
    >
      <h3
        class="light-primary primary-radius text-center py-3 px-2 mx-sm-16 mx-3"
      >
        {{ $t("heading.title") }}
      </h3>
      <v-card-text class="mt-7">
        <v-row>
          <v-col cols="12" class="mx-auto">
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(handleLogin)">
                <v-row>
                  <v-row class="mob-flex px-3"> </v-row>
                  <v-col cols="12" class="py-0 relative">
                    <FormGroup
                      rules="required|email"
                      name="email"
                      errorName="email"
                    >
                      <template #default="{ attrs }">
                        <InputText
                          v-bind="attrs"
                          id="email"
                          v-model="form.email"
                          focus
                          name="email"
                        />
                      </template>
                    </FormGroup>
                  </v-col>

                  <v-col cols="12" class="py-0 relative password-input">
                    <FormGroup
                      rules="required"
                      name="password"
                      errorName="password"
                    >
                      <template #default="{ attrs }">
                        <InputPassword
                          v-bind="attrs"
                          v-model="form.password"
                          id="password"
                          name="password"
                        />
                      </template>
                    </FormGroup>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-card-actions class="px-0 justify-center">
                      <v-btn
                        :loading="loading"
                        large
                        class="px-10 shadow"
                        block
                        color="primary"
                        type="submit"
                        >{{ $t("buttons.login") }}</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </ValidationObserver>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import { setLanguage } from "@/utils/languages";
import Start from "@/components/Start/index.vue";
import Preloader from "@/components/Preloader/index.vue";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      Pass: false,
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },

  methods: {
    handleLogin() {
      this.loading = true;
      this.$store
        .dispatch("Login", this.generatePayload())
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          // Handle error
          console.error("Login failed", error);
        })
        .finally(() => (this.loading = false));
    },
    generatePayload() {
      const formData = new FormData();
      formData.append("EmailOrPhone", this.form.email);
      formData.append("Password", this.form.password);
      return formData;
    },
  },
  components: { Start, Preloader },
};
</script>

<style lang="scss" >
@import "index.scss";
</style>
