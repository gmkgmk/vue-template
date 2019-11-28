const fs = require('fs');
const path = require('path');
const create = require('./create');
const build = require('./build');
const INIT_CWD = process.env.INIT_CWD;

if (process.argv.length == 2) {
    throw '请选择配置文件!';
}
const [, , configPath, way = 'build'] = process.argv;
console.log('way: ', way);

const filePath = path.join(INIT_CWD, configPath);

let result = '';
let outPutPath = configPath;

if (way === 'build') {
    const basename = path.basename(filePath, '.vue');
    const str = fs.readFileSync(filePath, 'utf8');
    // rule
    const rulePath = path.join(INIT_CWD, `${basename}.js`);
    const rule = require(rulePath);

    result = build(str, rule);
}

if (way === 'create') {
    const optionList = require(filePath);
    result = create(optionList);
    outPutPath = 'result.js';
}

fs.writeFileSync(path.join(INIT_CWD, outPutPath), result, 'utf8');
