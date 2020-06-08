import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import '@/assets/styles/main.css';
import { vueBaberrage } from 'vue-baberrage'


Vue.config.productionTip = false;

Vue.use(require('vue-moment'));
Vue.use(vueBaberrage)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
