const _ = require('lodash');
const numberVisitor = require('./visitor');
const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

function compile(code, options) {
    const ast = parser.parse(code, {
        plugins: [['jsx', require('@babel/plugin-syntax-jsx').default]]
    });
    const { type } = options;
    
    if (type === 'number') {
        traverse.default(ast, numberVisitor(options));
    }

    return generator.default(ast, {}, code);
}

const column = (label, prop, options) => {
    let code = `<el-table-column label='${label}' prop='${prop}'></el-table-column>`;
    if (_.isEmpty(options) || options.disable) return code;
    code = compile(code, { ...options, prop }).code;
    return code;
};

module.exports = column;
