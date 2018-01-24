
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
const { barcode } = actions
const initialState = {
  lastQuery: null,
  lastError: null
}
debugger
const reducer = handleActions({
  [barcode.lookupBarcode] (state,{payload}) {debugger
    return {
      ...state,
      payload,
        lastQuery: payload
    }
  },
  [barcode.failLookupBarcode] (state,{payload}) {debugger
    return {
      ...state,
      payload,
      error: `No match for barcode: ${payload}`
    }
  },
  [barcode.receiveBarcodes] (state,{payload}) {
    return {
      ...state,
      barcodes: payload.filter(item => !item.Deleted),
      receivedAt: Date.now()
    }
  },
  [barcode.succeddLookupBarcode] (state,{payload}) {
    return {
      ...state,
      payload
    }
  },
  [barcode.failLookupBarcode] (state,{payload}) {
    return {
      ...state,
      payload,
      lastError: `No match for barcode: ${payload}`
    }
  },
  [barcode.requestBarcodes] (state) {
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    }
  },
[barcode.invalidateBarcodes] (state) {
  return {
    ...state,
    didInvalidate: true
  }
},
[barcode.resetBarcodes] (state) {
  return {
    ...state,
    items: [] 
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
