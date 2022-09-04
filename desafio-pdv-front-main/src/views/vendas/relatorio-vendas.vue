<template>
  <div>
    <Main />
    <div class="page-container">
      <PageHeader title="Relatório de vendas" />
      <div class="my-container">
        <b-card>
          <b-row>
            <b-col>
              <label for="empresa">Empresa</label>
              <b-form-select @change="empresaSelect" v-model="empresaSelected" :options="empresaResponse"
                value-field="idEmpresa" text-field="nomeFantasia"></b-form-select>
            </b-col>
            <b-col>
              <label for="cliente">Cliente</label>
              <b-form-select @change="clienteSelect" v-model="clienteSelected" :options="clienteResponse"
                value-field="idCliente" text-field="nome"></b-form-select>
            </b-col>
            <b-col>
              <label for="empresa">Data da Venda</label>
              <b-form-select></b-form-select>
            </b-col>
          </b-row>
        </b-card>
        <b-card>

          <b-table class="mb-0 my-table" sticky-header :items="vendaResponse" :fields="fields" responsive="sm"
            bordered selectable select-mode="single" selected-variant="primary" stripedhover style="cursor: pointer"
            @row-selected="onRowSelected">
            
            <template #cell(dataVenda)="data">
              {{
                  data.item.dataVenda.split(" ")[0].split("-").join("/")
              }}
            </template>
            <template #cell(valorTotal)="data">
              R$ {{ data.item.valorTotal }}
            </template>
          </b-table>
          <div class="mt-2">Total de registros: {{ vendaResponse.length }}</div>
        </b-card>
      </div>
      <b-row class="footer position-fixed d-flex justify-content-center desktop-footer">
          <b-col>
            <b-button variant="danger" @click="excluir">Excluir</b-button>
          </b-col>
        </b-row>
    </div>
  </div>
</template>

<script>
import PageHeader from "../../components/page-header.vue";
import Main from "../../layout/main.vue";

export default {
  components: { PageHeader, Main },
  data() {
    return {
      empresaSelected: null,
      empresaResponse: [],
      clienteSelected: null,
      clienteResponse: [],
      dataSelected: null,
      dataResponse: [],
      vendaResponse: {},
      fields: [
        { key: "nomeFantasia", label: "Empresa" },
        { key: "nomeCliente", label: "Cliente" },
        { key: "dataVenda", label: "Data da Venda" },
        { key: "valorTotal", label: "Valor Total" },
      ],
      nomeCliente: null,
      vendaSelected: null
    }
  },
  mounted() {
    this.listEmpresas();
  },
  methods: {
    async listEmpresas() {
      await this.$axios
        .get("dominios/empresa")
        .then((response) => {
          this.empresaResponse = Object.assign([], response.data);
          this.$toasted.success("Empresas carregadas com sucesso!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar empresas!");
        });
    },
    empresaSelect() {
      this.getAllCliente();
      this.getVenda();
      
    },
    clienteSelect(){
      
    },
    excluir(){
      this.delClienteById();
    },
    // Método get cliente da empresa
    async getAllCliente() {
      let empresa = this.empresaSelected;
      await this.$axios
        .get(`empresa/${empresa}/cliente`)
        .then((response) => {
          this.clienteResponse = Object.assign([], response.data);
          this.$toasted.success("Clientes carregados com sucesso!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar os clientes dessa empresa!");
        });
    },
    // Método get venda da empresa
    async getVenda() {
      let empresa = this.empresaSelected;
      await this.$axios
        .get(`empresa/${empresa}/venda`)
        .then((response) => {
          this.vendaResponse = Object.assign([], response.data);
          this.$toasted.success("Vendas carregadas com sucesso!");
          console.log(this.vendaResponse);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar as vendas dessa empresa!");
        });
    },
    //Método Delete
    async delClienteById() {
      let empresa = this.empresaSelected;
      let venda = this.vendaSelected;
      await this.$axios
        .delete(`empresa/${empresa}/venda/${venda}`)
        .then(() => {
          this.$toasted.success("Venda deletada com sucesso!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao deletar venda!");
          console.log(empresa);
          console.log(venda);
        });
    },
    onRowSelected(vendaResponse) {
      this.vendaSelected = vendaResponse[0].idVenda;
      console.log(this.vendaSelected)
    },
    
  }

}
</script>

<style scoped>
.my-container {
  margin: 10px;
  padding-bottom: 50px;
}
</style>