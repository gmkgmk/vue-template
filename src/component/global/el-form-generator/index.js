import defaultComponents from './src/components';
import FormGenerator from './src/formGenerator';
export * from './src/util.js';

const install = async Vue => {
  Vue.component('ElFormGenerator', FormGenerator);
};

// console.log('util: ', util);
export default {
  version: '0.1.0',
  defaultComponents,
  FormGenerator,
  install
};
