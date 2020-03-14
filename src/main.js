import Vue from 'vue';
import App from './App.vue';
// vuex
import store from './store';
// 路由
import router from './router';
// 全局组件
import '@/component/index.js';
import ElementUi from 'element-ui';
Vue.use(ElementUi, { size: 'medium' });

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
