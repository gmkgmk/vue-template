const path = require('path');
const { transformPageIndex, transformRouter, transformRouteIndex } = require('./transformToAst');
const { pagePath } = require('./../config');
const routerComponentName = (moduleName, pageName) =>
    moduleName + pageName.charAt(0).toUpperCase() + pageName.slice(1);

module.exports = class {
    constructor({ routerPath, pageName, moduleName, pageIndexPath }) {
        this.pageName = pageName;
        this.moduleName = moduleName;
        this.routeIndex = path.join(routerPath, 'index.js');
        this.routePath = path.join(routerPath, `${this.moduleName}.js`);
        this.componentIndexPath = path.join(pageIndexPath);
        this.run();
    }
    run() {
        this.transformRouter();
    }
    // 重写路由信息
    // 1.重写路由信息
    // 2.page/index.js导出文件
    async transformRouter() {
        // this.routerIndex();
        // 重写路由信息
        this.route();
        // 重写pagesIndex信息
        this.componentIndex();
    }
    route() {
        transformRouter(
            this.routePath,
            routerComponentName(this.moduleName, this.pageName),
            `${this.moduleName}/${this.pageName}`
        );
    }
    // 重写pagesIndex信息
    componentIndex() {
        const pageIndexPath = `${pagePath}/${this.moduleName}/${this.pageName}.vue`;
        transformPageIndex(
            this.componentIndexPath,
            routerComponentName(this.moduleName, this.pageName),
            pageIndexPath
        );
    }
    // 重写router/index.js
    async routerIndex() {
        const routeIndex = path.join(this.routePath, '..', 'index.js');
        const pageIndexPath = `./${this.moduleName}.js`;
        transformRouteIndex(routeIndex, this.moduleName, pageIndexPath);
    }
};
