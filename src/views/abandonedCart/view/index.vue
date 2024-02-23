<template>
  <v-container class="mt-4">
    <v-row>
      <v-col col="12" md="8">
        <v-card class="page-card card-detail">
          <v-card-title class="primary white--text size-16 py-3">
            {{ $t("abandoned_cart_detail") }}</v-card-title
          >
          <v-card-text class="py-3">
            <v-row
              v-for="(item, index) in abandonedCart"
              :key="index"
              align="center"
            >
              <v-col cols="6" md="3">
                <v-img
                  :src="item.productImage"
                  max-width="100"
                  contain
                  :alt="item.productName"
                />
              </v-col>
              <v-col cols="6" md="3">
                <div class="d-flex flex-column justify-center align-center">
                  <p class="mb-0">{{ $t("product_name") }}</p>
                  <h5>{{ item.productName }}</h5>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="d-flex flex-column justify-center align-center">
                  <p class="mb-0">{{ $t("quantity") }}</p>
                  <h5>{{ item.productQuantity }}</h5>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="d-flex flex-column justify-center align-center">
                  <p class="mb-0">{{ $t("price") }}</p>
                  <h5>{{ item.price.toFixed(2) }} SAR</h5>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="primary white--text size-16 py-3">
            {{ $t("user_details") }}
          </v-card-title>
          <v-card-text class="py-3">
            <div class="d-flex align-center my-3">
              <v-avatar>
                <img :src="currentUser.imageURL" alt="" width="120" />
              </v-avatar>
              <div class="mx-3 size-18">{{ currentUser.name }}</div>
            </div>
            <div class="d-flex flex-column gap-md">
              <a
                :href="`mailto:${currentUser.email}`"
                rel="noopener noreferrer"
                target="_blank"
                class="font-color d-flex align-center"
              >
                <v-icon size="20" color="primary"> mdi-email-outline </v-icon>
                <span class="px-2" v-html="currentUser.email"></span>
              </a>
              <a
                :href="`https://api.whatsapp.com/send/?phone=${currentUser.phone}&text&app_absent=0`"
                rel="noopener noreferrer"
                target="_blank"
              >
                <v-btn color="#29a71a" depressed class="rounded-lg white--text">
                  <p class="d-flex align-center mb-0 gap-xs px-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#FFF" fill-rule="nonzero">
                        <path
                          d="M17.112 2.942C13.645-.533 8.143-.984 4.148 1.879.152 4.74-1.146 10.064 1.088 14.423L.026 19.535a.388.388 0 0 0 .471.455l5.05-1.188c4.379 2.159 9.689.86 12.555-3.07a9.864 9.864 0 0 0-.99-12.79zM15.537 15.41a7.88 7.88 0 0 1-9.022 1.455l-.704-.346-3.096.728.01-.038.641-3.092-.345-.675a7.724 7.724 0 0 1 1.441-9.018c3.059-3.034 8.017-3.034 11.075 0a7.726 7.726 0 0 1 0 10.986z"
                        />
                        <path
                          d="M15.263 13.142c-.38.593-.98 1.319-1.733 1.499-1.32.316-3.345.01-5.865-2.32l-.032-.028c-2.216-2.039-2.791-3.735-2.652-5.081.077-.764.718-1.455 1.26-1.906a.725.725 0 0 1 1.127.256l.815 1.819c.108.24.074.52-.09.727l-.412.531a.7.7 0 0 0-.064.786c.23.402.784.993 1.398 1.54.69.619 1.454 1.184 1.938 1.377.265.108.57.044.768-.16l.478-.478a.737.737 0 0 1 .715-.182l1.938.546a.722.722 0 0 1 .41 1.075z"
                        />
                      </g>
                    </svg>

                    <span class="mx-2">{{ $t("via_whatsapp") }}</span>
                  </p>
                </v-btn>
              </a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>






<script>
export default {
  name: "AbandonedCartView",
  data() {
    return {
      abandonedCart: [],
      currentUser: "",
    };
  },
  methods: {
    getAbandonedCart() {
      this.$http
        .get({
          reqName: `abandoned_cart/list?UserId=${this.$route.params.id}`,
        })
        .then(({ data: response }) => {
          this.abandonedCart = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCurrentUser() {
      this.$http
        .get({ reqName: `user/get-by-id?Id=${this.$route.params.id}` })
        .then(({ data: response }) => {
          this.currentUser = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    Promise.all([this.getCurrentUser(), this.getAbandonedCart()]);
  },
};
</script>