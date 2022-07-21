<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    helpTitle: String,
    helpText: String,
  },
};
</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-flex align-items-center justify-content-between p-4"
      >
        <h4 class="mb-0 font-size-18">{{ title }}</h4>

        <div class="position-absolute" style="right: 8%">
          <b-breadcrumb :items="items" class="m-0"></b-breadcrumb>
        </div>

        <b-button
          v-b-modal.help
          variant="transparent p-0"
          v-b-tooltip.hover
          title="Help"
        >
          <i class="bx bx-help-circle bx-sm toggle-right text-primary"></i>
        </b-button>
        <b-modal id="help" :title="helpTitle" hide-footer>
          <p v-html="helpText">
            {{ helpText }}
          </p>
        </b-modal>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>
