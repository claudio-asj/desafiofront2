<template>
  <div>
    <Main />
    <div class="page-container">
      <PageHeader title="Cadastro de Cliente" helpTitle="Cadastro de Empresa" :helpText="helpText" />
      <div class="my-container">
        <b-card>
          <label for="empresa">Empresa</label>
          <b-form-select class="mb-2" ref="empresa" autocomplete="off" @change="listClientes">
            <option :value="{}"></option>
            <option v-for="empresa in empresaResponse" :key="empresa.idEmpresa" :value="novoCliente.idEmpresa">
              {{ empresa.nomeFantasia }}
            </option>
          </b-form-select>
        </b-card>
        <b-row>
          <b-col>
            <b-card>
              <b-table class="mb-0 my-table" :items="clienteResponse" bordered selectable select-mode="single"
                selected-variant="primary" striped hover style="cursor: pointer">

              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-form>
                <b-form-group id="cpf-group" label="CPF" label-for="cpf">
                  <b-form-input id="cpf" placeholder="34.916.315/0001-03" type="number" required>
                </b-form-input>
                </b-form-group>

                <b-form-group id="nome-group" label="Nome" label-for="nome">
                  <b-form-input id="nome" placeholder="José Araujo" required>
                </b-form-input>
                </b-form-group>

                <b-form-group id="telefone-group" label="Telefone" label-for="telefone">
                  <b-form-input id="telefone" placeholder="(21) 99999-9999" type="number" required>
                </b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
        <StateButtonBar excluir excluirDisabled novo :novoFunction="novo" cancelar
                            :cancelarFunction="cancelar" salvar :salvarFunction="salvarCliente" :oldObj="oldObj"
                            :newObj="newObj" :camposObrigatorios="[ //n sei
                                'cnpj',
                                'nome-fantasia',
                                'razao-social',
                                'telefone',
                                'responsavel',
                            ]" />
      </div>
    </div>
  </div>
</template>


<script>
import StateButtonBar from "../../components/state-button-bar.vue"
import PageHeader from "../../components/page-header.vue";
import Main from "../../layout/main.vue";

export default {
  components: { PageHeader, Main, StateButtonBar },
  data() {
    return {
      clienteResponse: [],
      empresaResponse:[],
      // Objeto da venda a ser salva
      novoCliente: {
        idEmpresa: null,
        idCliente: null,
        dataVenda: null,
        metodoPagamento: null,
        produtos: [],
      }
    }
  },
  methods: {
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
    // Método getAll Clientes
    async listClientes(idEmpresa) {
      this.listProdutos(idEmpresa);
      await this.$axios
        .get(`dominios/empresa/${idEmpresa}/cliente`)
        .then((response) => {
          this.clienteResponse = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar clientes!");
        });
    }
    },
  mounted() {
    this.listEmpresas();
  }
}
</script>