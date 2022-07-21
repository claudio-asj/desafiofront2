<template>
  <div>
    <Layout />
    <div class="page-container">
      <PageHeader
        title="Detalhes da Venda"
        helpTitle="Detalhes da Venda"
        :helpText="helpText"
        :items="pageHeaderItems"
      />
      <div class="my-container">
        <b-card>
          <b-row>
            <b-col class="col-12 col-lg-3">
              <label for="empresa">Empresa</label>
              <b-form-input
                disabled
                type="text"
                class="mb-2"
                ref="empresa"
                id="empresa"
                v-model="novaVenda.empresa"
                autocomplete="off"
              >
              </b-form-input>
            </b-col>
            <b-col class="col-12 col-lg-3">
              <label for="cliente">Cliente</label>
              <b-form-input
                disabled
                type="text"
                class="mb-2"
                ref="cliente"
                id="cliente"
                v-model="novaVenda.cliente"
                autocomplete="off"
              >
              </b-form-input>
            </b-col>
            <b-col class="col-12 col-lg-3">
              <label for="cliente">Forma de Pagamento</label>
              <b-form-input
                disabled
                type="text"
                class="mb-2"
                ref="cliente"
                id="cliente"
                v-model="novaVenda.metodoPagamento"
                autocomplete="off"
              >
              </b-form-input>
            </b-col>
            <b-col class="col-12 col-lg-3">
              <label for="data">Data da Venda</label>
              <b-form-datepicker
                disabled
                class="mb-2"
                ref="data"
                id="data"
                placeholder="Escolha uma Data"
                v-model="novaVenda.dataVenda"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                autocomplete="off"
              ></b-form-datepicker>
            </b-col>
          </b-row>
        </b-card>

        <b-card>
          <b-table
            class="mb-0 my-table"
            sticky-header
            :items="novaVenda.produtos"
            :fields="fields"
            responsive="sm"
            :per-page="perPage"
            :current-page="currentPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
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
            <template #cell(valorUnitario)="data">
              R$ {{ data.item.valorUnitario.toFixed(2).replace(".", ",") }}
            </template>
            <template #cell(valorTotal)="data">
              R$ {{ data.item.valorTotal.toFixed(2).replace(".", ",") }}
            </template>
          </b-table>
          <div class="mt-2 d-flex" style="justify-content: space-between">
            <span>Total de registros: {{ novaVenda.produtos.length }}</span>
            <span>Valor Total: R$ {{ valorTotalCarrinho }}</span>
          </div>
          <hr />
          <div class="d-flex align-items-center justify-content-center">
            <ul class="pagination mb-0">
              <b-pagination
                v-model="currentPage"
                :total-rows="novaVenda.produtos.length"
                :per-page="perPage"
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

  async mounted() {
    await this.listEmpresas();
    await this.listClientes(this.$route.params.idEmpresa);
    this.novaVenda.idEmpresa = this.$route.params.idEmpresa;
    this.getVendaById(this.$route.params.idVenda);
  },

  data() {
    return {
      novaVenda: {
        idEmpresa: null,
        idCliente: null,
        dataVenda: null,
        metodoPagamento: null,
        produtos: [],
      },

      empresaResponse: [],
      clienteResponse: [],
      produtoResponse: [],

      fields: [
        { key: "produto", label: "Produto" },
        { key: "quantidade", label: "Quantidade" },
        { key: "valorUnitario", label: "Valor" },
        { key: "valorTotal", label: "Total do Item" },
      ],
      isBusy: false,
      currentPage: 1,
      perPage: 5,
      sortBy: "produto",
      sortDesc: false,
    };
  },

  watch: {},

  computed: {
    pageHeaderItems() {
      return [
        {
          text: "Relatório de Vendas",
          href: "/",
        },
        {
          text: "Detalhes da Venda",
          active: true,
        },
      ];
    },

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

    valorTotalCarrinho() {
      let valor = 0;
      this.novaVenda.produtos.forEach((produto) => {
        valor = valor + parseInt(produto.valorTotal);
      });
      return parseInt(valor).toFixed(2).replace(".", ",");
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

    async listClientes(idEmpresa) {
      this.changeLoading(true);
      this.listProdutos(idEmpresa);
      await this.$axios
        .get(`dominios/empresa/${idEmpresa}/cliente`)
        .then((response) => {
          this.clienteResponse = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar clientes!");
        });
      this.changeLoading(false);
    },

    async listProdutos(idEmpresa) {
      this.changeLoading(true);
      this.novaVenda.produtos = [];
      await this.$axios
        .get(`dominios/empresa/${idEmpresa}/produto`)
        .then((response) => {
          this.produtoResponse = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar produtos!");
        });
      this.changeLoading(false);
    },

    async getVendaById(idVenda) {
      this.changeLoading(true);
      await this.$axios
        .get(`empresa/${this.novaVenda.idEmpresa}/vendas/${idVenda}`)
        .then((response) => {
          this.novaVenda = Object.assign({}, response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao obter infornações da venda!");
        });
      this.changeLoading(false);
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