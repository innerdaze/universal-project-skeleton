var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var outputDir = 'cordova'

var sourceclient = path.resolve(__dirname, path.join('client'))

module.exports = {
  entry: path.join(sourceclient, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, path.join('dist', outputDir))
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(sourceclient, 'templates', 'index.cordova.ejs')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: process.env.NODE_ENV === 'production'
    })
  ]
}
