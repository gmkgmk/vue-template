const path = require('path');
const fs = require('fs');
const { transformModel, transformModelIndex } = require('./../transform/transformToAst');

/*
 *  todo: 修改module相关信息入口
 */
module.exports = class {
    constructor({ modelPath, pageName, moduleName }) {
        this.pageName = pageName;
        this.moduleName = moduleName;

        this.modelPath = path.join(modelPath, moduleName, 'index.js');
        this.modelIndexPath = path.join(modelPath, 'index.js');
        this.run();
    }
    run() {
        this.transformModel();
    }
    transformModel() {
        // if (!fs.existsSync(this.modelPath)) {
        transformModelIndex(this.modelIndexPath, this.moduleName, `./${this.moduleName}`);
        // }

        const source = `./${this.pageName}.js`;
        transformModel(this.modelPath, this.pageName, source);
    }
};
