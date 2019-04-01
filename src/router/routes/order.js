import { orderList, orderCreate } from '@pages';
export default [{
  path: 'order/list',
  name: 'order/list',
  component: orderList
}, {
  path: "order/create",
  name: "order/create",
  component: orderCreate
}];