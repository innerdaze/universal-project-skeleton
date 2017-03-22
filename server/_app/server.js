import http from 'http'
import {createLogger, stdSerializers} from 'bunyan'

const log = createLogger({
  name: 'Le Server',
  serializers: {
    err: stdSerializers.err
  }
})

const PORT = process.env.NODE_PORT || 3000

const server = http.createServer((req, res) => {
  res.end('Hello World')
})

export default cb => {
  server.listen(PORT, () => {
    log.trace('It\'s alive!x!')

    if (cb) {
      cb()
    }
  })
}
