const t = require('@babel/types');
// 创建scopeSlot
const createScopeSlot = funcExp => {
    return t.jsxExpressionContainer(
        t.objectExpression([t.objectProperty(t.identifier('default'), funcExp)])
    );
};
const createThisErp = thisErp => {
    return thisErp ? t.identifier(thisErp) : t.thisExpression();
};
// 创建函数
const creatFuncExp = option => {
    const defaultOption = {
        propsName: 'props',
        decimal: 2,
        funcName: 'toFinancialNum',
        thisErp: false,
        prop: 'this not Define'
    };
    const { propsName, decimal, funcName, prop, thisErp } = { ...defaultOption, ...option };

    return t.arrowFunctionExpression(
        [t.identifier(propsName)],
        t.blockStatement([
            t.returnStatement(
                t.arrayExpression([
                    t.callExpression(
                        t.memberExpression(createThisErp(thisErp), t.identifier(funcName)),
                        [
                            t.memberExpression(
                                t.memberExpression(t.identifier(propsName), t.identifier('row')),
                                t.identifier(prop)
                            ),
                            t.numericLiteral(decimal)
                        ]
                    )
                ])
            )
        ])
    );
};

const createScope = option => {
    const funcExp = creatFuncExp(option);
    return createScopeSlot(funcExp);
};
const visitor = options => {
    return {
        JSXOpeningElement(path) {
            const { node } = path;
            if (t.isJSXIdentifier(node.name) && node.name.name === 'el-table-column') {
                const { attributes } = node;
                const attr = t.jsxAttribute(t.jsxIdentifier('scopedSlots'), createScope(options));
                attributes.push(attr);
            }
        }
    };
};
module.exports = visitor;
