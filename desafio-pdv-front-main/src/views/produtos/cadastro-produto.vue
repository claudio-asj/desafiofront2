<template>
    <div>
        <Main />
        <div class="page-container">
            <PageHeader title="Cadastro de Produto" helpTitle="Cadastro de Empresa" :helpText="helpText" />
            <div class="my-container">
                <b-card>
                    <label for="empresa">Empresa</label>
                    <b-form-select class="mb-2" ref="empresa" autocomplete="off" @change="listProdutos">
                        <option :value="{}"></option>
                        <option v-for="empresa in empresaResponse" :key="empresa.idEmpresa"
                            :value="novoProduto.idEmpresa">
                            {{ empresa.nomeFantasia }}
                        </option>
                    </b-form-select>
                </b-card>
                <b-row>
                    <b-col>
                        <b-card>
                            <b-table class="mb-0 my-table" :items="produtoResponse" bordered selectable
                                select-mode="single" selected-variant="primary" striped hover style="cursor: pointer">

                            </b-table>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card>
                            <b-form>
                                <b-form-group id="produto-group" label="Produto" label-for="produto">
                                    <b-form-input id="produto" placeholder="Iphone 13" required>
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group id="descricao-group" label="Nome" label-for="nome">
                                    <b-form-textarea id="descricao" v-model="descricao" placeholder="..."
                                        rows="3" max-rows="6"></b-form-textarea>
                                </b-form-group>

                                <b-form-group id="valor-group" label="Valor" label-for="valor">
                                    <b-form-input id="valor" placeholder="90000"novo type="number" required>
                                    </b-form-input>
                                </b-form-group>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
                <StateButtonBar excluir excluirDisabled novo :novoFunction="novo" cancelar
                            :cancelarFunction="cancelar" salvar :salvarFunction="salvarProduto" :oldObj="oldObj"
                            :newObj="newObj" :camposObrigatorios="[ //n sei
                                'produto',
                                'descricao',
                                'valor'
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
            empresaResponse: [],
            produtoResponse: [],
            // Objeto da venda a ser salva
            novoProduto: {
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
        },
        
    novo() {
      this.cancelar();
      setTimeout(() => {
        this.$refs.empresa.focus();
      });
    },
         // salvando produto
        async salvarProduto() {
            let produto = { ...this.novoProduto };

            await this.$axios
                .post(`produto`, produto)
                .then(() => {
                    this.$toasted.success("Produto salvo com sucesso!");
                    this.cancelar();
                })
                .catch(() => {
                    this.$toasted.error("Falha ao salvar produto!");
                });
        }
    },
    mounted() {
        this.listEmpresas();
    }
}
</script>