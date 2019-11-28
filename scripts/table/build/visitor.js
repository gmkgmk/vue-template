/*
 * @Author: guo.mk 
 * @Date: 2019-11-28 18:10:23 
 * @Last Modified by:   guo.mk 
 * @Last Modified time: 2019-11-28 18:10:23 
 */
const t = require('@babel/types');
const columnCreator = require('./../common/columnCreator');

const visitor = rules => ({
    JSXOpeningElement(path) {
        const { node } = path;
        if (t.isJSXIdentifier(node.name) && node.name.name === 'el-table') {
            const nodesList = rules.map(code => {
                const { label, prop, ...options } = code;
                return columnCreator(label, prop, options);
            });
            const parent = path.parent;
            parent.children = nodesList;
        }
    }
});

module.exports = visitor;
