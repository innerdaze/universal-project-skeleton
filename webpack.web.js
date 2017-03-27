var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'client', 'index.jsx')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist', 'web'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client', 'templates', 'index.ejs'),
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: process.env.NODE_ENV === 'production'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /client/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
}
