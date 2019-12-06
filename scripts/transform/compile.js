const path = require('path');
const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const visitorFactory = require('./visitorFactory');
const prettier = require('prettier');

let prettierConfig = null;
try {
  prettierConfig = require(path.join(process.cwd(), '.prettierrc.js'));
} catch (error) {}
// ast流程 
/**
 * todo:
 * 1.parse code to  ast
 * 2.traverse ast
 * 3.generator code from ast
 *
 * @param {string} code  文件代码
 * @param {string} moduleName 模块名称
 * @param {string} modulePath 模块路径
 * @param {string} filePath 文件绝对路径
 * @param {ast} createVisitor ast操作代码
 */
function compile(code, createVisitor, filePath, moduleName, modulePath) {
  const ast = parser.parse(code, {
    allowImportExportEverywhere: true,
    plugins: [['dynamicImport', require('@babel/plugin-syntax-dynamic-import').default]]
  });

  const visitorPlugin = new createVisitor(filePath, moduleName, modulePath, ast.program.body);

  const visitor = visitorFactory(visitorPlugin);
  traverse.default(ast, visitor);

  let { code: source } = generator.default(ast, {}, code);

  if (prettierConfig) {
    source = prettier.format(source, prettierConfig);
  }

  return source;
}

module.exports = compile;
