<template>
  <div>
    <Main />
    <div class="page-container">
      <PageHeader title="Cadastro de Cliente" helpTitle="Cadastro de Empresa" :helpText="helpText" />
      <div class="my-container">
        <b-card>
          <label for="empresa">Empresa</label>
          <b-form-select class="mb-2" ref="empresa" autocomplete="off" @change="listProdutos">
            <option :value="{}"></option>
            <option v-for="empresa in empresaResponse" :key="empresa.idEmpresa" :value="novoCliente.idEmpresa">
              {{ empresa.nomeFantasia }}
            </option>
          </b-form-select>
        </b-card>
        <b-row>
          <b-col>
            <b-card>
              <b-table class="mb-0 my-table" :items="produtoResponse" bordered selectable select-mode="single"
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
      empresaResponse: [],
      produtoResponse: [],
      // Objeto da venda a ser salva
      novoCliente: {
        idEmpresa: 1,
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
    // Método getAll Produtos
    async listProdutos(idEmpresa) {
      await this.$axios
        .get(`dominios/empresa/${idEmpresa}/produto`)
        .then((response) => {
          this.produtoResponse = Object.assign([], response.data);
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar produtos!");
        });
    }
  },
  mounted() {
    this.listEmpresas();
  }
}
</script>