/*
 * @Author: guo.mk
 * @Date: 2019-03-28 10:04:32
 * @Last Modified by:   guo.mk
 * @Last Modified time: 2019-03-28 10:04:32
 */
const { errorLog } = require('../helper');
const { inspectionImported } = require('../until');

/**
 *Creates an instance of AstImplement.
 * @date 2019-03-28
 * @param {*} moduleName
 * @param {*} modulePath
 * @param {*} [ast={ program: {} }]
 * @memberof AstImplement
 */
class AstImplement {
    constructor(moduleName, modulePath, ast = { program: {} }) {
        this.body = ast.program.body || [];
        this.moduleName = moduleName;
        this.modulePath = modulePath;
    }
    inspection() {
        const rules = {
            [inspectionImported(this.body, this.moduleName)]: () => {
                errorLog(
                    `error:修改文件发生错误:已存在变量名${
                        this.moduleName
                    }，引入路径：${this.modulePath}`
                );
            }
        };
        const action = Object.entries(rules).filter(
            ([checkStatus]) => checkStatus == 'false'
        );
        if (action.length > 0) {
            action[0][1]();
            return false;
        } else {
            return true;
        }
    }
}
module.exports = AstImplement;
