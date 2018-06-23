const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool:
    process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true
  },
  entry: ['babel-polyfill', path.join(__dirname, 'client', 'index.jsx')],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, 'dist', process.env.CORDOVA ? 'cordova' : 'web'),
    publicPath: process.env.CORDOVA ? '' : '/'
  },
  resolve: {
    alias: {
      '~': path.resolve('./client'),
      '~features': path.resolve('./client/features'),
      '~components': path.resolve('./client/components'),
      '~tools': path.resolve('./client/helpers')
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        CORDOVA: JSON.stringify(process.env.CORDOVA || false)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        'client',
        'templates',
        process.env.CORDOVA ? 'index.cordova.ejs' : 'index.ejs'
      ),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /client/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              modules: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                './node_modules'
                // './node_modules/inuitcss'
                // - UNCOMMENT the line below if using grommet
                //  './node_modules/grommet/scss'
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: /client\/assets\/fonts/,
        loader: 'file-loader?name=client/assets/fonts/[name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      },
      {
        test: /\.(png|jp(e*)g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g)$/,
        loader: 'file-loader'
      }
    ]
  }
}
