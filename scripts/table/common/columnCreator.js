/*
 * @Author: guo.mk
 * @Date: 2019-11-28 18:10:27
 * @Last Modified by: guo.mk
 * @Last Modified time: 2020-01-06 15:58:36
 */
const t = require('@babel/types');
const _ = require('lodash');
const slotScope = require('./slotScope');

/**
 *
 * @param {string} labal
 * @param {string} prop
 * @param {Object} options
 * @return {<el-table-column label=label prop=prop></el-table-column>}
 */

const columnCreator = (labal, prop, options) => {
  const attributes = [
    t.jsxAttribute(t.jsxIdentifier('label'), t.stringLiteral(labal)),
    t.jsxAttribute(t.jsxIdentifier('prop'), t.stringLiteral(prop))
  ];
  // 增加slotScope
  // disable代表忽略这个col 的 slotScope
  if (!_.isEmpty(options) || options.disable) {
    attributes.push(slotScope({ ...options, prop, ...options.option }));
  }

  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier('el-table-column'), attributes),
    t.jsxClosingElement(t.jsxIdentifier('el-table-column')),
    []
  );
};

module.exports = columnCreator;
