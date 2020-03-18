import Vue from 'vue';
import App from './App.vue';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

// vuex
import store from './store';
// 路由
import router from './router';
// 全局组件
import '@components';

import * as filters from './filters'; // global filters

import ElementUi from 'element-ui';
Vue.use(ElementUi, { size: 'medium' });

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
