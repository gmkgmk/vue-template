/*
 * @Author: guo.mk
 * @Date: 2019-03-28 10:04:32
 * @Last Modified by: guo.mk
 * @Last Modified time: 2019-11-01 11:40:47
 */
const { modifyLog } = require('../helper');
const { inspectionImported } = require('./astHelper');
/**
 *Creates an instance of AstImplement.
 * @date 2019-03-28
 * @param {*} moduleName
 * @param {*} modulePath
 * @param {*} [ast={ program: {} }]
 * @memberof AstImplement
 */
class AstImplement {
    constructor(filePath, moduleName, modulePath, body = []) {
        this.body = body;
        this.moduleName = moduleName;
        this.modulePath = modulePath;
        this.filePath = filePath;
        this.rules = {
            [inspectionImported(this.body, this.moduleName)]: () => {
                modifyLog({ path: '' }, `[SKIPPED] ${filePath} (exists)`);
            }
        };
    }
    addRule(rule) {
        this.rules = {
            ...this.rules,
            rule
        };
    }
    inspection() {
        const rules = this.rules;
        const action = Object.entries(rules).filter(([checkStatus]) => checkStatus == 'false');
        if (action.length > 0) {
            action[0][1]();
            return false;
        } else {
            modifyLog({ path: this.filePath });
            return true;
        }
    }
}
module.exports = AstImplement;
