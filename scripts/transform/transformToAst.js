const fs = require('fs');
const {
  pageIndexAst,
  // modelIndexAst,
  // routerIndexAst,
  modelAst,
  routerAst
} = require('../ast/index');
const compile = require('./compile');
const codeEncoding = 'utf8';
/**
 * todo:
 * 修改文件
 * 1.读取文件,获得code
 * 2.操作code
 * 3.获取改动后的代码
 *
 */
const transform = createVisitor => (...arg) => {
  const [filePath, ...rest] = arg;
  // read
  const code = fs.readFileSync(filePath, { codeEncoding }).toString();
  // compile
  const result = compile(code, createVisitor, filePath, ...rest);
  // write
  fs.writeFileSync(filePath, result, codeEncoding);
};

// 模板地址
module.exports = {
  transformModel: transform(modelAst),
  transformRouter: transform(routerAst),
  transformPageIndex: transform(pageIndexAst)
  // transformModelIndex: transform(modelIndexAst)
  // transformRouteIndex: transform(routerIndexAst)
};
