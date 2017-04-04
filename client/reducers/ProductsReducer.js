import { map } from 'lodash'

export function products(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case 'INVALIDATE_PRODUCTS':
      return {
        ...state,
        didInvalidate: true
      }
    case 'REQUEST_PRODUCTS':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case 'RECEIVE_PRODUCTS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: map(action.products, 'ProductID'),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export function productEntities(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return action.products
    default:
      return state
  }
}
