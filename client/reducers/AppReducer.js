export default function app(state = {
  isInitialized: false,
  apiRoot: null,
  apiRootValid: false
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
    case 'API_ROOT_VALID':
      return {
        ...state,
        apiRootValid: true
      }
    case 'API_ROOT_INVALID':
      return {
        ...state,
        apiRootValid: false
      }
    default:
      return state
  }
}
