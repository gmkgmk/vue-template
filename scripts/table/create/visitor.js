/*
 * @Author: guo.mk 
 * @Date: 2019-11-28 18:10:37 
 * @Last Modified by:   guo.mk 
 * @Last Modified time: 2019-11-28 18:10:37 
 */
const columnCreator = require('./../common/columnCreator');

const visitor = list => {
    return {
        Program(path) {
            const columns = list.map(el => {
                const { label, prop, ...option } = el;
                return columnCreator(label, prop, option);
            });
            
            path.node.body = columns;
        }
    };
};
module.exports = visitor;
