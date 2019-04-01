/*
 * @Author: guo.mk
 * @Date: 2019-03-26 17:43:47
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-04-01 14:46:24
 */
const t = require('@babel/types');
const astImplement = require('./astImplement');
const { programHelper } = require('./astHelper');

// 生成model Ast树

module.exports = class modelAst extends astImplement {
  constructor(moduleName, modulePath, ast) {
    super(moduleName, modulePath, ast);
  }
  ObjectExpression(path) {
    const { properties } = path.node;
    properties.forEach(e => {
      const { name } = e.key;
      if (name === 'modules') {
        const { properties: moduleProp } = e.value;
        const objectProp = t.objectProperty(
          t.identifier(this.moduleName),
          t.identifier(this.moduleName),
          false,
          true
        );
        moduleProp.unshift(objectProp);
      }
    });
  }
  Program() {
    programHelper.apply(this, arguments);
  }
};
