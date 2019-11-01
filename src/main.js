import Vue from 'vue';
import App from './App.vue';
import ElementUi from 'element-ui';
import store from './store/store';
import router from './router';
Vue.config.productionTip = false;

Vue.use(ElementUi, { size: 'medium' });

// 全局组件
import '@/component/index.js';

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
