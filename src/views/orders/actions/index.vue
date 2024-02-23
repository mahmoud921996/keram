<template>
  <v-container class="mt-4">
    <v-card class="page-card">
      <v-card-title>order #{{ order.id }}</v-card-title>

      <v-card-text>
        <div class="d-flex align-center">
          <v-btn text small depressed :class="['white--text', orderStatus]">
            {{ order.orderStageName }}
          </v-btn>
          <v-spacer />
          <div>
            <v-btn
              color="primary"
              depressed
              min-width="120"
              class="mx-4"
              v-if="order.orderStageId === 1"
              @click="handleClick('on-way')"
            >
              {{ $t("on_way") }}
            </v-btn>
            <v-btn
              color="primary"
              depressed
              min-width="120"
              class="mx-4"
              @click="handleClick('deliverd')"
              v-if="order.orderStageId === 2"
            >
              {{ $t("deliver_order") }}
            </v-btn>
            <v-btn
              class="red"
              depressed
              min-width="120"
              v-if="order.orderStageId !== 5 && order.orderStageId !== 3"
              @click="handleClick('cancelled')"
            >
              {{$t("cancel_order")}}
            </v-btn>
          </div>
        </div>
        <v-row class="mt-4">
          <v-col cols="12" md="8">
            <!-- order details -->
            <vue-html2pdf
              :show-layout="false"
              :float-layout="true"
              :enable-download="true"
              :preview-modal="true"
              :paginate-elements-by-height="1400"
              filename="invoice"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="portrait"
              pdf-content-width="100%"
              @progress="onProgress($event)"
              @hasStartedGeneration="hasStartedGeneration()"
              @hasGenerated="hasGenerated($event)"
              ref="html2Pdf"
            >
              <section slot="pdf-content">
                <v-app>
                  <v-card class="page-card card-detail w-100">
                    <v-card-title class="primary white--text">
                      <h4>{{ $t("order_details") }}</h4>
                    </v-card-title>
                    <v-card-text class="py-3">
                      <v-row class="text-center">
                        <v-col cols="4" md="4">
                          <div>{{ $t("product_name") }}</div>
                        </v-col>
                        <v-col cols="4" md="4">
                          <div>{{ $t("quantity") }}</div>
                        </v-col>
                        <v-col cols="4" md="4">
                          <div>{{ $t("price") }}</div>
                        </v-col>
                      </v-row>
                      <v-row
                        v-for="(item, index) in order.orderDetails"
                        :key="index"
                        class="mb-4 text-center"
                      >
                        <v-col cols="4" md="4">
                          <h5>{{ item.productName }}</h5>
                        </v-col>
                        <v-col cols="4" md="4">
                          <h5>{{ item.count }}</h5>
                        </v-col>
                        <v-col cols="4" md="4">
                          <h5>{{ item.price }} SAR</h5>
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                      <v-row justify="center">
                        <v-col cols="12" class="py-0">
                          <v-row class="mt-3">
                            <v-col cols="6" md="8" class="py-0">
                              <h5>{{ $t("discount") }}</h5>
                            </v-col>
                            <v-col cols="6" md="4" class="py-0 text-center">
                              <h5>{{ order.discount }} SAR</h5>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6" md="8" class="py-0">
                              <h5>{{ $t("tax") }}</h5>
                            </v-col>
                            <v-col cols="6" md="4" class="py-0 text-center">
                              <h5>{{ order.vat }} SAR</h5>
                            </v-col>
                          </v-row>
                          <v-row class="mb-2">
                            <v-col cols="6" md="8" class="py-0">
                              <h5>{{ $t("shipping") }}</h5>
                            </v-col>
                            <v-col cols="6" md="4" class="py-0 text-center">
                              <h5>{{ order.shipmentValue }} SAR</h5>
                            </v-col>
                          </v-row>
                          <v-divider></v-divider>
                          <v-row class="mt-3">
                            <v-col cols="6" md="8">
                              <h5>{{ $t("total") }}</h5>
                            </v-col>
                            <v-col cols="6" md="4" class="py-0 text-center">
                              <h5>{{ order.amount }} SAR</h5>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-app>
              </section>
            </vue-html2pdf>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="user-info">
              <v-card-text>
                <div class="mb-3">
                  <h3 class="mb-3">{{ $t("user_info") }}</h3>
                  <div class="d-flex align-center mb-2 justify-space-between">
                    <h4 class="primary--text">{{ $t("name") }}:</h4>
                    <div>{{ order.customerName }}</div>
                  </div>
                  <div class="d-flex align-center mb-2 justify-space-between">
                    <h4 class="primary--text">{{ $t("address") }}:</h4>
                    <div>{{ order.address }}</div>
                  </div>
                  <div class="d-flex align-center mb-2 justify-space-between">
                    <h4 class="primary--text">{{ $t("payMethodName") }}:</h4>
                    <div>{{ order.payMethodName }}</div>
                  </div>
                  <div class="d-flex align-center justify-space-between mb-2">
                    <h4 class="primary--text">{{ $t("notes") }}:</h4>
                    <div>{{ order.notes }}</div>
                  </div>
                </div>
              </v-card-text>
              <v-btn color="primary" @click="generatePdf" depressed block>{{
                $t("print_preparing_invoice")
              }}</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <CustomDialog
      :dialog="dialog"
      max-width="600"
      @close-dialog="dialog = false"
    >
      <template #header>
        <DialogHeader :title="$t('order_stage')" />
      </template>
      <v-row>
        <v-col cols="12" v-if="order.orderStageName === 'On Way'">
          <InputSelect
            :items="order.orderDetails"
            v-model="form.returnedItems"
            itemText="productName"
            itemValue="id"
            :label="$t('products')"
            multiple
            deletable-chips
            chips
          />
        </v-col>
        <v-col cols="12">
          <InputTextArea
            v-model="form.notes"
            :label="$t('notes')"
            outlined
            rows="1"
          />
        </v-col>
      </v-row>
      <template #actions>
        <div class="d-flex justify-end w-100 gap-md">
          <v-btn
            outlined
            color="primary"
            min-width="120"
            @click="closeDialog"
            >{{ $t("buttons.cancel") }}</v-btn
          >
          <v-btn class="primary" min-width="120" @click="submitForm">{{
            $t("buttons.save")
          }}</v-btn>
        </div>
      </template>
    </CustomDialog>
  </v-container>
</template>


<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "OrderDetails",
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      order: {},
      currentUser: "",
      headers: [
        {
          text: "Product Name",
          value: "productName",
        },
        {
          text: "Quantity",
          value: "count",
        },
        {
          text: "Price",
          value: "price",
        },
      ],
      form: {
        returnedItems: [],
        notes: "",
      },
      dialog: false,
      requestedUrl: "",
    };
  },

  methods: {
    getOrderDetails() {
      this.$http
        .get({
          reqName: `order/get-by-id?Id=${this.$route.params.id}`,
        })
        .then(({ data: response }) => {
          this.order = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    generatePdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    changeStage() {},
    closeDialog() {
      this.dialog = false;
    },
    handleClick(status) {
      this.requestedUrl = status;
      this.dialog = true;
    },
    submitForm() {
      const data = {
        orderId: this.order.id,
        notes: this.form.notes,
      };
      if (this.requestedUrl === "deliverd") {
        const returnedItems = this.form.returnedItems.map((item) => {
          return {
            orderDetailId: item,
            note: this.form.notes,
          };
        });
        data.returnedItems = returnedItems;
      }

      this.$http
        .put({
          reqName: `order-stage/${this.requestedUrl}`,
          data,
        })
        .then(({ data: response }) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
  computed: {
    orderStatus() {
      if (this.order.orderStageId === 1) {
        return "secondary";
      } else if (this.order.orderStageId === 5) {
        return "error";
      } else if (this.order.orderStageId === 3) {
        return "primary";
      } else {
        return "blue";
      }
    },
  },
  mounted() {
    this.getOrderDetails();
  },
};
</script>



<style lang="scss">
@import "index.scss";
</style>