const t = require('@babel/types');

exports.programHelper = function(path) {
    const { body } = path.node;
    // 增加新的Import
    const newImport = t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier(this.moduleName))],
        t.stringLiteral(`${this.modulePath}`)
    );
    body.unshift(newImport);
};

// 检验是否已经导入模块
exports.inspectionImported = (body, moduleName) => {
    const hasImported = body.find(
        el =>
            t.isImportDeclaration(el) &&
            el.specifiers.find(item => {
                return item.local.name === moduleName;
            })
    );
    return !hasImported;
};
