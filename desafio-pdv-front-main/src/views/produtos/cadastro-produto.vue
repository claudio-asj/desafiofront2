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
              <b-table class="mb-0 my-table" :items="produtoResponse" bordered selectable select-mode="single"
                :fields="fields" selected-variant="primary" striped hover style="cursor: pointer"
                @row-selected="onRowSelected">
              </b-table>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-form>
                <b-form-group id="produto-group" label="Imagem" label-for="imagem">

                  <b-card >
                    <img :src="`data:image/jpeg;base64,${this.novoProduto.imagemProduto}`" alt=""
                      class="imagem-produto" />
                  </b-card>
                
                  <input @change="uploadImage" type="file" name="photo" accept="image/*">
                </b-form-group>
                <b-form-group id="produto-group" label="Produto" label-for="produto">
                  <b-form-input id="produto" v-model="novoProduto.produto" placeholder="Iphone 13" required>
                  </b-form-input>
                </b-form-group>

                <b-form-group id="descricao-group" label="Descrição" label-for="d">
                  <b-form-textarea id="descricao" v-model="novoProduto.descricao" placeholder="..." rows="3"
                    max-rows="6">
                  </b-form-textarea>
                </b-form-group>

                <b-form-group id="valor-group" label="Valor" label-for="valor">
                  <b-form-input id="valor" v-model="novoProduto.valorBase" placeholder="90000" novo type="number"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="footer position-fixed d-flex justify-content-center  desktop-footer">
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
import VueBase64FileUpload from 'vue-base64-file-upload';


export default {
  components: { PageHeader, Main, VueBase64FileUpload},
  data() {
    return {
      empresaResponse: [],
      produtoResponse: [],
      // Objeto da venda a ser salva
      novoProduto: {
        produto: null,
        descricao: null,
        valorBase: null,
        imagemProduto: null,
        idEmpresa: null
      },
      empresaSelected: null,
      fields: ['produto'],
      selected: null,
      imgBase: null
    }
  },
  methods: {
    empresaSelect() {
      this.getAllProdutos();
    },
    onRowSelected(produtoResponse) {
      this.selected = produtoResponse[0].idProduto;
      this.getProduto();
    },
    excluir() {
      this.deletePrudutoById();
      this.cancelar();
    },
    novo() {
      this.postProduto();
      this.cancelar();
    },
    cancelar() {
      this.novoProduto = {
        produto: null,
        descricao: null,
        valorBase: null,
        imagemProduto: null,
        idEmpresa: null
      }
    },
    salvar() {
      this.putProduto();
      this.cancelar();
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
          this.produtoResponse = Object.assign([], response.data);
          this.$toasted.success("Listando produtos da empresa!");

        })
        .catch(() => {
          this.$toasted.error("Falha ao listar os produto dessa empresa!");
        });
    },
    //Método get Produto
    async getProduto() {
      let empresa = this.empresaSelected;
      let produto = this.selected;
      console.log(produto)
      await this.$axios
        .get(`empresa/${empresa}/produto/${produto}`)
        .then((response) => {
          this.novoProduto = Object.assign([], response.data);
          this.$toasted.success("Produto carregado!");
        })
        .catch(() => {
          this.$toasted.error("Falha ao carregar Produto!");
        });
    },

    //Método Put
    async putProduto() {
      let empresa = this.empresaSelected;
      let produto = this.selected;
      let produtoPut = { ...this.novoProduto };
      await this.$axios
        .put(`empresa/${empresa}/produto/${produto}`, produtoPut)
        .then(() => {
          this.$toasted.success("Produto atualizado com sucesso!");
          this.listEmpresas();
        })
        .catch(() => {
          this.$toasted.error("Falha ao atualizar produto!");
          console.log(produtoPost);
        });
    },
    //Método Post
    async postProduto() {
      let produtoPost = { ...this.novoProduto };
      let empresa = this.empresaSelected;
      produtoPost.idEmpresa = empresa;
      produtoPost.imagemProduto = this.imgBase.substr(23);//returar o inico da string
      console.log(produtoPost);
      await this.$axios
        .post(`empresa/${empresa}/produto`, produtoPost)
        .then(() => {
          this.$toasted.success("Produto cadastrado com sucesso!");
          this.getProduto();
        })
        .catch(() => {
          this.$toasted.error("Falha ao cadastrar produto!");
          console.log(produtoPost);
        });
    },
    //
    async deletePrudutoById(){
      let empresa = this.empresaSelected;
      let produto = this.selected;
            await this.$axios
                .delete(`empresa/${empresa}/produto/${produto}`)
                .then(() => {
                    this.$toasted.success("Produto deletado com sucesso!");
                    this.getProduto();
                })
                .catch(() => {
                    this.$toasted.error("Falha ao deletar o produto!");
                });
    },
    //converter img para base64
    uploadImage() {    
      let file = document
        .querySelector('input[type=file]')
        .files[0];
      let reader = new FileReader();
      let base;
      reader.onload = (e) => {
        base = e.target.result;
        this.imgBase = base;
        console.log(base)
      };
      reader.onerror = function(error) {
        alert(error);
      };
      
      reader.readAsDataURL(file); 
    },
  },
  mounted() {
    this.listEmpresas();
  }
}
</script>

<style>
.imagem-produto {
  width: 16rem;
  background-color: blue;
}
</style>
