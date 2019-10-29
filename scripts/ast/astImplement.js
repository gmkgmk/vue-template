/*
 * @Author: guo.mk
 * @Date: 2019-03-28 10:04:32
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-07-05 14:46:52
 */
const { errorLog } = require('../helper');
const { inspectionImported } = require('../util');

/**
 *Creates an instance of AstImplement.
 * @date 2019-03-28
 * @param {*} moduleName
 * @param {*} modulePath
 * @param {*} [ast={ program: {} }]
 * @memberof AstImplement
 */
class AstImplement {
    constructor(moduleName, modulePath,body=[]) {
        this.body = body;
        this.moduleName = moduleName;
        this.modulePath = modulePath;
        this.rules = {
            [inspectionImported(this.body, this.moduleName)]: () => {
                errorLog(
                    `error:修改文件发生错误:已存在变量名${this.moduleName}，引入路径：${
                        this.modulePath
                    }`
                );
            }
        };
    }
    addRule(rule) {
        console.log('rule: ', rule);
        this.rules = {
            ...this.rules,
            ...rule
        };
    }
    inspection() {
        const rules = this.rules;
        const action = Object.entries(rules).filter(([checkStatus]) => checkStatus == 'false');
        if (action.length > 0) {
            action[0][1]();
            return false;
        } else {
            return true;
        }
    }
}
module.exports = AstImplement;
