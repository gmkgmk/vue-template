// 项目目录前缀
exports.pathPrefix = 'src';
exports.routerPath = 'src/router/routes';

// 询问信息
exports.ps = [
  {
    type: 'input',
    query: '请输入要生成页面的模块:',
    handle: 'moduleName'
  },
  {
    type: 'input',
    query: '请输入要生成页面的名称:',
    handle: 'pageName'
  }
];
// 页面配置信息
exports.pageConfig = [
  {
    name: '页面',
    path: 'pages',
    key: 'page'
  },
  {
    name: '服务层',
    path: 'services',
    key: 'services'
  },
  {
    name: '模型',
    path: 'models',
    key: 'model'
  }
];
// 模板地址
exports.template = {
  page: './scripts/template/page.vue',
  model: './scripts/template/model.js',
  services: './scripts/template/services.js',
  moduleIndex: './scripts/template/module.index.js',
  routerIndex: './scripts/template/router.index.js'
};
