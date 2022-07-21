<script>
import { mapGetters } from "vuex";

export default {
  props: {
    // State
    estado: {
      type: String,
      default: undefined,
    },

    // Objetos de validações
    oldObj: {
      default: undefined,
    },
    newObj: {
      default: undefined,
    },

    // Campos Obrigatórios
    camposObrigatorios: {
      type: Array,
      default: () => [],
    },

    // Display buttons
    salvar: {
      type: Boolean,
      default: false,
    },
    cancelar: {
      type: Boolean,
      default: false,
    },
    excluir: {
      type: Boolean,
      default: false,
    },
    novo: {
      type: Boolean,
      default: false,
    },
    editar: {
      type: Boolean,
      default: false,
    },
    anterior: {
      type: Boolean,
      default: false,
    },
    proximo: {
      type: Boolean,
      default: false,
    },
    finalizar: {
      type: Boolean,
      default: false,
    },
    verDetalhe: {
      type: Boolean,
      default: false,
    },
    atualizar: {
      type: Boolean,
      default: false,
    },
    imprimir: {
      type: Boolean,
      default: false,
    },
    buscar: {
      type: Boolean,
      default: false,
    },
    filtrar: {
      type: Boolean,
      default: false,
    },
    baixar: {
      type: Boolean,
      default: false,
    },
    sincronizar: {
      type: Boolean,
      default: false,
    },
    verImagens: {
      type: Boolean,
      default: false,
    },
    adicionar: {
      type: Boolean,
      default: false,
    },
    ampliar: {
      type: Boolean,
      default: false,
    },
    diminuir: {
      type: Boolean,
      default: false,
    },
    expandir: {
      type: Boolean,
      default: false,
    },
    bloquear: {
      type: Boolean,
      default: false,
    },
    resetarSenha: {
      type: Boolean,
      default: false,
    },
    trocarSenha: {
      type: Boolean,
      default: false,
    },
    voltar: {
      type: Boolean,
      default: false,
    },
    limpar: {
      type: Boolean,
      default: false,
    },
    opcoes: {
      type: Boolean,
      default: false,
    },
    visualizar: {
      type: Boolean,
      default: false,
    },
    arquivar: {
      type: Boolean,
      default: false,
    },
    verHistorico: {
      type: Boolean,
      default: false,
    },
    agendar: {
      type: Boolean,
      default: false,
    },
    configuracoes: {
      type: Boolean,
      default: false,
    },
    vincular: {
      type: Boolean,
      default: false,
    },
    desvincular: {
      type: Boolean,
      default: false,
    },
    sair: {
      type: Boolean,
      default: false,
    },

    // Button functions
    salvarFunction: Function,
    cancelarFunction: Function,
    excluirFunction: Function,
    novoFunction: Function,
    editarFunction: Function,
    anteriorFunction: Function,
    proximoFunction: Function,
    finalizarFunction: Function,
    verDetalheFunction: Function,
    atualizarFunction: Function,
    imprimirFunction: Function,
    buscarFunction: Function,
    filtrarFunction: Function,
    baixarFunction: Function,
    sincronizarFunction: Function,
    verImagensFunction: Function,
    adicionarFunction: Function,
    ampliarFunction: Function,
    diminuirFunction: Function,
    expandirFunction: Function,
    bloquearFunction: Function,
    resetarSenhaFunction: Function,
    trocarSenhaFunction: Function,
    voltarFunction: Function,
    limparFunction: Function,
    opcoesFunction: Function,
    visualizarFunction: Function,
    arquivarFunction: Function,
    verHistoricoFunction: Function,
    agendarFunction: Function,
    configuracoesFunction: Function,
    vincularFunction: Function,
    desvincularFunction: Function,
    sairFunction: Function,

    // Button variants
    salvarVariant: String,
    cancelarVariant: String,
    excluirVariant: String,
    novoVariant: String,

    editarVariant: {
      type: String,
      default: "secondary",
    },
    anteriorVariant: {
      type: String,
      default: "secondary",
    },
    proximoVariant: {
      type: String,
      default: "secondary",
    },
    finalizarVariant: {
      type: String,
      default: "secondary",
    },
    detalheVariant: {
      type: String,
      default: "secondary",
    },
    atualizarVariant: {
      type: String,
      default: "secondary",
    },
    imprimirVariant: {
      type: String,
      default: "secondary",
    },
    buscarVariant: {
      type: String,
      default: "secondary",
    },
    filtrarVariant: {
      type: String,
      default: "secondary",
    },
    baixarVariant: {
      type: String,
      default: "secondary",
    },
    sincronizarVariant: {
      type: String,
      default: "secondary",
    },
    verImagensVariant: {
      type: String,
      default: "secondary",
    },
    adicionarVariant: {
      type: String,
      default: "secondary",
    },
    ampliarVariant: {
      type: String,
      default: "secondary",
    },
    diminuirVariant: {
      type: String,
      default: "secondary",
    },
    expandirVariant: {
      type: String,
      default: "secondary",
    },
    bloquearVariant: {
      type: String,
      default: "secondary",
    },
    resetarSenhaVariant: {
      type: String,
      default: "secondary",
    },
    trocarSenhaVariant: {
      type: String,
      default: "secondary",
    },
    voltarVariant: {
      type: String,
      default: "secondary",
    },
    limparVariant: {
      type: String,
      default: "secondary",
    },
    opcoesVariant: {
      type: String,
      default: "secondary",
    },
    visualizarVariant: {
      type: String,
      default: "secondary",
    },
    arquivarVariant: {
      type: String,
      default: "secondary",
    },
    verHistoricoVariant: {
      type: String,
      default: "secondary",
    },
    agendarVariant: {
      type: String,
      default: "secondary",
    },
    configuracoesVariant: {
      type: String,
      default: "secondary",
    },
    vincularVariant: {
      type: String,
      default: "secondary",
    },
    desvincularVariant: {
      type: String,
      default: "secondary",
    },
    sairVariant: {
      type: String,
      default: "secondary",
    },

    //Button Enable
    salvarDisabled: Boolean,
    cancelarDisabled: Boolean,
    excluirDisabled: Boolean,
    novoDisabled: Boolean,
    editarDisabled: Boolean,
    anteriorDisabled: Boolean,
    proximoDisabled: Boolean,
    finalizarDisabled: Boolean,
    detalheDisabled: Boolean,
    atualizarDisabled: Boolean,
    imprimirDisabled: Boolean,
    buscarDisabled: Boolean,
    filtrarDisabled: Boolean,
    baixarDisabled: Boolean,
    sincronizarDisabled: Boolean,
    verImagensDisabled: Boolean,
    adicionarDisabled: Boolean,
    ampliarDisabled: Boolean,
    diminuirDisabled: Boolean,
    expandirDisabled: Boolean,
    bloquearDisabled: Boolean,
    resetarSenhaDisabled: Boolean,
    trocarSenhaDisabled: Boolean,
    voltarDisabled: Boolean,
    limparDisabled: Boolean,
    opcoesDisabled: Boolean,
    visualizarDisabled: Boolean,
    arquivarDisabled: Boolean,
    verHistoricoDisabled: Boolean,
    agendarDisabled: Boolean,
    configuracoesDisabled: Boolean,
    vincularDisabled: Boolean,
    desvincularDisabled: Boolean,
    sairDisabled: Boolean,
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },

  data() {
    return {
      windowWidth: null,

      btnNovoEstado: { variant: "outline-secondary", disabled: true },
      btnCancelarEstado: { variant: "outline-secondary", disabled: true },
      btnSalvarEstado: { variant: "outline-secondary", disabled: true },
      btnExcluirEstado: { variant: "outline-secondary", disabled: true },
    };
  },

  watch: {
    estado: {
      handler: function (novo, antigo) {
        if (novo !== antigo) {
          this.setEstado(novo);
        }
      },
      deep: true,
      immediate: true,
    },

    newObj: {
      handler: function (novo) {
        if (!this.estado) {
          this.setEstado("inicial");
          if (novo !== undefined && this.oldObj !== undefined) {
            let obrigatorios = true;
            let campoPreenchido = 0;

            this.camposObrigatorios.every((campo) => {
              if (Array.isArray(novo[campo])) {
                if (!novo[campo].length) {
                  obrigatorios = false;
                  return false;
                }
              } else {
                if (!novo[campo]) {
                  obrigatorios = false;
                  return false;
                } else {
                  obrigatorios = true;
                  return true;
                }
              }
            });

            const newObjProps = Object.getOwnPropertyNames(novo);
            let newOb = newObjProps.indexOf("__ob__");
            if (newOb !== undefined) {
              newObjProps.splice(newOb, 1);
            }

            newObjProps.forEach((campo) => {
              if (!Array.isArray(novo[campo])) {
                if (novo[campo]) {
                  campoPreenchido++;
                }
              } else {
                if (novo[campo].length) {
                  campoPreenchido++;
                }
              }
            });

            const oldObjProps = Object.getOwnPropertyNames(this.oldObj);
            let oldOb = oldObjProps.indexOf("__ob__");
            if (oldOb !== undefined) {
              oldObjProps.splice(oldOb, 1);
            }
            if (oldObjProps.length) {
              if (this.isEquivalent(this.oldObj, novo)) {
                this.setEstado("selecionado");
              } else {
                if (obrigatorios) {
                  this.setEstado("salvar");
                } else {
                  this.setEstado("edicao");
                }
              }
            } else {
              if (obrigatorios && campoPreenchido) {
                this.setEstado("salvar");
              } else if (campoPreenchido) {
                this.setEstado("edicao");
              } else {
                this.setEstado("inicial");
              }
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    ...mapGetters({
      menuCollapsed: "getMenuCollapsed",
    }),

    btnExcluir() {
      let variant, disabled;
      if (this.excluirDisabled) {
        variant = "outline-secondary";
        disabled = true;
      } else {
        variant = this.btnExcluirEstado.variant;
        disabled = this.btnExcluirEstado.disabled;
      }
      return { variant, disabled };
    },
    btnNovo() {
      let variant, disabled;
      if (this.novoDisabled) {
        variant = "outline-secondary";
        disabled = true;
      } else {
        variant = this.btnNovoEstado.variant;
        disabled = this.btnNovoEstado.disabled;
      }
      return { variant, disabled };
    },
    btnCancelar() {
      let variant, disabled;
      if (this.cancelarDisabled) {
        variant = "outline-secondary";
        disabled = true;
      } else {
        variant = this.btnCancelarEstado.variant;
        disabled = this.btnCancelarEstado.disabled;
      }
      return { variant, disabled };
    },
    btnSalvar() {
      let variant, disabled;
      if (this.salvarDisabled) {
        variant = "outline-secondary";
        disabled = true;
      } else {
        variant = this.btnSalvarEstado.variant;
        disabled = this.btnSalvarEstado.disabled;
      }
      return { variant, disabled };
    },
  },

  methods: {
    setEstado(estado) {
      switch (estado) {
        case "inicial":
          this.setEstadoInicial();
          break;
        case "selecionado":
          this.setEstadoSelecionado();
          break;
        case "edicao":
          this.setEstadoEdicao();
          break;
        case "salvar":
          this.setEstadoSalvar();
          break;
        case "disabled":
          this.setAllDisabled();
          break;
      }
    },

    setAllDisabled() {
      this.btnNovoEstado.variant = "outline-secondary";
      this.btnNovoEstado.disabled = true;
      this.btnCancelarEstado.variant = "outline-secondary";
      this.btnCancelarEstado.disabled = true;
      this.btnExcluirEstado.variant = "outline-secondary";
      this.btnExcluirEstado.disabled = true;
      this.btnSalvarEstado.variant = "outline-secondary";
      this.btnSalvarEstado.disabled = true;
    },
    setEstadoEdicao() {
      this.btnNovoEstado.variant = "outline-secondary";
      this.btnNovoEstado.disabled = true;
      this.btnCancelarEstado.variant = "primary";
      this.btnCancelarEstado.disabled = false;
      this.btnSalvarEstado.variant = "outline-secondary";
      this.btnSalvarEstado.disabled = true;
      this.btnExcluirEstado.variant = "outline-secondary";
      this.btnExcluirEstado.disabled = true;
    },
    setEstadoSalvar() {
      this.btnNovoEstado.variant = "outline-secondary";
      this.btnNovoEstado.disabled = true;
      this.btnCancelarEstado.variant = "primary";
      this.btnCancelarEstado.disabled = false;
      this.btnSalvarEstado.variant = "primary";
      this.btnSalvarEstado.disabled = false;
      this.btnExcluirEstado.variant = "outline-secondary";
      this.btnExcluirEstado.disabled = true;
    },
    setEstadoInicial() {
      this.btnNovoEstado.variant = "primary";
      this.btnNovoEstado.disabled = false;
      this.btnCancelarEstado.variant = "outline-secondary";
      this.btnCancelarEstado.disabled = true;
      this.btnExcluirEstado.variant = "outline-secondary";
      this.btnExcluirEstado.disabled = true;
      this.btnSalvarEstado.variant = "outline-secondary";
      this.btnSalvarEstado.disabled = true;
    },
    setEstadoSelecionado() {
      this.btnNovoEstado.variant = "primary";
      this.btnNovoEstado.disabled = false;
      this.btnCancelarEstado.variant = "outline-secondary";
      this.btnCancelarEstado.disabled = true;
      this.btnExcluirEstado.variant = "secondary";
      this.btnExcluirEstado.disabled = false;
      this.btnSalvarEstado.disabled = true;
      this.btnSalvarEstado.variant = "outline-secondary";
    },

    isEquivalent(a, b) {
      // Cria array de strings com propriedades do objeto origem
      let aProps = Object.getOwnPropertyNames(a);
      // Cria array de strings com propriedades do objeto destino
      let bProps = Object.getOwnPropertyNames(b);
      // Array que irá receber as propriedades em comum dos dois objetos
      let common = [];
      // Array que irá receber as propriedades que possuem valores diferentes
      let different = [];
      // Retorna true se os objetos forem iguais ou false se não forem iguais
      let equivalent = true;

      bProps.forEach((prop) => {
        if (aProps.includes(prop)) {
          common.push(prop);
        }
      });

      common.forEach((prop) => {
        if (Array.isArray(b[prop])) {
          b[prop].forEach((prop) => {
            if (!a[prop].includes(prop)) {
              different.push(prop);
            }
          });
        } else if (typeof b[prop] === "object") {
          if (a[prop] !== b[prop]) {
            different.push(prop);
          }
        } else if (typeof b[prop] === "string") {
          if (a[prop]) {
            if (
              a[prop].toString().replace(/[^a-zA-Z0-9]/g, "") !==
              b[prop].toString().replace(/[^a-zA-Z0-9]/g, "")
            ) {
              different.push(prop);
            }
          } else if (b[prop]) {
            different.push(prop);
          }
        } else {
          if (a[prop] !== b[prop]) {
            different.push(prop);
          }
        }
      });

      let ob = different.indexOf("__ob__");
      if (ob !== undefined) {
        different.splice(ob, 1);
      }

      if (different.length > 0) {
        equivalent = false;
      }

      return equivalent;
    },
  },
};
</script>

<template>
  <div>
    <b-row
      v-if="windowWidth >= 500"
      class="
        footer
        position-fixed
        d-flex
        flex-column
        justify-content-center
        align-items-center
        desktop-footer
      "
      :class="{ 'desktop-footer-collapsed': menuCollapsed }"
      style="z-index: 3"
    >
      <b-col cols="4">
        <b-button
          v-if="excluir"
          id="excluir-btn"
          :variant="btnExcluir.variant"
          :disabled="btnExcluir.disabled"
          @click="excluirFunction"
          ><i class="bx bx-trash-alt align-middle mr-1"></i>Excluir</b-button
        >
      </b-col>
      <b-col cols="8" class="d-flex justify-content-end">
        <b-button
          v-if="novo"
          id="novo-btn"
          class="ml-2"
          :variant="btnNovo.variant"
          :disabled="btnNovo.disabled"
          @click="novoFunction"
          ><i class="bx bx-plus align-middle mr-1"></i>Novo</b-button
        >
        <!-- Secondary buttons -->
        <b-button
          v-if="cancelar"
          id="cancelar-btn"
          class="ml-2"
          :variant="btnCancelar.variant"
          :disabled="btnCancelar.disabled"
          @click="cancelarFunction"
          ><i class="bx bx-x align-middle mr-1"></i>Cancelar</b-button
        >
        <b-button
          v-if="editar"
          id="editar-btn"
          class="ml-2"
          :variant="editarVariant"
          :disabled="editarDisabled"
          @click="editarFunction"
          ><i class="bx bx-pencil align-middle mr-1"></i>Editar</b-button
        >
        <b-button
          v-if="anterior"
          id="anterior-btn"
          class="ml-2"
          :variant="anteriorVariant"
          :disabled="anteriorDisabled"
          @click="anteriorFunction"
          ><i class="bx bx-chevron-left align-middle mr-1"></i
          >Anterior</b-button
        >
        <b-button
          v-if="proximo"
          id="proximo-btn"
          class="ml-2"
          :variant="proximoVariant"
          :disabled="proximoDisabled"
          @click="proximoFunction"
          ><i class="bx bx-chevron-right align-middle ml-1"></i
          >Próximo</b-button
        >
        <b-button
          v-if="finalizar"
          id="finalizar-btn"
          class="ml-2"
          :variant="finalizarVariant"
          :disabled="finalizarDisabled"
          @click="finalizarFunction"
          ><i class="bx bx-check align-middle mr-1"></i>Finalizar</b-button
        >
        <b-button
          v-if="verDetalhe"
          id="ver-detalhe-btn"
          class="ml-2"
          :variant="verDetalheVariant"
          :disabled="verDetalheDisabled"
          @click="verDetalheFunction"
          ><i class="bx bx-search-alt-2 align-middle mr-1"></i>Ver
          detalhe</b-button
        >
        <b-button
          v-if="atualizar"
          id="atualizar-btn"
          class="ml-2"
          :variant="atualizarVariant"
          :disabled="atualizarDisabled"
          @click="atualizarFunction"
          ><i class="bx bx-sync align-middle mr-1"></i>Atualizar</b-button
        >
        <b-button
          v-if="imprimir"
          id="imprimir-btn"
          class="ml-2"
          :variant="imprimirVariant"
          :disabled="imprimirDisabled"
          @click="imprimirFunction"
          ><i class="bx bx-printer align-middle mr-1"></i>Imprimir</b-button
        >
        <b-button
          v-if="buscar"
          id="buscar-btn"
          class="ml-2"
          :variant="buscarVariant"
          :disabled="buscarDisabled"
          @click="buscarFunction"
          ><i class="bx bx-search-alt align-middle mr-1"></i>Buscar</b-button
        >
        <b-button
          v-if="filtrar"
          id="filtrar-btn"
          class="ml-2"
          :variant="filtrarVariant"
          :disabled="filtrarDisabled"
          @click="filtrarFunction"
          ><i class="bx bx-filter-alt align-middle mr-1"></i>Filtrar</b-button
        >
        <b-button
          v-if="baixar"
          id="baixar-btn"
          class="ml-2"
          :variant="baixarVariant"
          :disabled="baixarDisabled"
          @click="baixarFunction"
          ><i class="bx bx-download align-middle mr-1"></i>Baixar</b-button
        >
        <b-button
          v-if="sincronizar"
          id="sincronizar-btn"
          class="ml-2"
          :variant="sincronizarVariant"
          :disabled="sincronizarDisabled"
          @click="sincronizarFunction"
          ><i class="bx bx-repost align-middle mr-1"></i>Sincronizar</b-button
        >
        <b-button
          v-if="verImagens"
          id="ver-imagens-btn"
          class="ml-2"
          :variant="verImagensVariant"
          :disabled="verImagensDisabled"
          @click="verImagensFunction"
          ><i class="bx bx-repost align-middle mr-1"></i>Ver imagens</b-button
        >
        <b-button
          v-if="adicionar"
          id="adicionar-btn"
          class="ml-2"
          :variant="adicionarVariant"
          :disabled="adicionarDisabled"
          @click="adicionarFunction"
          ><i class="bx bx-image-add align-middle mr-1"></i>Adicionar</b-button
        >
        <b-button
          v-if="ampliar"
          id="ampliar-btn"
          class="ml-2"
          :variant="ampliarVariant"
          :disabled="ampliarDisabled"
          @click="ampliarFunction"
          ><i class="bx bx-zoom-in align-middle mr-1"></i>Ampliar</b-button
        >
        <b-button
          v-if="diminuir"
          id="diminuir-btn"
          class="ml-2"
          :variant="diminuirVariant"
          :disabled="diminuirDisabled"
          @click="diminuirFunction"
          ><i class="bx bx-zoom-out align-middle mr-1"></i>Diminuir</b-button
        >
        <b-button
          v-if="expandir"
          id="expandir-btn"
          class="ml-2"
          :variant="expandirVariant"
          :disabled="expandirDisabled"
          @click="expandirFunction"
          ><i class="bx bx-expand align-middle mr-1"></i>Expandir</b-button
        >
        <b-button
          v-if="bloquear"
          id="bloquear-btn"
          class="ml-2"
          :variant="bloquearVariant"
          :disabled="bloquearDisabled"
          @click="bloquearFunction"
          ><i class="bx bx-block align-middle mr-1"></i>Bloquear</b-button
        >
        <b-button
          v-if="resetarSenha"
          id="resetar-senha-btn"
          class="ml-2"
          :variant="resetarSenhaVariant"
          :disabled="resetarSenhaDisabled"
          @click="resetarSenhaFunction"
          ><i class="bx bx-reset align-middle mr-1"></i>Resetar senha</b-button
        >
        <b-button
          v-if="trocarSenha"
          id="trocar-senha-btn"
          class="ml-2"
          :variant="trocarSenhaVariant"
          :disabled="trocarSenhaDisabled"
          @click="trocarSenhaFunction"
          ><i class="bx bx-reset align-middle mr-1"></i>Trocar senha</b-button
        >
        <b-button
          v-if="voltar"
          id="voltar-btn"
          class="ml-2"
          :variant="voltarVariant"
          :disabled="voltarDisabled"
          @click="voltarFunction"
          ><i class="bx bx-undo align-middle mr-1"></i>Voltar</b-button
        >
        <b-button
          v-if="limpar"
          id="limpar-btn"
          class="ml-2"
          :variant="limparVariant"
          :disabled="limparDisabled"
          @click="limparFunction"
          ><i class="bx bx-x align-middle mr-1"></i>Limpar</b-button
        >
        <b-button
          v-if="opcoes"
          id="opcoes-btn"
          class="ml-2"
          :variant="opcoesVariant"
          :disabled="opcoesDisabled"
          @click="opcoesFunction"
          ><i class="bx bx-dots-vertical-rounded align-middle mr-1"></i
          >Opções</b-button
        >
        <b-button
          v-if="visualizar"
          id="visualizar-btn"
          class="ml-2"
          :variant="visualizarVariant"
          :disabled="visualizarDisabled"
          @click="visualizarFunction"
          ><i class="bx bx-show-alt align-middle mr-1"></i>Visualizar</b-button
        >
        <b-button
          v-if="arquivar"
          id="arquivar-btn"
          class="ml-2"
          :variant="arquivarVariant"
          :disabled="arquivarDisabled"
          @click="arquivarFunction"
          ><i class="bx bx-box align-middle mr-1"></i>Arquivar</b-button
        >
        <b-button
          v-if="verHistorico"
          id="ver-historico-btn"
          class="ml-2"
          :variant="verHistoricoVariant"
          :disabled="verHistoricoDisabled"
          @click="verHistoricoFunction"
          ><i class="bx bx-history align-middle mr-1"></i>Ver
          histórico</b-button
        >
        <b-button
          v-if="agendar"
          id="agendar-btn"
          class="ml-2"
          :variant="agendarVariant"
          :disabled="agendarDisabled"
          @click="agendarFunction"
          ><i class="bx bx-calendar-check align-middle mr-1"></i
          >Agendar</b-button
        >
        <b-button
          v-if="configuracoes"
          id="configuracoes-btn"
          class="ml-2"
          :variant="configuracoesVariant"
          :disabled="configuracoesDisabled"
          @click="configuracoesFunction"
          ><i class="bx bx-slider-alt align-middle mr-1"></i
          >Configurações</b-button
        >
        <b-button
          v-if="desvincular"
          id="sair-btn"
          class="ml-2"
          :variant="desvincularVariant"
          :disabled="desvincularDisabled"
          @click="desvincularFunction"
          ><i class="bx bx-x align-middle mr-1"></i>Desvincular</b-button
        >
        <b-button
          v-if="vincular"
          id="vincular-btn"
          class="ml-2"
          :variant="vincularVariant"
          :disabled="vincularDisabled"
          @click="vincularFunction"
          ><i class="bx bx-check align-middle mr-1"></i>Vincular</b-button
        >
        <b-button
          v-if="sair"
          id="sair-btn"
          class="ml-2"
          :variant="sairVariant"
          :disabled="sairDisabled"
          @click="sairFunction"
          ><i class="bx bx-log-out align-middle mr-1"></i>Sair</b-button
        >

        <b-button
          v-if="salvar"
          id="salvar-btn"
          class="ml-2"
          :variant="btnSalvar.variant"
          :disabled="btnSalvar.disabled"
          @click="salvarFunction"
          ><i class="bx bx-check align-middle mr-1"></i>Salvar</b-button
        >
      </b-col>
    </b-row>
    <div v-else style="height: 200px;">
      <b-row
        class="
          footer
          d-flex
          flex-row
          position-absolute
          justify-content-center
          align-items-center
          mobile-footer
        "
        style="z-index: 3; height: auto; width: auto; margin: 0;"
      >
        <b-button
          block
          v-if="excluir"
          id="excluir-btn"
          :variant="btnExcluir.variant"
          :disabled="btnExcluir.disabled"
          @click="excluirFunction"
          ><i class="bx bx-trash-alt align-middle mr-1"></i>Excluir</b-button
        >

        <b-button
          block
          v-if="novo"
          id="novo-btn"
          :variant="btnNovo.variant"
          :disabled="btnNovo.disabled"
          @click="novoFunction"
          ><i class="bx bx-plus align-middle mr-1"></i>Novo</b-button
        >

        <b-button
          block
          v-if="cancelar"
          id="cancelar-btn"
          :variant="btnCancelar.variant"
          :disabled="btnCancelar.disabled"
          @click="cancelarFunction"
          ><i class="bx bx-x align-middle mr-1"></i>Cancelar</b-button
        >

        <b-button
          block
          v-if="salvar"
          id="salvar-btn"
          :variant="btnSalvar.variant"
          :disabled="btnSalvar.disabled"
          @click="salvarFunction"
          ><i class="bx bx-check align-middle mr-1"></i>Salvar</b-button
        >
      </b-row>
    </div>
  </div>
</template>

<style scoped>
.desktop-footer {
  width: auto;
  margin-left: 0;
  transition: 0.5s;
  transition-property: margin-left;
}
.desktop-footer-collapsed {
  margin-left: -190px;
}

@media only screen and (max-width: 992px) {
  .desktop-footer-collapsed {
    margin-left: 0;
  }
}
</style>