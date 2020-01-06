/*
 * @Author: guo.mk
 * @Date: 2019-11-28 18:10:23
 * @Last Modified by: guo.mk
 * @Last Modified time: 2020-01-06 11:48:30
 */
const t = require('@babel/types');
const columnCreator = require('./../common/columnCreator');

const visitor = rules => ({
  JSXOpeningElement(path) {
    const { node } = path;
    if (t.isJSXIdentifier(node.name) && node.name.name === 'el-table') {
      const parent = path.parent;

      const nodesList = rules.map(code => {
        const { label, prop, ...options } = code;

        const openEl = parent.children.find(el => {
          if (el && el.type === 'JSXElement' && el.openingElement.type === 'JSXOpeningElement') {
            return el.openingElement.attributes.find(item => item.value.value === prop);
          }
        });

        // 如果已存在,则需要过滤'label', 'prop', 'scopedSlots'属性,保存其他属性
        if (openEl) {
          const attrs = openEl.openingElement.attributes.filter(el => {
            return !['label', 'prop', 'scopedSlots'].find(item => item === el.name.name);
          });
          //  新建一个col 重写'label', 'prop', 'scopedSlots'三个属性
          const col = columnCreator(label, prop, options);
          col.openingElement.attributes = [...col.openingElement.attributes, ...attrs];
          return col;
        }

        // 如果不存在,则新建
        return columnCreator(label, prop, options);
      });
      parent.children = nodesList;
    }
  }
});

module.exports = visitor;
