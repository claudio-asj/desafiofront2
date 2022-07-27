<template>
    <div>
    <Layout />
    <div class="page-container">
      <PageHeader
        title="Cadastro de Empresa"
        helpTitle="Cadastro de Empresa"
        :helpText="helpText"
      />
      <div class="my-container">
        <b-row>
            <b-col>
                <b-card>a</b-card>
            </b-col>
            <b-col>
                <b-card>b</b-card>
            </b-col>
        </b-row>
    </div>
  </div>
    </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import StateButtonBar from "@/components/state-button-bar";
import Layout from "@/layout/main";

export default {
  components: {
    PageHeader,
    StateButtonBar,
    Layout,
  }
}
</script>