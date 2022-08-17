<template>
  <div>
    <Main />
    <div class="page-container">
      <PageHeader title="Cadastro de Cliente" />
      <div class="my-container">
        <b-card>
          <label for="empresa">Empresa</label>
          <b-form-select @change="empresaSelect" v-model="empresaSelected" :options="empresaResponse"
            value-field="idEmpresa" text-field="nomeFantasia"></b-form-select>
        </b-card>
        <b-row>
          <b-col>
            <b-card>
              <b-table class="mb-0 my-table" :items="clienteResponse" bordered selectable select-mode="single"
                selected-variant="primary" striped hover style="cursor: pointer" @row-selected="onRowSelected">

              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-form>
                <b-form-group id="cpf-group" label="CPF" label-for="cpf">
                  <b-form-input id="cpf" placeholder="34.916.315/0001-03" type="number" v-model="novoCliente.cpf" required>
                  </b-form-input>
                </b-form-group>

                <b-form-group id="nome-group" label="Nome" label-for="nome">
                  <b-form-input id="nome" placeholder="José Araujo" v-model="novoCliente.nome" required>
                  </b-form-input>
                </b-form-group>

                <b-form-group id="telefone-group" label="Telefone" label-for="telefone">
                  <b-form-input id="telefone" placeholder="(21) 99999-9999" type="number" v-model="novoCliente.telefone" required>
                  </b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>
        </b-row>

      </div>
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
      clienteResponse: [],
      empresaResponse: [],
      listaEmpresas: {
        value: null,
        text: null
      },
      novoCliente: {
        nome: null,
        cpf: null,
        telefone: null,
        idEmpresa: null
      },
      clienteSelected: {},
      empresaSelected: 0,
      selected: null
    }
  },
  methods: {
    empresaSelect() {
      this.getAllCliente();
    },
    onRowSelected(clienteResponse) {
      this.selected = clienteResponse[0].idCliente;
      this.getCliente();
      this.completaValores();
     },
    completaValores(){
    },
    // Método getAll Empresas
    async listEmpresas() {
      await this.$axios
        .get("dominios/empresa")
        .then((response) => {
          this.empresaResponse = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar empresas!");
        });
    },
    // Método get cliente da empresa
    async getAllCliente() {
      let empresa = this.empresaSelected;
      await this.$axios
        .get(`empresa/${empresa}/cliente`)
        .then((response) => {
          this.clienteResponse = Object.assign([], response.data.content);
          console.log(this.clienteResponse);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar os clientes dessa empresa!");
        });

    },
    //Método get Cliente
    async getCliente() {
      let empresa = this.empresaSelected;
      let cliente = this.selected;
      await this.$axios
        .get(`empresa/${empresa}/cliente/${cliente}`)
        .then((response) => {
          this.novoCliente = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar os clientes dessa empresa!");
        });
    }
  },
  mounted() {
    this.listEmpresas();
    console.log(this.empresaResponse);
  }
}
</script>