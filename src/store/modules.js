const modulesContext = require.context('../model', true, /index.js$/);
const reg = /.\/(\S*)\/index.js/;
// 自动引入model
let modulesConfig = {};
modulesContext.keys().forEach(el => {
  const [, moduleName] = el.match(reg) || [];
  const config = modulesContext(el);
  const ctrl = config.default || config;
  modulesConfig = {
    ...modulesConfig,
    [moduleName]: {
      ...ctrl
    }
  };
});

export default modulesConfig;
