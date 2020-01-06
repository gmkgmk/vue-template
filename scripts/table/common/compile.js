/*
 * @Author: guo.mk
 * @Date: 2019-11-28 18:10:29
 * @Last Modified by: guo.mk
 * @Last Modified time: 2020-01-06 13:48:01
 */
const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const prettier = require('prettier');
const path = require('path');
let prettierConfig = null;
try {
  prettierConfig = require(path.join(process.cwd(), '.prettierrc.js'));
} catch (error) {}
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

  let source = generator.default(ast, {}, code).code;

  if (prettierConfig) {
    source = prettier.format(source, { ...prettierConfig, parser: 'babel' });
}

  return source;
}

module.exports = compile;
