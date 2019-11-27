const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const numberVisitor = require('./numberColumn');
const shell = require('shelljs');

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

const INIT_CWD = process.env.INIT_CWD;
const filePath = path.join(INIT_CWD, process.argv[2]);
const tableOptionList = require(filePath);
const code = tableOptionList.map(code => {
    const { label, prop, ...options } = code;
    return column(label, prop, options);
});
const result = code.join('');

fs.writeFileSync(path.join(INIT_CWD, './result.js'), result, 'utf8');
