<template>
  <div>
    <Preloader />
    <SideBar :branches="branches" />
    <ChangeBranch :branches="branches" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  components: {
    SideBar: () => import("@/components/SideBar"),
    Preloader: () => import("@/components/Preloader"),
    ChangeBranch: () => import("@/components/ChangeBranch"),
  },
  data() {
    return {
      branches: [],
    };
  },
  methods: {
    getBranches() {
      this.$http
        .get({
          reqName: "branch/all",
        })
        .then(({ data: response }) => {
          this.branches = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getBranches();
  },
};
</script>
