<template>
  <div>
    <Layout />
    <div class="page-container">
      <PageHeader
        title="Relatório de Vendas"
        helpTitle="Relatório de Vendas"
        :helpText="helpText"
      />
      <div class="my-container">
        <b-card>
          <b-card-title>Filtros</b-card-title>
          <b-row>
            <b-col class="col-12 col-md-6 col-lg-4">
              <label for="empresa">Empresa</label>
              <b-form-select
                class="mb-2"
                ref="empresa"
                id="empresa"
                @change="listVendas"
                v-model="idEmpresa"
                autocomplete="off"
              >
                <option :value="null"></option>
                <option
                  v-for="empresa in empresaResponse"
                  :key="empresa.idEmpresa"
                  :value="empresa.idEmpresa"
                >
                  {{ empresa.nomeFantasia }}
                </option>
              </b-form-select>
            </b-col>
            <b-col class="col-12 col-md-6 col-lg-4">
              <label for="cliente">Cliente</label>
              <b-form-select
                class="mb-2"
                ref="cliente"
                id="cliente"
                v-model="nomeCliente"
                autocomplete="off"
              >
                <option :value="null"></option>
                <option
                  v-for="(cliente, index) in clienteOptions"
                  :key="index"
                  :value="cliente"
                >
                  {{ cliente }}
                </option>
              </b-form-select>
            </b-col>
            <b-col class="col-12 col-lg-4">
              <label for="data">Data da Venda</label>
              <b-form-select
                class="mb-2"
                ref="cliente"
                id="cliente"
                v-model="dataVenda"
                autocomplete="off"
              >
                <option :value="null"></option>
                <option
                  v-for="(dataVenda, index) in dataVendaOptions"
                  :key="index"
                  :value="dataVenda"
                >
                  {{ dataVenda }}
                </option>
              </b-form-select>
            </b-col>
          </b-row>
        </b-card>

        <b-card>
          <b-table
            class="mb-0 my-table"
            sticky-header
            :items="vendasItems"
            :fields="fields"
            responsive="sm"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @row-clicked="myRowClicked"
            ref="mytable"
            :busy="isBusy"
            bordered
            selectable
            select-mode="single"
            selected-variant="primary"
            striped
            hover
            style="cursor: pointer"
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner small class="align-middle mr-2"></b-spinner>
                <strong>Carregando...</strong>
              </div>
            </template>
            <template #cell(dataVenda)="data">
              {{
                data.item.dataVenda.split(" ")[0].split("-").reverse().join("/")
              }}
            </template>
            <template #cell(valorTotal)="data">
              R$ {{ data.item.valorTotal.toFixed(2).replace(".", ",") }}
            </template>
          </b-table>
          <div class="mt-2">Total de registros: {{ rows }}</div>
          <hr />
          <div class="d-flex align-items-center justify-content-center">
            <ul class="pagination mb-0">
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                :disabled="!Boolean(rows)"
              >
                <template>
                  <div slot="first-text">
                    <i class="fas fa-angle-double-left"></i>
                  </div>
                  <div slot="prev-text">
                    <i class="fas fa-angle-left"></i>
                  </div>
                  <div slot="next-text">
                    <i class="fas fa-angle-right"></i>
                  </div>
                  <div slot="last-text">
                    <i class="fas fa-angle-double-right"></i>
                  </div>
                </template>
              </b-pagination>
            </ul>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layout/main";
import { mapActions } from "vuex";

export default {
  components: {
    PageHeader,
    Layout,
  },

  mounted() {
    this.listEmpresas();
  },

  data() {
    return {
      novoItem: {
        idProduto: null,
        produto: null,
        quantidade: null,
        valorBase: null,
      },

      idEmpresa: null,
      nomeCliente: null,
      dataVenda: null,
      vendaSelected: {},

      empresaResponse: [],
      vendaResponse: { content: [] },

      editMode: false,

      fields: [
        { key: "empresa", label: "Empresa" },
        { key: "cliente", label: "Cliente" },
        { key: "dataVenda", label: "Data da Venda" },
        { key: "valorTotal", label: "Valor Total" },
      ],
      isBusy: false,
      currentPage: 1,
      perPage: 5,
      sortBy: "dataVenda",
      sortDesc: false,
    };
  },

  watch: {
    currentPage: function (novo) {
      this.listVendas(this.idEmpresa, novo - 1);
    },
  },

  computed: {   
    helpText() {
      return `
      <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          praesentium repudiandae asperiores voluptatem consequatur harum,
          voluptate nulla.
      </p>
      <p>
          Quis consectetur accusantium quia consequuntur hic
          soluta. Minus nisi illum ab architecto exercitationem?
      </p>    
      `;
    },

    vendasItems() {
      let items = Object.assign([], this.vendaResponse.content);
      if (this.dataVenda) {
        items = items.filter(
          (v) =>
            v.dataVenda.split(" ")[0].split("-").reverse().join("/") ===
            this.dataVenda.split(" ")[0].split("-").reverse().join("/")
        );
      }
      if (this.nomeCliente) {
        items = items.filter((v) => v.cliente === this.nomeCliente);
      }
      return items;
    },

    clienteOptions() {
      return new Set(this.vendaResponse.content.map((v) => v.cliente));
    },

    dataVendaOptions() {
      return new Set(
        this.vendaResponse.content.map((v) =>
          v.dataVenda.split(" ")[0].split("-").reverse().join("/")
        )
      );
    },

    rows() {
      return this.vendaResponse.totalElements;
    },
  },

  methods: {
    ...mapActions({
      changeLoading: "changeLoading",
    }),

    async listEmpresas() {
      this.changeLoading(true);
      await this.$axios
        .get("dominios/empresa")
        .then((response) => {
          this.empresaResponse = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar empresas!");
        });
      this.changeLoading(false);
    },

    async listVendas(idEmpresa, page) {
      this.cleanForm();
      if (idEmpresa) {
        this.isBusy = true;
        await this.$axios
          .get(`empresa/${idEmpresa}/venda`, { page })
          .then((response) => {
            this.vendaResponse = Object.assign({}, response.data);
          })
          .catch(() => {
            this.$toasted.error("Falha ao listar vendas!");
          });
        this.isBusy = false;
      }
    },

    myRowClicked(record) {
      this.$router
        .push({
          name: "detalhe-venda",
          params: { idEmpresa: record.idEmpresa, idVenda: record.idVenda },
        })
        .catch(() => {});
    },

    cleanForm() {
      this.vendaResponse = { content: [] };
      this.nomeCliente = null;
      this.dataVenda = null;
    },
  },
};
</script>

<style scoped>
.my-container {
  margin: 10px;
  padding-bottom: 50px;
}
</style>