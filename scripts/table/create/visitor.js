const t = require('@babel/types');
const slotScope = require('./../slotScope');
const visitor = options => {
    return {
        JSXOpeningElement(path) {
            const { node } = path;
            if (t.isJSXIdentifier(node.name) && node.name.name === 'el-table-column') {
                const { attributes } = node;
                const attr = slotScope(options);
                attributes.push(attr);
            }
        }
    };
};
module.exports = visitor;
