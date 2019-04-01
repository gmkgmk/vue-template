/*
 * @Author: guo.mk
 * @Date: 2019-03-26 17:43:47
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-04-01 14:45:50
 */
const t = require('@babel/types');
const astImplement = require('./astImplement');
const { programHelper } = require('./astHelper');
// 生成model Ast树

module.exports = class modelAst extends astImplement {
  constructor(moduleName, modulePath, ast) {
    super(moduleName, modulePath, ast);
  }
  ExportDefaultDeclaration(path) {
    const { declaration } = path.node;
    if (t.isObjectExpression(declaration)) {
      const objectProp = t.objectProperty(
        t.identifier(this.moduleName),
        t.identifier(this.moduleName),
        false,
        true
      );
      declaration.properties.push(objectProp);
    }
  }
  Program() {
    programHelper.apply(this, arguments);
  }
};
