import { Layout, Home } from '@pages';
import order from './order';
export default {
  path: '/layout',
  component: Layout,
  children: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    ...order,
  ]
};
