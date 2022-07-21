export default [
  {
    path: '/',
    name: 'relatorio-vendas',
    meta: {
      authRequired: true,
      permissions: ['VENDEDOR', 'ADMINISTRADOR']
    },
    component: () => import(/* webpackChunkName: "relatorio-vendas" */ '../views/vendas/relatorio-vendas')
  },
  {
    path: '/detalhe-venda',
    name: 'detalhe-venda',
    meta: {
      authRequired: true,
      permissions: ['VENDEDOR', 'ADMINISTRADOR']
    },
    component: () => import(/* webpackChunkName: "detalhe-venda" */ '../views/vendas/detalhe-venda')
  },
  {
    path: '/cadastro-venda',
    name: 'cadastro-venda',
    meta: {
      authRequired: true,
      permissions: ['VENDEDOR', 'ADMINISTRADOR']
    },
    component: () => import(/* webpackChunkName: "cadastro-venda" */ '../views/vendas/cadastro-venda')
  },
  {
    path: '/cadastro-empresa',
    name: 'cadastro-empresa',
    meta: {
      authRequired: true,
      permissions: ['ADMINISTRADOR']
    },
    component: () => import(/* webpackChunkName: "cadastro-empresa" */ '../views/empresas/cadastro-empresa')
  },
  {
    path: '/cadastro-cliente',
    name: 'cadastro-cliente',
    meta: {
      authRequired: true,
      permissions: ['ADMINISTRADOR']
    },
    component: () => import(/* webpackChunkName: "cadastro-empresa" */ '../views/clientes/cadastro-cliente')
  },
  {
    path: '/cadastro-produto',
    name: 'cadastro-produto',
    meta: {
      authRequired: true,
      permissions: ['ADMINISTRADOR']
    },
    component: () => import(/* webpackChunkName: "cadastro-empresa" */ '../views/produtos/cadastro-produto')
  },
  {
    path: '/login',
    name: 'login',   
    component: () => import(/* webpackChunkName: "login" */ '../views/account/login'),
    meta: {
      authRequired: false,
    },
  },
]