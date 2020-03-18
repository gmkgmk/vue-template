import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@pages/login.vue';
import Layout from '@pages/layout/index.vue';
Vue.use(VueRouter);
const routerContext = require.context('./routes', true, /\.js$/);
const route = routerContext.keys().reduce((p, r) => p.concat(routerContext(r).default), []);
let routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: route
  }
];
const router = new VueRouter({
  mode: 'history',
  routes
});
export default router;
