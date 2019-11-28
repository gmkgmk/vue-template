const t = require('@babel/types');
const _ = require('lodash');
const rule = require('./test');

const columnCreator = (labal, prop, options) => {
    const attributes = [
        t.jsxAttribute(t.jsxIdentifier('label'), t.stringLiteral(labal)),
        t.jsxAttribute(t.jsxIdentifier('prop'), t.stringLiteral(prop))
    ];
    // 增加slotScope
    if (!_.isEmpty(options) || options.disable) {
        attributes.push(
            t.jsxAttribute(t.jsxIdentifier('scopedSlots'), createScope({ ...options, prop }))
        );
    }
    return t.jsxElement(
        t.jsxOpeningElement(t.jsxIdentifier('el-table-column'), attributes),
        t.jsxClosingElement(t.jsxIdentifier('el-table-column')),
        []
    );
};

const visitor = {
    JSXOpeningElement(path) {
        const { node } = path;
        if (t.isJSXIdentifier(node.name) && node.name.name === 'el-table') {
            const nodesList = rule.map(code => {
                const { label, prop, ...options } = code;
                return columnCreator(label, prop, options);
            });
            const parent = path.parent;
            parent.children = nodesList;
        }
    }
};
