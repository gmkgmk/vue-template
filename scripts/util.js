const path = require('path');
const fs = require('fs');
const { log, errorLog } = require('./helper');
const t = require('@babel/types');
const codeEncoding = 'utf8';


// 创建文件夹
exports.FilesGenerator = async (path, copyFile) => {
    const create = async (path, copyFile) => {
        await useMkdir(path.substr(0, path.lastIndexOf('\\')));
        return fs.copyFileSync(copyFile, path);
    };

    /**
     * @date 2019-02-26
     * @param {string} folder
     * @returns {boolean}
     * @memberof registerComponent
     * 传入地址====> 检查是否存在文件夹，不存在则新建
     */
    const useMkdir = async folder => {
        return new Promise((resolve, reject) => {
            try {
                fs.exists(folder, function(exists) {
                    console.log('folder: ', folder);
                    if (!exists) {
                        log(`生成文件夹：${folder}`);

                        fs.mkdir(folder, { recursive: true }, err => {
                            if (err) reject(err);
                            resolve(true);
                        });
                    } else {
                        resolve(true);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    };
    return create(path, copyFile);
};

// 简析最终地址
exports.resolvePath = ({ componentPath, moduleName, pageName }) => {
    return {
        page: path.join(componentPath, 'pages', moduleName, pageName + '.vue'),
        services: path.join(componentPath, 'services', moduleName, pageName + '.js'),
        model: path.join(componentPath, 'model', moduleName, pageName + '.js')
    };
};

// 检验是否已经导入模块
exports.inspectionImported = (body, moduleName) => {
    const hasImported = body.find(
        el =>
            t.isImportDeclaration(el) && el.specifiers.find(item => item.local.name === moduleName)
    );
    return !hasImported;
};
// 读取文件
exports.transform = compile => astVisitor => {
    return function(filePath, moduleName, modulePath) {
        fs.readFile(filePath, codeEncoding, (err, code) => {
            if (err) {
                return;
            }
            const result = compile(code, moduleName, modulePath, astVisitor);

            fs.writeFileSync(filePath, result.code, codeEncoding);
        });
    };
};
