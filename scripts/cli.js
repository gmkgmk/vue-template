const path = require('path');
const qoa = require('qoa');
const fs = require('fs');
const { currentPath, log } = require('./helper');
const {
  pathPrefix,
  pageConfig,
  ps,
  template,
  routerPath,
  pageIndexPath,
  confirmPs
} = require('./config');
const { FilesGenerator } = require('./until');
const transformModel = require('./transform/model');
const transformRouter = require('./transform/router');

let globalFilePath = {};
// 进行
async function build() {
  const file = await qoa.prompt(ps);
  // 获取文件地址
  const filePath = new FilePath(file, pageConfig);
  globalFilePath = {
    ...filePath,
    ...filePath.pageBasePath
  };
  await confirm(globalFilePath);
  delete globalFilePath['pageBasePath'];

  // 循环创建文件
  return Object.entries(filePath.pageBasePath).map(
    async ([key, el]) => await createFile(el, template[key])
  );
}

// 确认信息
async function confirm(filePath) {
  log('请确认信息: ', filePath);

  const { result } = await qoa.prompt([confirmPs]);
  return result;
}

// 新建文件夹
async function createFile(componentVueName, copyFile) {
  await FilesGenerator(componentVueName, copyFile);
  log('已生成' + componentVueName);
}

/**
 * 文件路径管理
 * @date 2019-02-13
 * @class FilePath
 */
class FilePath {
  constructor(file) {
    const { moduleName, pageName } = file;
    this.rootPath = currentPath();
    // /page/module/services
    this.pageBasePath = resolvePath(this.rootPath, file);
    this.moduleName = moduleName;
    this.pageName = pageName;
    this.pageIndexPath = path.join(this.rootPath, pageIndexPath);
    this.routerPath = path.join(this.rootPath, routerPath);
  }
}

// 简析page,module,services绝对地址
function resolvePath(rootPath, { moduleName, pageName }) {
  const joinHelper = (key, suffix = '.js') =>
    path.join(
      rootPath,
      pathPrefix,
      pageConfig[key].path,
      moduleName,
      pageName + suffix
    );
  return {
    page: joinHelper('page', '.vue'),
    services: joinHelper('services'),
    model: joinHelper('model')
  };
}

const bootStrap = async () => {
  const promises = await build();

  await Promise.all(promises);
  // page
  reWritePage(globalFilePath.page);
  // model
  new transformModel(globalFilePath, template['moduleIndex']);
  // router pageIndex
  new transformRouter(globalFilePath, template['routerIndex']);
};
// 重写page
function reWritePage(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) log(err);
    const vuexPath = `${globalFilePath.moduleName}/${globalFilePath.pageName}`;
    const result = data.replace(/\$vuexName/g, `${vuexPath}`);

    fs.writeFileSync(filePath, result, 'utf8');
  });
}
bootStrap();
