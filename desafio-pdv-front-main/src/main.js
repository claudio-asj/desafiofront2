import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vue-toasted'
import './plugins/vuelidate'
import axios from './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(axios);

Vue.config.productionTip = false

require('@/store/subscriber')

store.dispatch('getUserInfo', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})