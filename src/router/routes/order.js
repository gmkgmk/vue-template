import { orderList, orderCreate, orderA } from '@pages';
export default [{
  path: 'order/list',
  name: 'order/list',
  component: orderList
}, {
  path: "order/create",
  name: "order/create",
  component: orderCreate
}, {
  path: "order/a",
  name: "order/a",
  component: orderA
}];