const path = require('path');
const qoa = require('qoa');
const fs = require('fs');
const { currentPath, log } = require('./helper');
const {
  pathPrefix,
  pageConfig,
  ps,
  template,
  routerPath
} = require('./config');
const { FilesGenerator, resolvePath } = require('./until');
// const {
//   transformModel,
//   transformRouter,
//   transformComponentIndex,
//   transformModelIndex,
//   transformRouteIndex
// } = require('./transform/transformToAst');

const transformModel = require('./transform/model');
const transformRouter = require('./transform/router');

let resolveFilePath = {};
let globalFile = {};
// 进行
async function build() {
  const file = await qoa.prompt(ps);
  // 获取文件地址
  globalFile = new FilePath(file, pathPrefix);
  // 解析文件地址
  resolveFilePath = await confirm(globalFile);
  // 循环创建文件
  return Object.entries(resolveFilePath).map(
    async ([key, el]) => await createFile(el, template[key])
  );
}

// 确认信息
async function confirm(filePath) {
  const analysisPath = resolvePath(filePath, pageConfig);
  log('请确认地址: ', analysisPath);
  const confirmPs = {
    type: 'confirm',
    query: '',
    handle: 'result',
    accept: 'Y',
    deny: 'n'
  };
  const { result } = await qoa.prompt([confirmPs]);
  return result ? analysisPath : {};
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
  constructor(file, pathPrefix) {
    const { moduleName, pageName } = file;
    this.moduleName = moduleName;
    this.pageName = pageName;
    this.rootPath = currentPath();
    this.componentPath = path.join(this.rootPath, pathPrefix);
    this.routerPath = path.join(this.rootPath, routerPath);
  }
}

const bootStrap = async () => {
  const promises = await build();

  await Promise.all(promises);
  reWritePage(resolveFilePath.page);
  new transformModel(
    resolveFilePath.model,
    globalFile.pageName,
    globalFile.moduleName,
    template['moduleIndex']
  );
  new transformRouter(
    globalFile.routerPath,
    globalFile.pageName,
    globalFile.moduleName,
    globalFile.componentPath,
    template['routerIndex']
  );
  // reWriteModel(resolveFilePath.model);
  // 先检查route-indexedDB,再重写router
  // reWriteRouteIndex(globalFile.routerPath);
  // reWriteRouter(globalFile.routerPath);
  // reWriteComponentIndex(globalFile.componentPath);
};

// 重写page
function reWritePage(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) log(err);
    const vuexPath = `${globalFile.moduleName}/${globalFile.pageName}`;
    const result = data.replace(/\$vuexName/g, `${vuexPath}`);

    fs.writeFileSync(filePath, result, 'utf8');
  });
}

// // 重写model
// async function reWriteModel(filePath) {
//   const vuexIndexPath = path.join(filePath, '..', 'index.js');
//   const vuexPath = `./${globalFile.pageName}`;

//   if (!fs.existsSync(vuexIndexPath)) {
//     // 没有文件则生成
//     await FilesGenerator(vuexIndexPath, template['moduleIndex']);
//     fs.readFile(vuexIndexPath, 'utf8', (err, data) => {
//       if (err) log(err);
//       const moduleName = globalFile.pageName;
//       const modulePath = vuexPath;
//       let result = data
//         .replace(/{\$moduleName}/g, `${moduleName}`)
//         .replace('{$modulePath}', `${modulePath}`);
//       fs.writeFileSync(vuexIndexPath, result, 'utf8');
//       const modelIndex = path.join(pathPrefix, 'model', 'index.js');

//       transformModelIndex(
//         modelIndex,
//         globalFile.moduleName,
//         `./${globalFile.moduleName}`
//       );
//     });
//   } else {
//     // 否则计算ast树加入
//     transformModel(vuexIndexPath, globalFile.pageName, vuexPath);
//   }
// }

const routerComponentName = () =>
  globalFile.moduleName +
  globalFile.pageName.charAt(0).toUpperCase() +
  globalFile.pageName.slice(1);

// // 重写路由信息
// async function reWriteRouter(filePath) {
//   const modulePath = path.join(filePath, `${globalFile.moduleName}.js`);
//   transformRouter(
//     modulePath,
//     routerComponentName(),
//     `${globalFile.moduleName}/${globalFile.pageName}`
//   );
// }

// 重写componentIndex信息
// async function reWriteComponentIndex(filePath) {
//   const componentIndex = path.join(filePath, 'pages', 'index.js');
//   const componentPath = `@pages/${globalFile.moduleName}/${
//     globalFile.pageName
//   }.vue`;
//   transformComponentIndex(componentIndex, routerComponentName(), componentPath);
// }

// 重写componentIndex信息
// async function reWriteRouteIndex(filePath) {
//   const routeIndex = path.join(filePath, 'index.js');
//   const componentPath = `./${globalFile.moduleName}.js`;
//   transformRouteIndex(routeIndex, globalFile.moduleName, componentPath);

//   const routePath = path.join(filePath, `${globalFile.moduleName}.js`);
//   await fs.writeFileSync(
//     routePath,
//     ` import {} from '@pages';
//       export default [];
//     `,
//     'utf8'
//   );
// }
bootStrap();
