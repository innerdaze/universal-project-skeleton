// Set a boolean for Dev mode
export const isDevelopment = process.env.NODE_ENV === 'development'

// Everything for remote calls should go in here
export const api = {
  protocol: isDevelopment ? 'http' : 'http',
  host: isDevelopment ? 'git.orbistech.co.uk' : '192.168.16.33',
  port: isDevelopment ? 7417 : 8099
}

export const apiURL = `${api.protocol}://${api.host}:${api.port}`

/* TODO: Review this */
export const lowestLogLevel = isDevelopment ? 'debug' : 'error'
