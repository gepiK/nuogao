var path = require('path')
var glob = require('glob')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var devConfig = {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // https://github.com/ampedandwired/html-webpack-plugin
  ]
}

glob.sync('./src/pages/**/*.html').forEach(path => {
  var chunk = path.split('./src/pages/')[1].split('/app.html')[0]
  var filename = chunk + '.html'
  var htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    chunks: ['vendors', chunk]
  }
  devConfig.plugins.push(new HtmlWebpackPlugin(htmlConf))
})


module.exports = merge(baseWebpackConfig, devConfig)
