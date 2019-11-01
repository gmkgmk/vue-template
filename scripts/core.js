const path = require('path');
const { currentPath } = require('./helper');
const { routerPath, pageIndexPath, modulePath } = require('./config');
const { transformModel, transformRouter } = require('./transform/index');
const {failures} = require("./failures")
function destPath(file) {
    // 获取文件地址
    return new FilePath(file);
}

/**
 * 文件路径管理
 * @date 2019-02-13
 * @class FilePath
 */
class FilePath {
    constructor(file) {
        const { moduleName, pageName } = file;
        this.rootPath = currentPath();

        this.moduleName = moduleName;
        this.pageName = pageName;

        this.pageIndexPath = path.join(this.rootPath, pageIndexPath);
        this.routerPath = path.join(this.rootPath, routerPath);
        this.modelPath = path.join(this.rootPath, modulePath);
    }
}

const bootStrap = moduleInfo => {
    let filePath = destPath(moduleInfo);
    // model
    new transformModel(filePath);
    // router pageIndex
    new transformRouter(filePath);

    return failures;
};
module.exports = bootStrap;
