
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { cashier } = actions
const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: [],
  activeCashier: null,
  isAuthenticating: false,
  authError: null
}
debugger
const reducer = handleActions({
  [cashier.invalidateCashiers] (state) {debugger
    return {
      ...state,
      didInvalidate: true
    }
  },
  [cashier.requestCashiers] (state) {debugger
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    }
  },
  [cashier.receiveCashiers] (state,{payload}) {
    return {
      ...state,
      isFetching: false,
        didInvalidate: false,
        items: map(payload.cashiers, 'CashierID'),
        lastUpdated: payload.receivedAt
    }
  },
  [cashier.resetCashiers] (state) {
    return {
      ...state,
      items: []
    }
  },
  [cashier.loginCashier] (state) {
    return {
      ...state,
      isAuthenticating: true
    }
  },
  [cashier.succeedLoginCashier] (state,{payload}) {
    return {
      ...state,
      isAuthenticating: false,
      activeCashier: payload.cashier
    }
  },
[cashier.failLoginCashier] (state,{payload}) {
  return {
    ...state,
    isAuthenticating: false,
    authError: payload.error
  }
},
[cashier.logoutCashier] (state) {
  return {
    ...state,
    activeCashier: null
  }
},
 
}, initialState)

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
