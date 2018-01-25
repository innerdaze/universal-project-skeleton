
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { app } = actions
const initialState = {
  isInitialized: false,
  apiRoot: null,
  apiRootValid: false,
  storeID: '0'
}
debugger
const reducer = handleActions({
  [app.appInitialize] (state) {debugger
    return {
      ...state,
      isInitialized: true
    }
  },
  [app.appSetApiRoot] (state,{payload}) {debugger
    return {
      ...state,
      apiRoot: payload.apiRoot
    }
  },
  [app.appSetApiRoot] (state,{payload}) {
    return {
      ...state,
      storeID: payload.storeID
    }
  },
  [app.apiRootValid] (state) {
    return {
      ...state,
      apiRootValid: true
    }
  },
  [app.apiRootInvalid] (state) {
    return {
      ...state,
      apiRootValid: false
    }
  },
  [app.appReset] (state) {
    return {
      ...state,
         apiRoot: null,
         isInitialized: false,
         apiRootValid: false
    }
  }
}, initialState)

// const reducer = combineReducers({
//   dancingReducer
// })

export default reducer




















// export default function app(state = {
//   isInitialized: false,
//   apiRoot: null,
//   apiRootValid: false,
//   storeID: '0'
// }, { type, ...config }) {
//   switch (type) {
//     case 'APP_INITIALIZE':
//       return {
//         ...state,
//         isInitialized: true
//       }
//     case 'APP_SET_API_ROOT':
//       return {
//         ...state,
//         apiRoot: config.apiRoot
//       }
//     case 'APP_SET_STORE_ID':
//       return {
//         ...state,
//         storeID: config.storeID
//       }
//     case 'API_ROOT_VALID':
//       return {
//         ...state,
//         apiRootValid: true
//       }
//     case 'API_ROOT_INVALID':
//       return {
//         ...state,
//         apiRootValid: false
//       }
//     case 'APP_RESET':
//       return {
//         ...state,
//         apiRoot: null,
//         isInitialized: false,
//         apiRootValid: false
//       }
//     default:
//       return state
//   }
// }
