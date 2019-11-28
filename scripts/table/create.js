/*
 * @Author: guo.mk
 * @Date: 2019-11-28 14:55:09
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-11-28 15:02:31
 * 输出到一个文件夹
 */

const column = require('./create/column');

function create(optionList) {
    const code = optionList.map(code => {
        const { label, prop, ...options } = code;
        return column(label, prop, options);
    });
    return code.join('');
}

module.exports = create;
