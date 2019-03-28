import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@pages/login.vue';
import layout from './routes';
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  layout
];

const router = new VueRouter({
  routes
});

export default router;
