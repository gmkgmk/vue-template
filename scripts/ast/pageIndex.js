/*
 * @Author: guo.mk
 * @Date: 2019-03-26 14:11:28
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-07-05 16:24:20
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
    Program() {
        programHelper.apply(this, arguments);
    }
};

// 增加webpackChunkName注释
function addComments(module, value) {
    module.leadingComments = [
        {
            type: 'CommentBlock',
            value: `webpackChunkName: 'group-${value}'`
        }
    ];
}
function programHelper(path) {
    const { body } = path.node;
    const id = t.identifier(this.moduleName);
    const strNode = t.stringLiteral(this.modulePath);
    // import
    const importNode = t.callExpression(t.import(), [strNode]);
    // '@pages/moduleName/path' => moduleName
    const moduleComments = this.modulePath.split('/')[1];
    addComments(importNode, moduleComments);
    // 箭头函数
    const init = t.arrowFunctionExpression([], importNode);
    const newNode = t.variableDeclaration('const', [t.variableDeclarator(id, init)]);

    body.unshift(newNode);
}
