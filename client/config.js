// Set a boolean for Dev mode
export const isDevelopment = process.env.NODE_ENV === 'development'

export const appTitle = 'REPLACE_WITH_APP_TITLE'
export const appShortTitle = 'REPLACE_WITH_APP_SHORT_TITLE'

export const lowestLogLevel = isDevelopment ? 'debug' : 'error'
