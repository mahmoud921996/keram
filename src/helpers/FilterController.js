import { isEqual } from "lodash";

class FilterController {
  constructor(vm) {
    this.vm = vm;
  }

  filter() {
    if (!isEqual(this.vm.query, this.vm.getQuery)) {
      this.removeEmptyFilterKey();
      if (Object.keys(this.vm.query).length !== 0)
        this.pushQuery({ ...this.vm.getQuery, page: 1 });
    }
  }

  pushQuery(query) {
    this.vm.$store.dispatch("setQuery", query);
  }

  removeEmptyFilterKey() {
    for (const key in this.vm.query) {
      if (this.vm.query[key] === "") {
        delete this.vm.query[key];
      }
    }
    this.pushQuery({ ...this.vm.getQuery });
    return;
  }

  resetFilter() {
    if (!this.vm.$route.path.includes("view")) {
      this.vm.query = {};
      this.vm.$store.dispatch("removeQuery");
      this.vm.$eventBus.$emit("on-refresh");
    }
  }
}

export default FilterController;
