const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const { transform } = require('./../util');

const pageIndexAst = require('../ast/pageIndex');
const modelIndexAst = require('../ast/modelIndex');
const routerIndexAst = require('../ast/routerIndex');
const modelAst = require('../ast/model');
const routerAst = require('../ast/router');

const methods = [
    'ExportDefaultDeclaration',
    'ExportNamedDeclaration',
    'ObjectExpression',
    'Program',
    'ImportDeclaration'
];

// 生成 visitor
class VisitorMiddle {
    constructor() {
        this.astClass = {};
    }
    use(astClass) {
        if (typeof astClass !== 'object') throw new TypeError('middleware must be a object!');
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
// visitor  creator
function visitorFactory(visitorPlugin) {
    const visitorControl = new VisitorMiddle();
    visitorControl.use(visitorPlugin);
    return visitorControl.run();
}
// 编译
function compile(code, moduleName, modulePath, createVisitor) {
    const ast = parser.parse(code, {
        allowImportExportEverywhere: true,
        plugins: [['dynamicImport', require('@babel/plugin-syntax-dynamic-import').default]]
    });

    const visitorPlugin = new createVisitor(moduleName, modulePath, ast.program.body);

    const visitor = visitorFactory(visitorPlugin);
    traverse.default(ast, visitor);

    return generator.default(ast, {}, code);
}

const transformRun = transform(compile)
// 模板地址
exports.transformModel = transformRun(modelAst);
exports.transformRouter = transformRun(routerAst);
exports.transformPageIndex = transformRun(pageIndexAst);
exports.transformModelIndex = transformRun(modelIndexAst);
exports.transformRouteIndex = transformRun(routerIndexAst);
