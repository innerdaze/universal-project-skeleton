
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import actions from './actions'
import { keyBy, difference } from 'lodash'
import OperationModes from '../../constants/OperationModes'
const { order } = actions
const initialState = {
  isProcessing: false,
  lastUpdated: null,
  unprocessedItems: [],
  processedItems: [],
  error: null,
  mode: OperationModes.STOCKTAKE,
  pendingTransaction: null,
  pendingModification: null,
  isDeletingOrder: false,
  isChangingOrderQuantity: false,
  changingOrderQuantityFor: null
}
debugger
const reducer = handleActions({
  [order.addOrder] (state,{id,payload}) {debugger
    return {
      ...state,
      unprocessedItems: [
        ...state.unprocessedItems,
        id
      ]
    }
  },
  [order.cancelDeletingOrder] (state) {
    return {
      ...state,
      isDeletingOrder: false
    }
  },
  [order.startDeletingOrder] (state,{payload}) {
    return {
      ...state,
      isDeletingOrder: true
    }
  },
  [order.deleteOrder] (state,{payload}) {
    return {
      ...state,
      isDeletingOrder: false,
      unprocessedItems: state.unprocessedItems.filter(value => {
        return value !== payload
      })
    }
  },
  [order.requestProcessOrders] (state) {
    return {
      ...state,
      isProcessing: true
    }
  },
  [order.ReceiveProcessOrders] (state,{payload}) {
    return {
      ...state,
      isProcessing: false,
      lastUpdated: Date.now()
    }
  },
[order.succeedProcessOrders] (state,{payload}) {
  return {
    ...state,
    processedItems: [...state.unprocessedItems, ...state.processedItems],
    // Here
    unprocessedItems: difference(state.unprocessedItems, orderIDs)
  }
},
[order.failProcessOrders] (state,{payload}) {
  return {
    ...state,
    error: payload,
    isProcessing: false
  }
},
[order.changeOprationMode] (state,{payload}) {
  return {
    ...state,
    mode: payload
  }
},
[order.createPendingTransaction] (state,{payload}) {
  return {
    ...state,
    pendingTransaction: payload
  }
},
[order.discardPendingTransaction] (state) {
  return {
    ...state,
    pendingTransaction: null
  }
},
[order.startChangingorderQuantity] (state,{payload}) {
  return {
    ...state,
    isChangingOrderQuantity: true,
    changingOrderQuantityFor: payload
  }
},
[order.finishChangingOrderQuantity] (state) {
  return {
    ...state,
    isChangingOrderQuantity: false,
    changingOrderQuantityFor: null
  }
},
[order.cancelChangingOrderQuantity] (state) {
  return {
    ...state,
    isChangingOrderQuantity: false,
    changingOrderQuantityFor: null
  }
},
[order.changeOrderQuantity] (state) {
  return {
    ...state,
    isChangingOrderQuantity: false
  }
},
[order.promptStartModifyTransaction] (state,{payload}) {
  return {
    ...state,
    pendingModification: payload
  }
},
[order.confirmStartModifyTransaction] (state) {
  return {
    ...state,
    pendingModification: null
  }
},
[order.cancelStartModifyTransaction] (state) {
  return {
    ...state,
    pendingModification: null
  }
},
[order.changePendingTransactionQuantity] (state,{payload}) {
  return {
    ...state,
    pendingTransaction: {
      ...state.pendingTransaction,
      Qty: payload
    }
  }
},
[order.finishChangingOrderQuantity] (state) {
  return {
    ...state,
    isChangingOrderQuantity: false,
    changingOrderQuantityFor: null
  }
}
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
