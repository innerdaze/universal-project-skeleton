var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'public/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: process.env.NODE_ENV === 'production'
    })
  ]
}
