// 项目目录前缀
exports.pathPrefix = 'src/packages';
exports.routerPath = 'src/router/framework';
exports.pageIndexPath = 'src/packages/index.js';
exports.pagePath = '@pages'; //alias or path
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
// 确认生成的页面信息
exports.confirmPs = {
    type: 'confirm',
    query: '',
    handle: 'result',
    accept: 'Y',
    deny: 'n'
};
// 页面配置信息
exports.pageConfig = {
    page: {
        name: '页面',
        path: 'pages'
    },
    services: {
        name: '服务层',
        path: 'services'
    },
    model: {
        name: '模型层',
        path: 'model'
    }
};
// 模板地址
exports.template = {
    page: './scripts/template/page.vue',
    model: './scripts/template/model.js',
    services: './scripts/template/services.js',
    moduleIndex: './scripts/template/module.index.js',
    routerIndex: './scripts/template/router.index.js'
};
