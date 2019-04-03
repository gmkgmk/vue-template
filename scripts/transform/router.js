const path = require('path');
const fs = require('fs');
const {
  transformComponentIndex,
  transformRouter,
  transformRouteIndex
} = require('./transformToAst');
const { FilesGenerator } = require('../until');

const routerComponentName = (moduleName, pageName) =>
  moduleName + pageName.charAt(0).toUpperCase() + pageName.slice(1);

module.exports = class {
  constructor(filePath, pageName, moduleName, componentPath, template) {
    this.pageName = pageName;
    this.moduleName = moduleName;
    this.template = template;
    this.routeIndex = path.join(filePath, 'index.js');
    this.routePath = path.join(filePath, `${this.moduleName}.js`);
    this.componentIndexPath = path.join(componentPath, 'pages', `index.js`);
    this.run();
  }
  run() {
    this.transformRouter();
  }
  // 重写路由信息
  // 1.重写路由信息
  // 2.page/index.js导出文件
  async transformRouter() {
    if (!fs.existsSync(this.routePath)) {
      await this.createWithNewModule();
    }
    transformRouter(
      this.routePath,
      routerComponentName(this.moduleName, this.pageName),
      `${this.moduleName}/${this.pageName}`
    );
    this.componentIndex();
  }
  // 新建模块:
  // 1.router建立新模块文件
  // 2.router/index.js导入新加入的模块
  async createWithNewModule() {
    await this.createNewModule();
    this.routerIndex();
  }
  componentIndex() {
    const componentPath = `@pages/${this.moduleName}/${this.pageName}.vue`;
    transformComponentIndex(
      this.componentIndexPath,
      routerComponentName(this.moduleName, this.pageName),
      componentPath
    );
  }
  // 新建模块文件夹
  async createNewModule() {
    await FilesGenerator(this.routePath, this.template);
  }
  // 整理router/index.js
  async routerIndex() {
    const routeIndex = path.join(this.routePath, '..', 'index.js');
    const componentPath = `./${this.moduleName}.js`;
    transformRouteIndex(routeIndex, this.moduleName, componentPath);
  }
};
