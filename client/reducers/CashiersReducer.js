import { map, keyBy } from 'lodash'

export function cashiers(state = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: []
}, action) {
  switch (action.type) {
    case 'INVALIDATE_CASHIERS':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_CASHIERS':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_CASHIERS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: map(action.cashiers, 'CashierID'),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function cashierEntities(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CASHIERS':
      return keyBy(action.cashiers, 'CashierID')
    default:
      return state
  }
}
