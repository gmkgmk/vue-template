const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const visitorFactory = require('./visitorFactory');

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

    return generator.default(ast, {}, code);
}

module.exports = compile;
