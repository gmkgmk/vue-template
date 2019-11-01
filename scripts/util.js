const t = require('@babel/types');
const out = require('plop/src/console-out');
const ora = require('ora');
const progress = ora();


/**
 * @date 2019-11-01
 * @param {*} path
 * 打印
 */
function modify(path) {
    let line = '';
    line += ` ${out.typeMap('modify')}`;
    line += ` ${path}`;
    progress.succeed(line);
}
/**
 * @date 2019-11-01
 * @param {*} message
 * 格式化打印数据
 */
exports.outMessage = message => {
    message.forEach(element => {
        if (element.error) {
            modify(element.error);
        }
        if (element.path) {
            // 截取src后面的路径 保持和plop同样的格式
            let modifyPath = element.path;
            const srcIndex = element.path.indexOf('src');
            if (srcIndex !== -1) {
                modifyPath = element.path.substring(srcIndex, modifyPath.length);
            }
            modify(`${modifyPath}`);
        }
    });
};

/**
 * @date 2019-11-01
 * @param {*} name
 */
exports.notEmpty = name => {
    return v => {
        if (!v || v.trim === '') {
            return `${name} is required`;
        } else {
            return true;
        }
    };
};
