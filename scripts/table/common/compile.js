/*
 * @Author: guo.mk 
 * @Date: 2019-11-28 18:10:29 
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-11-28 18:11:31
 */
const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

/**
 *
 *
 * @date 2019-11-28
 * @param {*} code
 * @param {*} rule
 * @param {*} visitor
 * @returns 
 */
function compile(code, rule, visitor) {
    const ast = parser.parse(code, {
        plugins: [['jsx', require('@babel/plugin-syntax-jsx').default]],
        sourceType: 'module'
    });

    traverse.default(ast, visitor(rule));

    return generator.default(ast, {}, code);
}

module.exports = compile;
