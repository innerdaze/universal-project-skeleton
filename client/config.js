// Set a boolean for Dev mode
export const isDevelopment = process.env.NODE_ENV === 'development'

// Everything for remote calls should go in here
export const api = {
  protocol: isDevelopment ? 'http' : 'https',
  host: isDevelopment ? 'dev.url' : 'prod.url',
  port: isDevelopment ? 80 : 5678
}

export const apiURL = `${api.protocol}://${api.host}:${api.port}`

// TODO: Review this
export const lowestLogLevel = isDevelopment ? 'debug' : 'error'
