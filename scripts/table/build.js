/*
 * @Author: guo.mk
 * @Date: 2019-11-28 14:55:35
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-11-28 16:38:35
 * 输出到vue => el-table里
 */
const compile = require('./build/compile');
const ootScript = code => {
    return `
    <script>
        ${trmsformCode(code)}
    </script>
    `;
};
// uncode => code
function trmsformCode(code) {
    return unescape(code.replace(/\\u/g, '%u'));
}

module.exports = (code, rule) => {
    const startIndex = code.indexOf('export default');
    const endIndex = code.lastIndexOf('<');
    const str = code.substring(startIndex, endIndex);
    const result = compile(str, rule);
    return ootScript(result);
};
