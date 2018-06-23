import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

process.env.NODE_ENV = 'development'

const IP = process.env.IP || 'localhost'
const PORT = process.env.PORT || 4000

const server = express()

const compiler = webpack(webpackConfig)

server.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      chunks: false,
      children: false
    }
  })
)

server.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  })
)

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.listen(PORT, IP, err => {
  if (err) {
    console.log(`=> OMG!!! 🙀 ${err}`)
  }
  console.log(`=> 🔥 Webpack dev server is running on port ${PORT}`)
})
