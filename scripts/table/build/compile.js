const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const visitor = require('./visitor');
function compile(str, rules) {
    const ast = parser.parse(str, {
        plugins: [['jsx', require('@babel/plugin-syntax-jsx').default]],
        sourceType: 'module'
    });
    traverse.default(ast, visitor(rules));

    const { code } = generator.default(ast, {}, str);
    return code;
}

module.exports = compile;
