<template>
  <div>
    <template v-if="layoutDefault">
      <b-form-checkbox
        id="check"
        class="d-none"
        @change="collapseMenu($event)"
      ></b-form-checkbox>

      <!-- Header -->
      <Header />
      <!-- Fim do Header -->

      <!-- SideBar -->
      <SideBar />
      <!-- Fim do SideBar -->
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import SideBar from "@/components/side-bar";
import Header from "@/components/header";

export default {
  components: {
    SideBar,
    Header,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      layoutDefault: "getLayoutDefault",
      menuCollapsed: "getMenuCollapsed",
    }),
  },

  methods: {
    ...mapActions({
      changeMenuCollapsed: "changeMenuCollapsed",
    }),

    collapseMenu(event) {
      this.changeMenuCollapsed(event);
    },
  },
};
</script>