var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var outputDir = 'web'

module.exports = {
  entry: path.resolve(__dirname, path.join('client', 'index.js')),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, path.join('dist', outputDir))
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: process.env.NODE_ENV === 'production'
    })
  ]
}
