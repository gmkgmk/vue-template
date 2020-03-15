const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  configureWebpack: {
    plugins: [
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, './public/dll/*.js'), // dll文件位置
        publicPath: '/dll', // dll 引用路径
        outputPath: '/dll' // dll最终输出的目录
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias.set('@pages', resolve('/src/pages'));
    config.resolve.alias.set('@services', resolve('/src/services'));
    config.resolve.alias.set('@component', resolve('/src/component'));

    config.plugins.delete('prefetch'); // TODO: need test
    config.plugins.delete('preload'); // TODO: need test

    // 处理dll **
    config.plugin('dll').use(webpack.DllReferencePlugin, [
      {
        manifest: require('./public/dll/vendors-manifest.json')
      }
    ]);

    // 处理runtime
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

    // 生产模式配置
    if (isProduction) {
      //  启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(() => {});

      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      });
      // 代码引用检查
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  }
};
