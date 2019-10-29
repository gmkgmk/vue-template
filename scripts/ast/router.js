const t = require('@babel/types');
const astImplement = require('./astImplement');

// 生成router Ast树
module.exports = class routerAst extends astImplement {
    constructor(moduleName, modulePath) {
        super(moduleName, modulePath);
    }
    ImportDeclaration(path) {
        const { specifiers } = path.node;
        const newImport = t.ImportSpecifier(
            t.identifier(this.moduleName),
            t.identifier(this.moduleName)
        );
        specifiers.push(newImport);
    }
    ExportDefaultDeclaration(path) {
        const { declaration } = path.node;

        if (t.isArrayExpression(declaration)) {
            const { elements } = declaration;
            const properties = [
                t.objectProperty(
                    t.identifier('path'),
                    t.stringLiteral(`${this.modulePath}`)
                ),
                t.objectProperty(
                    t.identifier('name'),
                    t.stringLiteral(`${this.modulePath}`)
                ),
                t.objectProperty(
                    t.identifier('component'),
                    t.Identifier(this.moduleName)
                )
            ];
            const element = t.objectExpression(properties);

            elements.push(element);
        }
    }
};
