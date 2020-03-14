import order from './order.js';
import { Layout } from '@pages';
export default {
  path: '/layout',
  component: Layout,
  children: [...order]
};
