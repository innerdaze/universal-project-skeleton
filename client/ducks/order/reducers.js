
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
const orders = handleActions({
  [order.addOrder] (state,{payload:{id,order}}) {
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
  [order.startDeletingOrder] (state) {
    return {
      ...state,
      isDeletingOrder: true
    }
  },
  [order.deleteOrder] (state,{payload:{id}}) {debugger
    return {
      ...state,
      isDeletingOrder: false,
      unprocessedItems: state.unprocessedItems.filter(value => {
        return value !== id
      })
    }
  },
  [order.requestProcessOrders] (state) {
    return {
      ...state,
      isProcessing: true
    }
  },
  [order.receiveProcessOrders] (state) {
    return {
      ...state,
      isProcessing: false,
      lastUpdated: Date.now()
    }
  },
[order.succeedProcessOrders] (state,{payload:{orderIDs}}) {
  return {
    ...state,
    processedItems: [...state.unprocessedItems, ...state.processedItems],
    // Here
    unprocessedItems: difference(state.unprocessedItems, orderIDs)
  }
},
[order.failProcessOrders] (state,{payload:{error}}) {
  return {
    ...state,
    error: error,
    isProcessing: false
  }
},
[order.changeOperationMode] (state,{payload:{mode}}) {
  return {
    ...state,
    mode: mode
  }
},
[order.createPendingTransaction] (state,{payload:{transaction}}) {
  return {
    ...state,
    pendingTransaction: transaction
  }
},
[order.discardPendingTransaction] (state) {
  return {
    ...state,
    pendingTransaction: null
  }
},
[order.startChangingOrderQuantity] (state,{payload:{order}}) {
  return {
    ...state,
    isChangingOrderQuantity: true,
    changingOrderQuantityFor: order
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
[order.promptStartModifyTransaction] (state,{payload:{transaction}}) {
  return {
    ...state,
    pendingModification: transaction
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
[order.changePendingTransactionQuantity] (state,{payload:{quantity}}) {
  return {
    ...state,
    pendingTransaction: {
      ...state.pendingTransaction,
      Qty: quantity
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
const orderEntities=handleActions({
  [order.addOrder] (state,{payload:{id,order}}) {
    return {
      ...state,
      [id]: order
    }
  }  ,
  [order.deleteOrder] (state,{payload:{id}}) {
 
    const newState = { ...state }

    delete newState[id]

    return newState
 
  }
, [order.changeOrderQuantity] (state,{payload:{id,quantity}}) {
  return {
    ...state,
    [id]: {
      ...state[id],
      Qty: quantity
    }
  }
}
, [order.receiveOrders] (state,{payload}) {
  return keyBy(payload, '_id')
  }
}, {})


export default combineReducers({
  orders,
  orderEntities
})





















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
