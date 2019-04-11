import Vue from './node_modules/vue';
import App from './App.vue';
import ElementUi from './node_modules/element-ui';
import store from './store/store';
import router from './router';
Vue.config.productionTip = false;

Vue.use(ElementUi, { size: 'medium' });

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
