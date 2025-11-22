const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // fast for dev
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 8080,
  },
  output: {
    filename: '[name].js',
  },
});
