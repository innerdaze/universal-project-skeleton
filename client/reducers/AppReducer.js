export default function app(state = {
  isInitialized: false,
  apiRoot: null
}, { type, ...config }) {
  switch (type) {
    case 'APP_INITIALIZE':
      return {
        ...state,
        isInitialized: true
      }
    case 'APP_SET_API_ROOT':
      return {
        ...state,
        apiRoot: config.apiRoot
      }
    default:
      return state
  }
}
