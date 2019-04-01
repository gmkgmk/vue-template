/*
 * @Author: guo.mk
 * @Date: 2019-03-26 14:11:28
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-04-01 14:54:25
 */
// componentIndex AST改变
const astImplement = require('./astImplement');
const t = require('@babel/types');
const { programHelper } = require('./astHelper');

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
