var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  //客户端代码
  entry: './app/client.jsx',
  output: { path: __dirname + '/assets', filename: 'bundle.js' },
  devtool: "eval-source-map",
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/'
    }
 )]
}

