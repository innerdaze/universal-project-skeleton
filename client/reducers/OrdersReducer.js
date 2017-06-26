import { keyBy, difference } from 'lodash'
import OperationModes from '../constants/OperationModes'

export function orders(state = {
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
}, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        unprocessedItems: [
          ...state.unprocessedItems,
          action.id
        ]
      }
    case 'START_DELETING_ORDER':
      return {
        ...state,
        isDeletingOrder: true
      }
    case 'DELETE_ORDER':
      return {
        ...state,
        isDeletingOrder: false,
        unprocessedItems: state.unprocessedItems.filter(value => {
          return value !== action.id
        })
      }
    case 'REQUEST_PROCESS_ORDERS':
      return {
        ...state,
        isProcessing: true
      }
    case 'RECEIVE_PROCESS_ORDERS':
      return {
        ...state,
        isProcessing: false,
        lastUpdated: action.receivedAt
      }
    case 'SUCCEED_PROCESS_ORDERS':
      return {
        ...state,
        processedItems: [...state.unprocessedItems, ...state.processedItems],
        // Here
        unprocessedItems: difference(state.unprocessedItems, action.orderIDs)
      }
    case 'FAIL_PROCESS_ORDERS':
      return {
        ...state,
        error: action.error,
        isProcessing: false
      }
    case 'CHANGE_OPERATION_MODE':
      return {
        ...state,
        mode: action.mode
      }
    case 'CREATE_PENDING_TRANSACTION':
      return {
        ...state,
        pendingTransaction: action.transaction
      }
    case 'DISCARD_PENDING_TRANSACTION':
      return {
        ...state,
        pendingTransaction: null
      }
    case 'START_CHANGING_ORDER_QUANTITY':
      return {
        ...state,
        isChangingOrderQuantity: true,
        changingOrderQuantityFor: action.order
      }
    case 'FINISH_CHANGING_ORDER_QUANTITY':
      return {
        ...state,
        isChangingOrderQuantity: false,
        changingOrderQuantityFor: null
      }
    case 'CANCEL_CHANGING_ORDER_QUANTITY':
      return {
        ...state,
        isChangingOrderQuantity: false,
        changingOrderQuantityFor: null
      }
    case 'CHANGE_ORDER_QUANTITY':
      return {
        ...state,
        isChangingOrderQuantity: false
      }
    case 'PROMPT_START_MODIFY_TRANSACTION':
      return {
        ...state,
        pendingModification: action.transaction
      }
    case 'CONFIRM_START_MODIFY_TRANSACTION':
      return {
        ...state,
        pendingModification: null
      }
    case 'CANCEL_START_MODIFY_TRANSACTION':
      return {
        ...state,
        pendingModification: null
      }
    case 'CHANGE_PENDING_TRANSACTION_QUANTITY':
      return {
        ...state,
        pendingTransaction: {
          ...state.pendingTransaction,
          Qty: action.quantity
        }
      }
    default:
      return state
  }
}

export function orderEntities(state = {}, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        [action.id]: action.order
      }
    case 'DELETE_ORDER':
      const newState = { ...state }

      delete newState[action.id]

      return newState
    case 'CHANGE_ORDER_QUANTITY':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          Qty: action.quantity
        }
      }
    case 'RECEIVE_ORDERS':
      return keyBy(action.orders, '_id')
    default:
      return state
  }
}
