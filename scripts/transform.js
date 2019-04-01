const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const t = require('@babel/types');
const fs = require('fs');
const codeEncoding = 'utf8';
const componentIndexAst = require('./ast/componentIndex');
const modelIndexAst = require('./ast/modelIndex');
const modelAst = require('./ast/model');
const routerAst = require('./ast/router');
const methods = [
  'ExportDefaultDeclaration',
  'ExportNamedDeclaration',
  'ObjectExpression',
  'Program',
  'ImportDeclaration'
];

class Visitor {
  constructor() {
    this.astClass = {};
  }
  use(astClass) {
    if (typeof astClass !== 'object')
      throw new TypeError('middleware must be a object!');
    if (!astClass.inspection()) return;
    this.astClass = astClass;
    return this;
  }
  run() {
    const visitor = {};
    for (const method of methods) {
      if (this.astClass[method]) {
        visitor[method] = this.astClass[method].bind(this.astClass);
      }
    }
    return visitor;
  }
}

function compile(code, moduleName, modulePath, createVisitor) {
  const ast = parser.parse(code, { allowImportExportEverywhere: true });
  const visitorControl = new Visitor();
  visitorControl.use(new createVisitor(moduleName, modulePath, ast));
  const visitor = visitorControl.run();
  traverse.default(ast, visitor);

  return generator.default(ast, {}, code);
}

function transform(astVisitor) {
  return function(filePath, moduleName, modulePath) {
    fs.readFile(filePath, codeEncoding, (err, code) => {
      if (err) {
        return;
      }
      const result = compile(code, moduleName, modulePath, astVisitor);

      fs.writeFileSync(filePath, result.code, codeEncoding);
    });
  };
}

// 模板地址
exports.transformModel = transform(modelAst);
exports.transformRouter = transform(routerAst);
exports.transformComponentIndex = transform(componentIndexAst);
exports.transformModelIndex = transform(modelIndexAst);
