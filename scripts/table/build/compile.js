/*
 * @Author: guo.mk 
 * @Date: 2019-11-28 18:10:45 
 * @Last Modified by:   guo.mk 
 * @Last Modified time: 2019-11-28 18:10:45 
 */
const compile = require('./../common/compile');
const visitor = require('./visitor');

const build = (code, rules) => compile(code, rules, visitor);

module.exports = build;
