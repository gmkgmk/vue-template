'use strict';
const bootStrap = require('./scripts/core');
const { outMessage, notEmpty } = require('./scripts/util');

// 假定一秒钟以后创建完成文件夹
const waitTime = 1000;
const delayLog = () => data =>
  new Promise(resolve => {
    setTimeout(() => {
      // /修改入口/
      const modifyMessage = bootStrap(data);
      // 打印修改信息
      outMessage(modifyMessage);
      resolve('done');
    }, waitTime);
  });

module.exports = function(plop) {
  plop.setGenerator('page', {
    description: '新建页面',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'module name',
        validate: notEmpty('moduleName')
      },
      {
        type: 'input',
        name: 'pageName',
        message: 'page name',
        validate: notEmpty('pageName')
      }
    ],
    actions: () => {
      const actions = [
        {
          type: 'add',
          path: 'src/pages/{{moduleName}}/{{pageName}}.vue',
          templateFile: 'scripts/template/page.hbs'
        },
        {
          type: 'add',
          path: 'src/model/{{moduleName}}/{{pageName}}.js',
          templateFile: 'scripts/template/model.js'
        },

        {
          type: 'add',
          path: 'src/services/{{moduleName}}/{{pageName}}.js',
          templateFile: 'scripts/template/services.js'
        },
        {
          type: 'add',
          path: 'src/router/routes/{{moduleName}}.js',
          templateFile: 'scripts/template/router.index.js',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/model/{{moduleName}}/index.js',
          templateFile: 'scripts/template/module.index.js',
          skipIfExists: true
        },
        delayLog('delayed thing')
      ];
      return actions;
    }
  });
};
