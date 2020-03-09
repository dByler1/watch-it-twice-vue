import Vue from 'vue';
import App from './App.vue';
import './config/axios';
import Vuelidate from 'vuelidate'
import { router } from './Router';
import { store } from './store';


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import "@/assets/styles/custom.scss";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate)

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
