const path = require('path');
const fs = require('fs');
const {
  transformModel,
  transformModelIndex
} = require('./../transform/transformToAst');
const { FilesGenerator } = require('./../util');

module.exports = class {
  constructor({ model, pageName, moduleName }, template) {
    this.modelPath = path.join(model, '..', 'index.js');
    this.pageName = pageName;
    this.moduleName = moduleName;
    this.template = template;
    this.modelIndexPath = path.join(this.modelPath, '..', '..', 'index.js');
    this.vuexPath = `./${this.pageName}.js`;

    this.run();
  }
  run() {
    this.transformModel();
  }
  async transformModel() {
    if (!fs.existsSync(this.modelPath)) {
      await this.modelIndex();
    }
    // 新建页面-修改modelName/index.js
    transformModel(this.modelPath, this.pageName, this.vuexPath);
  }
  // 模块是新建时,需要建立
  // 1.modelName/index.js
  // 2.修改model/index.js
  async modelIndex() {
    await this.createNewModule();
    transformModelIndex(
      this.modelIndexPath,
      this.moduleName,
      `./${this.moduleName}`
    );
  }
  async createNewModule() {
    await FilesGenerator(this.modelPath, this.template);
  }
};
