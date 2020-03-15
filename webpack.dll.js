//webpack.dll.js
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['vue/dist/vue.runtime.esm.js', 'vue-router', 'vuex', 'lodash', 'element-ui']
  },
  output: {
    path: path.resolve(__dirname, './public/dll'),
    filename: '[name]-[chunkhash:5].dll.js',
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './public/dll', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
};
