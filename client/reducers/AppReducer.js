export default function app(state = {
  isInitialized: false,
  apiRoot: null,
  apiRootValid: false,
  storeID: '0'
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
    case 'APP_SET_STORE_ID':
      return {
        ...state,
        storeID: config.storeID
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
    case 'APP_RESET':
      return {
        ...state,
        apiRoot: null,
        isInitialized: false,
        apiRootValid: false
      }
    default:
      return state
  }
}
