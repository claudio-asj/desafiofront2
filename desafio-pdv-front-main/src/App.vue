<template>
  <div id="app">
    <div class="page" v-if="loading">
      <b-spinner class="spinner" variant="primary" key="primary"></b-spinner>
    </div>
    <router-view
      :class="{
        content: layoutDefault,
        'content-collapsed': layoutDefault && menuCollapsed,
      }"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "getLoading",
      layoutDefault: "getLayoutDefault",
      menuCollapsed: "getMenuCollapsed",
    }),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

.page {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  z-index: 25;
  width: 100%;
  height: 100%;
}

.spinner {
  position: relative;
  top: 384px;
  left: 50%;
}

.content {
  margin-left: 250px;
  height: 100%;
  width: auto;
  transition: 0.5s;
  transition-property: margin-left;
}

.content-collapsed {
  margin-left: 60px;
}

@media only screen and (max-width: 992px) {
  .content {
    margin-left: auto;
  }
  .content-collapsed {
    margin-left: 60px;
  }
}
</style>
