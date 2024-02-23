<template>
  <v-container class="mt-4">
    <v-card class="page-card pa-6 mx-auto">
      <v-card-title class="py-0">
        <h4>{{ $t("user_info") }}</h4>
      </v-card-title>
      <v-row class="mt-4">
        <v-col cols="12">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(SubmitForm)">
              <v-row align="center">
                <v-col cols="12" md="4">
                  <FormGroup rules="required" name="name" errorName="Name">
                    <template #default="{ attrs }">
                      <InputText
                        maxlength="100"
                        :label="$t('name')"
                        outlined
                        v-bind="attrs"
                        v-model="form.name"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>

                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="emailOrPhone"
                    errorName="EmailOrPhone"
                  >
                    <template #default="{ attrs }">
                      <InputText
                        :label="$t('emailOrPhone')"
                        outlined
                        v-bind="attrs"
                        v-model="form.emailOrPhone"
                        :disabled="isEdit"
                      >
                      </InputText>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="branches"
                    errorName="branchesId"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('branches')"
                        :items="branches"
                        outlined
                        v-bind="attrs"
                        v-model="form.branchesId"
                        item-text="name"
                        item-value="id"
                        multiple
                        chips
                        deletable-chips
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4">
                  <FormGroup
                    rules="required"
                    name="roleName"
                    errorName="roleName"
                  >
                    <template #default="{ attrs }">
                      <InputSelect
                        :label="$t('roleName')"
                        :items="roles"
                        outlined
                        v-bind="attrs"
                        v-model="form.roleId"
                        item-text="name"
                        item-value="id"
                      >
                      </InputSelect>
                    </template>
                  </FormGroup>
                </v-col>
                <v-col cols="12" md="4" v-if="!isEdit">
                  <FormGroup
                    rules="required"
                    name="password"
                    errorName="password"
                  >
                    <template #default="{ attrs }">
                      <InputPassword
                        v-bind="attrs"
                        name="password"
                        :label="$t('password')"
                        v-model="form.password"
                      />
                    </template>
                  </FormGroup>
                </v-col>
              </v-row> </v-form
          ></ValidationObserver>
        </v-col>
      </v-row>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          class="primary"
          min-width="150"
          @click="SubmitForm"
          :loading="loadingForm"
          >{{ $t("buttons.save") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>



<script>
export default {
  name: "Actions",
  data() {
    return {
      form: {
        name: "",
        emailOrPhone: "",
        password: "",
        branchesId: [],
        roleId: "",
      },

      isEdit: false,
      loadingForm: false,
      roles: [],
      branches: [],
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    generatePayload() {
      const payload = new FormData();
      for (let key in this.form) {
        if (key === "branchesId") {
          this.form.branchesId.forEach((id) => {
            payload.append("branchesId", id);
          });
        } else {
          payload.append(this.capitalizeFirstLetter(key), this.form[key]);
        }
      }
      if (this.isEdit) {
        payload.append("Id", this.$route.params.id);
        payload.delete("Password");
        payload.delete("EmailOrPhone");
      }
      return payload;
    },
    SubmitForm() {
      this.$refs.form.validate().then((success) => {
        if (success && !this.serverErrors) {
          this.onConfirm();
        }
      });
    },
    onConfirm() {
      this.loadingForm = true;
      if (this.isEdit) {
        this.handleUpdate();
      } else {
        this.handleCreate();
      }
    },
    handleCreate() {
      this.$http
        .post({
          reqName: "user/create",
          data: this.generatePayload(),
        })
        .then(({ data }) => {
          this.resetData();
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },
    handleUpdate() {
      this.$http
        .put({
          reqName: "user/update",
          data: this.generatePayload(),
        })
        .then(() => {
          this.$router.push("/users");
          this.resetData();
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },
    getBranches() {
      this.$http
        .get({
          reqName: "branch/all",
        })
        .then(({ data: response }) => {
          this.branches = response.data;
        });
    },
    handleShow() {
      this.$http
        .get({
          reqName: `user/get-by-id?Id=${this.$route.params.id}`,
        })
        .then(({ data: response }) => {
          this.form.name = response.data.name;
          this.form.emailOrPhone = response.data.phone || response.data.email;
          this.form.roleId = parseInt(response.data.roleId);
          // this.form.branchesId = response.data.userBranches.map(
          //   (userBranch) => userBranch.id
          // );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetData() {
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.$refs.form.reset();
      this.photo = null;
    },
    getRoles() {
      this.$http
        .get({
          reqName: "role/paginated",
        })
        .then(({ data: response }) => {
          this.roles = response.data;
        });
    },
  },
  mounted() {
    Promise.all([this.getRoles(), this.getBranches()]);
  },
  created() {
    if (this.isEdit) {
      this.handleShow();
    }
  },
  watch: {
    $route: {
      handler({ params }) {
        if (params.id) {
          this.isEdit = true;
        } else {
          this.isEdit = false;
        }
      },
      immediate: true,
    },
  },
};
</script>
