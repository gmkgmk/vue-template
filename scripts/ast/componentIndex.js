/*
 * @Author: guo.mk
 * @Date: 2019-03-26 14:11:28
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-03-28 09:20:47
 */
// componentIndex AST改变
const astImplement = require('./astImplement');
const t = require('@babel/types');

/**
 *Creates an instance of componentIndexAst.
 * @date 2019-03-26
 * @param {*} moduleName
 * @param {*} modulePath
 * @param {*} [ast={ program: {} }]
 * @memberof componentIndexAst
 */
module.exports = class ComponentIndexAst extends astImplement {
    constructor(moduleName, modulePath, ast) {
        super(moduleName, modulePath, ast);
    }
    ExportNamedDeclaration(path) {
        const { specifiers } = path.node;
        const objectProp = t.objectProperty(
            t.identifier(this.moduleName),
            t.identifier(this.moduleName),
            false,
            true
        );
        specifiers.push(objectProp);
    }
    Program(path) {
        const { body } = path.node;
        // 增加新的Import
        const newImport = t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier(this.moduleName))],
            t.stringLiteral(`${this.modulePath}`)
        );
        body.unshift(newImport);
    }
};
