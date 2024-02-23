<template>
  <div>
    <CustomDialog
      :dialog="dialog"
      min-height="400"
      @close-dialog="dialog = false"
    >
      <template #header>
        <DialogHeader :title="$t('change_branch')" />
      </template>
      <v-list class="mt-4">
        <v-row justify="center">
          <v-col cols="12" md="8" class="py-0">
            <v-list-item
              v-for="(item, index) in branches"
              :key="index"
              @click="handleChangeBranch(item.id)"
              :disabled="currentBranch == item.id"
            >
              <v-btn
                outlined
                depressed
                rounded
                class="w-100 pa-4"
                :class="[currentBranch === item.id ? 'active-branch' : '']"
              >
                <v-icon left>mdi-map-marker-outline</v-icon>
                <span>{{ item.name }}</span>
              </v-btn>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </CustomDialog>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChangeBranchDialog",
  props: {
    branches: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      form: {
        branch: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      currentBranch: "getCurrentBranch",
    }),
  },
  mounted() {
    this.$eventBus.$on("on-change-branch", () => {
      this.dialog = true;
    });
  },
  methods: {
    handleChangeBranch(id) {
      const formData = new FormData();
      formData.append("BranchId", id);
      this.$http
        .put({
          reqName: "branch/encrypt-branch",
          data: formData,
        })
        .then(({ data: response }) => {
          window.location.reload();
          this.$store.commit("SET_BRANCH", response.data);
          this.$store.commit("SET_CURRENT_BRANCH", id);
          // Reload the page after changing the branch
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style lang="scss">
@import "index.scss";
</style>