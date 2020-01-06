/*
 * @Author: guo.mk
 * @Date: 2019-11-28 14:55:09
 * @Last Modified by: guo.mk
 * @Last Modified time: 2020-01-06 13:46:20
 * 输出到一个文件夹
 */

const compile = require('./create/compile');

const create = list => compile(list);

module.exports = create;
