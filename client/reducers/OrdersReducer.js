import { map, keyBy } from 'lodash'
import sampleOrders from '../test/fixtures/orders-sample.json'

export function orders(state = {
  isProcessing: false,
  lastUpdated: null,
  unprocessedItems: map(sampleOrders, 'Barcode'),
  processedItems: [],
  error: null
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
    case 'DELETE_ORDER':
      return {
        ...state,
        items: state.unprocessedItems.filter(value => {
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
        processedItems: state.unprocessedItems,
        unprocessedItems: []
      }
    case 'FAIL_PROCESS_ORDERS':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export function orderEntities(state = keyBy(sampleOrders, 'Barcode'), action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        [action.id]: action.order
      }
    case 'DELETE_ORDER':
      let newState = {...state}

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
      return keyBy(action.orders, 'Barcode')
    default:
      return state
  }
}
