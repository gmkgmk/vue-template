/*
 * @Author: guo.mk
 * @Date: 2019-11-28 18:10:19
 * @Last Modified by: guo.mk
 * @Last Modified time: 2020-01-06 15:56:52
 */
const t = require('@babel/types');
// 创建scopeSlot
const createScopeSlot = funcExp => {
  return t.jsxExpressionContainer(
    t.objectExpression([t.objectProperty(t.identifier('default'), funcExp)])
  );
};

// this名称
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
          t.callExpression(t.memberExpression(createThisErp(thisErp), t.identifier(funcName)), [
            t.memberExpression(
              t.memberExpression(t.identifier(propsName), t.identifier('row')),
              t.identifier(prop)
            ),
            t.numericLiteral(decimal)
          ])
        ])
      )
    ])
  );
};

module.exports = option => {
  const funcExp = creatFuncExp(option);
  const slotScope = createScopeSlot(funcExp);
  return t.jsxAttribute(t.jsxIdentifier('scopedSlots'), slotScope);
};
