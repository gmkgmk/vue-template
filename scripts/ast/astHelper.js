const t = require('@babel/types');

exports.programHelper = function(path) {
  const { body } = path.node;
  // 增加新的Import
  const newImport = t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(this.moduleName))],
    t.stringLiteral(`${this.modulePath}`)
  );
  body.unshift(newImport);
};
