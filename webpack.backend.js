var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'server/_app/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server')
  },
  target: 'node',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: process.env.NODE_ENV === 'production'
    })
  ]

}
