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
                :fields="fields" selected-variant="primary" striped hover style="cursor: pointer"
                @row-selected="onRowSelected">

              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-form>
                <b-form-group id="cpf-group" label="CPF" label-for="cpf">
                  <b-form-input id="cpf" placeholder="34.916.315/0001-03" v-model="novoCliente.cpf" required>
                  </b-form-input>
                </b-form-group>

                <b-form-group id="nome-group" label="Nome" label-for="nome">
                  <b-form-input id="nome" placeholder="José Araujo" v-model="novoCliente.nome" required>
                  </b-form-input>
                </b-form-group>

                <b-form-group id="telefone-group" label="Telefone" label-for="telefone">
                  <b-form-input id="telefone" placeholder="(21) 99999-9999" type="number" v-model="novoCliente.telefone"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="footer position-fixed d-flex justify-content-center desktop-footer">
          <b-col>
            <b-button variant="danger" @click="excluir">Excluir</b-button>
          </b-col>
          <b-col class="d-flex justify-content-end">
            <div>
              <b-button class="mx-2" variant="outline-info" @click="novo">Novo</b-button>
              <b-button class="mx-2" variant="outline-warning" @click="cancelar">Cancelar</b-button>
              <b-button class="ml-2" variant="outline-success" @click="salvar">Salvar</b-button>
            </div>
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
      listaEmpresas: [],
      novoCliente: {
        nome: null,
        cpf: null,
        telefone: null,
        idEmpresa: null
      },
      clienteSelected: {},
      empresaSelected: 0,
      selected: null,
      fields: ['cpf', 'nome'],
    }
  },
  methods: {
    empresaSelect() {
      this.getAllCliente();
    },
    onRowSelected(clienteResponse) {
      this.selected = clienteResponse[0].idCliente;
      this.getCliente();
    },
    novo() { //cria uma empresa
      this.newCliente();
      this.getAllCliente();
      this.cancelar();

    },
    cancelar() { //limpa os inputs
      this.novoCliente = {
        nome: null,
        cpf: null,
        telefone: null,
      }
      this.getAllCliente();
    },
    salvar() {
      this.putCliente();
      this.getAllCliente();
      this.cancelar();
    },
    excluir() {
      this.delClienteById();
      this.getAllCliente();
      this.cancelar();
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
          this.clienteResponse = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar os clientes dessa empresa!");
        });

    },
    // salvando cliente
    async newCliente() {
      let empresa = this.empresaSelected;
      this.novoCliente.idEmpresa = empresa;
      let cliente = { ...this.novoCliente };
      delete cliente.idCliente;
      await this.$axios
        .post(`empresa/${empresa}/cliente`, cliente)
        .then(() => {
          this.$toasted.success("Cliente salvo com sucesso!");
          //console.log("foi");
          this.cancelar();
        })
        .catch(() => {
          this.$toasted.error("Falha ao salvar cliente!");
          //console.log("nao foi");
          console.log(cliente);
        });7 
    },7 
    //Método get Cliente
    async getCliente() {
      let empresa = this.empresaSelected;
      let cliente = this.selected;
      await this.$axios
        .get(`empresa/${empresa}/cliente/${cliente}`)
        .then((response) => {
          this.novoCliente = Object.assign([], response.data);
          this.$toasted.success("Cliente cadastrado com sucesso!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao carregar esse cliente!");
        });
    },
    //Método Delete
    async delClienteById() {
      let empresa = this.empresaSelected;
      let cliente = this.selected;
      await this.$axios
        .delete(`empresa/${empresa}/cliente/${cliente}`)
        .then(() => {
          this.$toasted.success("Cliente deletado com sucesso!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao deletar cliente!");
          console.log(empresa);
          console.log(cliente);
        });
    },
    //Método Put
    async putCliente() {
      let empresa = this.empresaSelected;
      let cliente = this.selected;
      let clientePost = { ...this.novoCliente };
      clientePost.idEmpresa = empresa
      delete clientePost.idCliente;
      await this.$axios
        .put(`empresa/${empresa}/cliente/${cliente}`, clientePost)
        .then(() => {
          this.$toasted.success("Cliente atualizado com sucesso!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao atualizar cliente!");
          console.log(clientePost);
        });
    },
  },
  mounted() {
    this.listEmpresas();
  }
}
</script>
