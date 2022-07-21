<template>
  <div>
    <Layout />
    <div class="page-container">
      <PageHeader
        title="Cadastro de Venda"
        helpTitle="Cadastro de Venda"
        :helpText="helpText"
      />
      <div class="my-container">
        <b-card>
          <b-row>
            <b-col class="col-12 col-lg-3">
              <label for="empresa">Empresa</label>
              <b-form-select
                class="mb-2"
                ref="empresa"
                id="empresa"
                @change="listClientes"
                v-model="novaVenda.idEmpresa"
                autocomplete="off"
              >
                <option :value="{}"></option>
                <option
                  v-for="empresa in empresaResponse"
                  :key="empresa.idEmpresa"
                  :value="empresa.idEmpresa"
                >
                  {{ empresa.nomeFantasia }}
                </option>
              </b-form-select>
            </b-col>
            <b-col class="col-12 col-lg-3">
              <label for="cliente">Cliente</label>
              <b-form-select
                class="mb-2"
                ref="cliente"
                id="cliente"
                v-model="novaVenda.idCliente"
                autocomplete="off"
              >
                <option :value="{}"></option>
                <option
                  v-for="cliente in clienteResponse"
                  :key="cliente.idCliente"
                  :value="cliente.idCliente"
                >
                  {{ cliente.nome }}
                </option>
              </b-form-select>
            </b-col>
            <b-col class="col-12 col-lg-3">
              <label for="cliente">Forma de Pagamento</label>
              <b-form-select
                class="mb-2"
                ref="cliente"
                id="cliente"
                v-model="novaVenda.metodoPagamento"
                autocomplete="off"
              >
                <option :value="{}"></option>
                <option
                  v-for="(metodo, index) in [
                    'PENDENTE',
                    'DINHEIRO',
                    'CREDITO',
                    'DEBITO',
                    'PIX',
                  ]"
                  :key="index"
                  :value="metodo"
                >
                  {{ metodo }}
                </option>
              </b-form-select>
            </b-col>
            <b-col class="col-12 col-lg-3">
              <label for="data">Data da Venda</label>
              <b-form-datepicker
                class="mb-2"
                ref="data"
                id="data"
                placeholder="Escolha uma Data"
                v-model="novaVenda.dataVenda"
                autocomplete="off"
                :min="minDate"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
              ></b-form-datepicker>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-card-title>Produtos</b-card-title>
          <b-row>
            <b-col
              class="col-9 col-md-3"
              :class="{ 'col-12 col-md-5': !produtoSelected.imagemProduto }"
            >
              <label for="produto">Produto</label>
              <b-form-select
                :disabled="Boolean(!novaVenda.idEmpresa)"
                class="mb-2"
                ref="produto"
                id="produto"
                @change="getProdutoById"
                autocomplete="off"
                v-model="novoItem.idProduto"
              >
                <option :value="{}"></option>
                <option
                  v-for="produto in produtoResponse"
                  :key="produto.idProduto"
                  :value="produto.idProduto"
                >
                  {{ produto.produto }}
                </option>
              </b-form-select>
            </b-col>
            <b-col
              v-if="this.produtoSelected.imagemProduto"
              class="col-3 col-md-2 img-produto"
            >
              <img
                :src="`data:image/jpeg;base64,${this.produtoSelected.imagemProduto}`"
                alt=""
              />
            </b-col>
            <b-col class="col-12 col-md-2">
              <label for="quantidade">Quantidade</label>
              <b-form-input
                :disabled="Boolean(!novaVenda.idEmpresa)"
                class="mb-2"
                ref="quantidade"
                id="quantidade"
                type="number"
                :min="1"
                v-model="novoItem.quantidade"
                autocomplete="off"
              >
              </b-form-input>
            </b-col>
            <b-col class="col-12 col-md-5">
              <label for="valor">Valor</label>
              <b-input-group prepend="R$">
                <b-form-input
                  disabled
                  ref="valor"
                  id="valor"
                  type="text"
                  :value="valorTotal"
                  autocomplete="off"
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button-group>
                    <b-button
                      class="ml-1"
                      :disabled="!editMode"
                      @click="removeCarrinho"
                    >
                      <i class="bx bx-minus ml-1"></i>
                      Remover
                    </b-button>
                    <b-button
                      class="ml-1"
                      :disabled="editMode || !novoItem.idProduto"
                      @click="addCarrinho"
                    >
                      <i class="bx bx-check ml-1"></i>
                      Adicionar
                    </b-button>
                  </b-button-group>
                </b-input-group-append>
              </b-input-group>
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
            @row-selected="setRowSelected"
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
            <template #cell(valorBase)="data">
              R$ {{ data.item.valorBase }}
            </template>
            <template #cell(valorTotal)="data">
              R$ {{ data.item.valorTotal }}
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
      <StateButtonBar
        excluir
        excluirDisabled
        novo
        :novoFunction="novo"
        cancelar
        :cancelarFunction="cancelar"
        salvar
        :salvarFunction="salvarVenda"
        :oldObj="oldObj"
        :newObj="newObj"
        :camposObrigatorios="[
          'idEmpresa',
          'idCliente',
          'metodoPagamento',
          'dataVenda',
          'produtos',
        ]"
      />
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import StateButtonBar from "@/components/state-button-bar";
import Layout from "@/layout/main";
import { mapActions } from "vuex";

export default {
  components: {
    PageHeader,
    StateButtonBar,
    Layout,
  },

  async mounted() {
    await this.listEmpresas();
  },

  data() {
    return {
      // Objeto da venda a ser salva
      novaVenda: {
        idEmpresa: null,
        idCliente: null,
        dataVenda: null,
        metodoPagamento: null,
        produtos: [],
      },

      // Objeto a ser inserido no carrinho
      novoItem: {
        idProduto: null,
        produto: null,
        imagem: null,
        quantidade: null,
        valorBase: null,
      },

      vendaSelected: {},
      produtoSelected: {},

      // Respostas dos getAll
      empresaResponse: [],
      clienteResponse: [],
      produtoResponse: [],

      editMode: false,

      // Dados da tabela
      fields: [
        { key: "produto", label: "Produto" },
        { key: "quantidade", label: "Quantidade" },
        { key: "valorBase", label: "Valor" },
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
    // Texto do help
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

    // Data mínima para venda
    minDate() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return new Date(today);
    },

    valorTotal() {
      return this.produtoSelected.idProduto
        ? (this.produtoSelected.valorBase * this.novoItem.quantidade)
            .toFixed(2)
            .replace(".", ",")
        : null;
    },

    valorTotalCarrinho() {
      let valor = 0;
      this.novaVenda.produtos.forEach((produto) => {
        valor = valor + parseInt(produto.valorTotal);
      });
      return parseInt(valor).toFixed(2).replace(".", ",");
    },

    newObj() {
      return this.novaVenda;
    },

    oldObj() {
      return this.vendaSelected;
    },
  },

  methods: {
    // Métodos do Vuex
    ...mapActions({
      changeLoading: "changeLoading",
    }),

    // Método getAll Empresas
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

    // Método getAll Clientes
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

    // Método getAll Produtos
    async listProdutos(idEmpresa) {
      this.changeLoading(true);
      this.cleanForm();
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

    // Método getById Produto
    async getProdutoById(idProduto) {
      this.changeLoading(true);
      await this.$axios
        .get(`empresa/${this.novaVenda.idEmpresa}/produto/${idProduto}`)
        .then((response) => {
          this.produtoSelected = Object.assign({}, response.data);         
          this.novoItem.quantidade = 1;
        })
        .catch(() => {
          this.$toasted.error("Falha ao obter infornações do produto!");
        });
      this.changeLoading(false);
    },

    setRowSelected(record) {
      if (record.length > 0) {
        this.editMode = true;
        this.rowSelected = Object.assign([], record);
        this.novoItem = Object.assign({}, record[0]);
      }
    },

    addCarrinho() {
      let inCarrinho = this.novaVenda.produtos.find(
        (p) => p.idProduto === this.produtoSelected.idProduto
      );
      if (inCarrinho) {
        if (inCarrinho.quantidade === this.novoItem.quantidade) {
          this.$toasted.info("Produto já está no carrinho!");
          return;
        } else {
          const index = this.novaVenda.produtos.findIndex(
            (v) => v.idProduto === this.novoItem.idProduto
          );
          this.novaVenda.produtos.splice(index, 1);
        }
      }
      let venda = {
        idProduto: this.produtoSelected.idProduto,
        produto: this.produtoSelected.produto,
        quantidade: this.novoItem.quantidade,
        valorBase: this.produtoSelected.valorBase.toFixed(2).replace(".", ","),
        valorTotal: this.valorTotal,
      };
      this.isBusy = true;
      this.novaVenda.produtos.push(venda);
      setTimeout(() => {
        this.isBusy = false;
      }, 500);
      this.cleanForm();
    },

    removeCarrinho() {
      const index = this.novaVenda.produtos.findIndex(
        (v) => v.idProduto === this.novoItem.idProduto
      );
      this.novaVenda.produtos.splice(index, 1);
      this.cleanForm();
    },

    cleanForm() {
      this.editMode = false;
      this.produtoSelected = {};
      this.novoItem = {
        idProduto: null,
        produto: null,
        quantidade: null,
        valorBase: null,
      };
    },

    novo() {
      this.cancelar();
      setTimeout(() => {
        this.$refs.empresa.focus();
      });
    },

    cancelar() {
      this.novaVenda = {
        idEmpresa: null,
        idCliente: null,
        dataVenda: null,
        metodoPagamento: null,
        produtos: [],
      };
      this.cleanForm();
    },

    // Método para consistir a venda no Banco de Dados
    async salvarVenda() {
      let venda = { ...this.novaVenda };
      venda.dataVenda = `${venda.dataVenda} ${new Date().toLocaleTimeString()}`;

      this.changeLoading(true);
      await this.$axios
        .post(`empresa/${venda.idEmpresa}/venda`, venda)
        .then(() => {
          this.$toasted.success("Venda salva com sucesso!");
          this.cancelar();
        })
        .catch(() => {
          this.$toasted.error("Falha ao salvar venda!");
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
.img-produto {
  height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.img-produto img {
  height: 100%;
  width: auto;
}
</style>