import {createLogger, stdSerializers} from 'bunyan'

const log = createLogger({
  name: 'Le App',
  serializers: {
    err: stdSerializers.err
  }
})

log.info(`WE ARE RUN`)
