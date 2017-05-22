var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: './index.js',
  //打包到当前目录下的bundle.js
  output: { path: __dirname, filename: 'bundle.js' },
  devtool: "eval-source-map",
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  //webpack-dev-server配置
  devServer: {
    historyApiFallback: true
  },
  //我们使用了npm run start来开启webpack-dev-server打包，那么可以使用BrowserSyncPlugin
  //来代理ewbpack-dev-server的输出。只要你指定了proxy选项。此时你直接访问http://localhost:8080/
  //其实是访问的是BrowserSyncPlugin提供的内容
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/'
    }
 )]
}



