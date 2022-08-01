<template>
    <div>
        <Layout />
        <div class="page-container">
            <PageHeader title="Cadastro de Empresa" helpTitle="Cadastro de Empresa" :helpText="helpText" />
            <div class="my-container">
                <b-row>
                    <b-col>
                        <b-card>
                            <b-table class="mb-0 my-table" :items="empresaResponse" bordered selectable
                                select-mode="single" selected-variant="primary" striped hover style="cursor: pointer">

                            </b-table>
                            <div class="mt-2 d-flex" style="justify-content: space-between">
                                <span>Total de registros: {{ empresaResponse.length }}</span>
                            </div>
                            <hr />
                            <div class="d-flex align-items-center justify-content-center">
                                <ul class="pagination mb-0">
                                    <b-pagination v-model="currentPage">
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
                    </b-col>
                    <b-col>
                        <b-card>
                            <b-form>
                                <b-form-group id="cnpj-group" label="CNPJ:" label-for="cnpj">
                                    <b-form-input id="cnpj" placeholder="34.916.315/0001-03" type="number" required
                                        v-model="novaEmpresa.cnpj">
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group id="nome-fantasia-group" label="Nome Fantasia:" label-for="nome-fantasia">
                                    <b-form-input id="nome-fantasia" placeholder="Carros.com" required
                                        v-model="novaEmpresa.nomeFantasia"></b-form-input>
                                </b-form-group>

                                <b-form-group id="razao-social-group" label="Razao Social:" label-for="razao-social">
                                    <b-form-input id="razao-social" placeholder="Carro Ponto Ltda" required
                                        v-model="novaEmpresa.razaoSocial">
                                    </b-form-input>
                                </b-form-group>
                                <b-row>
                                    <b-col>
                                        <b-form-group id="telefone-group" label="Telefone:" label-for="telefone">
                                            <b-form-input id="telefone" placeholder="(21)99999-9999" type="phone"
                                                required v-model="novaEmpresa.telefone"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group id="responsavel-group" label="Responsável Legal:"
                                            label-for="responsavel">
                                            <b-form-input id="Responsavel" placeholder="Joao da Silva" required
                                                v-model="novaEmpresa.responsavelLegal">
                                            </b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-card>
                        <StateButtonBar excluir excluirDisabled novo :novoFunction="novo" cancelar
                            :cancelarFunction="cancelar" salvar :salvarFunction="salvarEmpresa" :oldObj="oldObj"
                            :newObj="newObj" :camposObrigatorios="[
                                'cnpj',
                                'nome-fantasia',
                                'razao-social',
                                'telefone',
                                'responsavel',
                            ]" />
                    </b-col>

                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import StateButtonBar from "@/components/state-button-bar";
import Layout from "@/layout/main";


export default {
    components: {
        PageHeader,
        StateButtonBar,
        Layout,
    },
    data() {
        return {
            empresaResponse: [],
            novaEmpresa: {
                nomeFantasia: null,
                razaoSocial: null,
                cnpj: null,
                telefone: null,
                responsavelLegal: null
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
        // salvando empresa
        async salvarEmpresa() {
            let empresa = { ...this.novaEmpresa };

            await this.$axios
                .post(`empresa`, empresa)
                .then(() => {
                    this.$toasted.success("Empresa salva com sucesso!");
                    this.cancelar();
                })
                .catch(() => {
                    this.$toasted.error("Falha ao salvar empresa!");
                });
        }
    },
    mounted() {
        this.listEmpresas()
    }
}
</script>