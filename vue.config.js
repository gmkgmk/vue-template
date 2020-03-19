const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';
const pageTitle = 'Vue-element模版';

module.exports = {
  outputDir: 'dist',
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  publicPath: '/',
  pages: {
    index: {
      entry: resolve('/src/main.js'),
      title: pageTitle,
      chunks: ['chunk-libs', 'chunk-elementUI', 'chunk-commons', 'runtime', 'index']
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@pages', resolve('/src/pages'))
      .set('@services', resolve('/src/services'))
      .set('@components', resolve('/src/components'));

    ['index'].forEach(entryName => {
      config.plugins.delete(`preload-${entryName}`);
      config.plugins.delete(`prefetch-${entryName}`);
    });

    // 开发模式配置
    if (isProduction) {
      // 开启Gzip
      Gzip(config);
      // 去除console
      removeConsole(config);
      // 处理runtime
      importRuntimeJS(config);
      // 代码引用检查;
      analyzer(config);
    }
    return config;
  },
  configureWebpack: config => {
    // 分割代码
    splitChunks(config);
  }
};

function removeConsole(config) {
  config.optimization.minimizer('terser').tap(args => {
    args[0].terserOptions.compress.drop_console = true;
    return args;
  });
}

function importRuntimeJS(config) {
  config
    .plugin('ScriptExtHtmlWebpackPlugin')
    .after('html')
    .use('script-ext-html-webpack-plugin', [
      {
        // `runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/
      }
    ])
    .end();
}

function Gzip(config) {
  config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
    {
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    }
  ]);
}

function analyzer(config) {
  config
    .plugin('webpack-bundle-analyzer')
    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
      {
        analyzerMode: 'static'
      }
    ]);
}

function splitChunks(config) {
  config.optimization = {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // only package third parties that are initially dependent
          reuseExistingChunk: true,
          enforce: true
        },
        elementUI: {
          name: 'chunk-elementUI', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  };
}
