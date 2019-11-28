/*
 * @Author: guo.mk 
 * @Date: 2019-11-28 18:10:35 
 * @Last Modified by:   guo.mk 
 * @Last Modified time: 2019-11-28 18:10:35 
 */
const compile = require('./../common/compile');
const visitor = require('./visitor');

const create = rule => compile('', rule, visitor);

module.exports = create;
