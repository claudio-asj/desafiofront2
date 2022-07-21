<template>
  <!-- SideBar -->
  <div class="sidebar" :class="{ 'side-bar-collapsed': menuCollapsed }">
    <center>
      <img
        src="@/assets/images/bagarote/logo_bagarote.svg"
        class="logo-image"
        :class="{ 'logo-image-collapsed': menuCollapsed }"
        alt=""
      />
    </center>
    <img
      src="@/assets/images/bagarote/logo_bagarote_sm.svg"
      class="small-logo-image"
      :class="{ 'logo-image-collapsed': !menuCollapsed }"
      alt=""
    />
    <router-link to="/" v-if="authorities.includes('VENDEDOR') || authorities.includes('ADMINISTRADOR')"
      ><i
        class="fas fa-chart-line"
        :class="{ 'icons-collapsed': menuCollapsed }"
      ></i
      ><span :class="{ 'span-collapsed': menuCollapsed }"
        >Relatório de Vendas</span
      >
    </router-link>

    <router-link to="/cadastro-venda" v-if="authorities.includes('VENDEDOR') || authorities.includes('ADMINISTRADOR')"
      ><i class="fas fa-edit" :class="{ 'icons-collapsed': menuCollapsed }"></i
      ><span :class="{ 'span-collapsed': menuCollapsed }"
        >Cadastro de Venda</span
      >
    </router-link>

    <router-link to="/cadastro-empresa" v-if="authorities.includes('ADMINISTRADOR')"
      ><i class="fas fa-store" :class="{ 'icons-collapsed': menuCollapsed }"></i
      ><span :class="{ 'span-collapsed': menuCollapsed }"
        >Cadastro de Empresa</span
      >
    </router-link>

    <router-link to="/cadastro-cliente" v-if="authorities.includes('ADMINISTRADOR')"
      ><i class="fas fa-user" :class="{ 'icons-collapsed': menuCollapsed }"></i
      ><span :class="{ 'span-collapsed': menuCollapsed }"
        >Cadastro de Cliente</span
      >
    </router-link>

    <router-link to="/cadastro-produto" v-if="authorities.includes('ADMINISTRADOR')"
      ><i class="fas fa-box-open" :class="{ 'icons-collapsed': menuCollapsed }"></i
      ><span :class="{ 'span-collapsed': menuCollapsed }"
        >Cadastro de Produto</span
      >
    </router-link>
  </div>
  <!-- Fim do SideBar -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      menuCollapsed: "getMenuCollapsed",
      authorities: "authorities",
    }),
  },
  methods: {
    hasSubItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
  },
};
</script>

<style scoped>
.sidebar {
  background: #2a3042;
  padding-top: 30px;
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  transition: 0.5s;
  transition-property: left;
  z-index: 1;
}

.sidebar .logo-image {
  width: auto;
  height: 80px;
  margin-bottom: 10px;
}

.sidebar .small-logo-image {
  width: auto;
  height: 30px;
  object-fit: contain;
  margin-bottom: 10px;
  position: relative;
  left: 83%;
}

.sidebar a {
  color: #c0c2c7;
  display: block;
  width: 100%;
  margin: 20px 0;
  padding-left: 40px;
  box-sizing: border-box;
  transition: 0.5s;
  transition-property: color;
}

.router-link-active span,
.router-link-active i {
  color: white;
}

.menu-item {
  color: #c0c2c7;
  display: block;
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.5s;
  transition-property: color;
}

.menu-item:hover {
  color: #fff;
}

.sidebar a:hover {
  color: #fff;
}

.sidebar i {
  padding-right: 10px;
}

.side-bar-collapsed {
  left: -190px;
}

.span-collapsed {
  display: none;
}

.logo-image-collapsed {
  display: none;
}

.icons-collapsed {
  font-size: 20px;
  margin-left: 170px;
  width: 80px;
}

@media only screen and (max-width: 992px) {
  .sidebar {
    display: none;
  }
  .side-bar-collapsed {
    display: block;
  }
}
</style>