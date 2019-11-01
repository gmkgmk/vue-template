const methods = [
    'ExportDefaultDeclaration',
    'ExportNamedDeclaration',
    'ObjectExpression',
    'Program',
    'ImportDeclaration'
];

// 生成 visitor
class VisitorMiddle {
    constructor() {
        this.astClass = {};
    }
    use(astClass) {
        if (typeof astClass !== 'object') throw new TypeError('middleware must be a object!');
        if (!astClass.inspection()) return;
        this.astClass = astClass;
        return this;
    }
    run() {
        const visitor = {};
        for (const method of methods) {
            if (this.astClass[method]) {
                visitor[method] = this.astClass[method].bind(this.astClass);
            }
        }
        return visitor;
    }
}
// visitor creator
function visitorFactory(visitorPlugin) {
    const visitorControl = new VisitorMiddle();
    visitorControl.use(visitorPlugin);
    return visitorControl.run();
}

module.exports = visitorFactory;
