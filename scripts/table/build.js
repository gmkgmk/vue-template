/*
 * @Author: guo.mk
 * @Date: 2019-11-28 14:55:35
 * @Last Modified by: guo.mk
 * @Last Modified time: 2020-03-15 13:47:47
 * 输出到vue => el-table里
 */
const compile = require('./build/compile');
const path = require('path');
const prettier = require('prettier');
let prettierConfig = null;
try {
  prettierConfig = require(path.join(process.cwd(), '.prettierrc.js'));
} catch (error) {}

const outScript = (code, startStr, endStr) => {
  return `
        ${startStr}
        ${code}
        ${endStr}
    `;
};

module.exports = (code, rules) => {
  const startIndex = code.indexOf('export default');
  const endIndex = code.lastIndexOf('<');

  const str = code.substring(startIndex, endIndex);
  const startStr = code.substring(0, startIndex);
  const endStr = code.substring(endIndex);

  let result = compile(str, rules);
  if (prettierConfig) {
    result = prettier.format(result, { ...prettierConfig, parser: 'babel' });
  }
  return outScript(result, startStr, endStr);
};
