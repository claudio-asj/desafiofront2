<template>
  <div>
    <Main />
    <div class="page-container">
      <PageHeader title="Cadastro de Produto" helpTitle="Cadastro de Empresa" />
      <div class="my-container">
        <b-card>
          <label for="empresa">Empresa</label>
          <b-form-select @change="empresaSelect" v-model="empresaSelected" :options="empresaResponse"
            value-field="idEmpresa" text-field="nomeFantasia">
          </b-form-select>
        </b-card>
        <b-row>
          <b-col>
            <b-card>
              <b-table class="mb-0 my-table" :items="produtoResponse" bordered selectable select-mode="single" :fields="fields"
                selected-variant="primary" striped hover style="cursor: pointer" @row-selected="onRowSelected">
              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-form>
                <b-form-group id="produto-group" label="Produto" label-for="produto">
                  <b-form-input id="produto" v-model="novoProduto.produto" placeholder="Iphone 13" required>
                  </b-form-input>
                </b-form-group>

                <b-form-group id="descricao-group" label="Descrição" label-for="d">
                  <b-form-textarea id="descricao" v-model="novoProduto.descricao" placeholder="..." rows="3" max-rows="6">
                  </b-form-textarea>
                </b-form-group>

                <b-form-group id="valor-group" label="Valor" label-for="valor">
                  <b-form-input id="valor" v-model="novoProduto.valorBase" placeholder="90000" novo type="number" required>
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
      novoProduto: {
        prdouto: null,
        descricao: null,
        valorBase: null,
        imagemProduto: null,
        idEmpresa: null
      },
      empresaSelected: null,
      fields: [ 'produto']
    }
  },
  methods: {
    empresaSelect() {
      this.getAllProdutos();
    },
    onRowSelected(){

    },
    // Método getAll Empresas
    async listEmpresas() {
      await this.$axios
        .get("dominios/empresa")
        .then((response) => {
          this.empresaResponse = Object.assign([], response.data);
          this.$toasted.success("Listando todas as empresas!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar empresas!");
        });
    },
    // Método get produtos da empresa
    async getAllProdutos() {
      let empresa = this.empresaSelected;
      await this.$axios
        .get(`empresa/${empresa}/produto`)
        .then((response) => {
          this.produtoResponse = Object.assign([], response.data.content);
          this.$toasted.success("Listando produtos da empresa!");
          
        })
        .catch(() => {
          this.$toasted.error("Falha ao listar os produto dessa empresa!");
        });

    },
  },
  mounted() {
    this.listEmpresas();
  }
}
</script>