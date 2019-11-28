/*
 * @Author: guo.mk
 * @Date: 2019-11-28 14:55:35
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-11-28 18:09:55
 * 输出到vue => el-table里
 */
const compile = require('./build/compile');

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

    const result = compile(str, rules).code;
    
    return outScript(result, startStr, endStr);
};
