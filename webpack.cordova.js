var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')

var config = {
  devtool: 'inline-source-map',
  // devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  entry: ['babel-polyfill', path.join(__dirname, 'client', 'index.jsx')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist', 'cordova'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        // CORDOVA: JSON.stringify(true)
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'client', 'templates', 'index.cordova.ejs')
    }),

  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /client/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            comments: false
          }
        }
      },
      // {
      //   test: /\.js$/,
      //   include: /node_modules\/progress-promise/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['env', 'react'],
      //       comments: false
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        include: /client\/assets\/css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                './node_modules',
                './node_modules/grommet/scss'
              ]
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: /client\/assets\/fonts/,
        loader: 'file-loader?name=client/assets/fonts/[name].[ext]'
      },
      {
        test: /\.html$/,
        include: /client/,
        loader: 'html-loader',
        query: {
          minimize: false
        }
      }
    ]
  }
}

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(new BabiliPlugin())
// }

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false
      },
      exclude: [/\.min\.js$/gi]
    })
  )

  config.plugins.push(
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  )
}

module.exports = config
