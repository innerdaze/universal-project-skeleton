import { map, keyBy, fromPairs } from 'lodash'

export function products(state = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
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

export function productSearch(state = {
  isSearching: false,
  lastError: null,
  lastMatches: []
}, action) {
  switch (action.type) {
    case 'SEARCH_PRODUCTS':
      return {
        ...state,
        isSearching: true
      }
    case 'SUCCEED_SEARCH_PRODUCTS':
      return {
        ...state,
        isSearching: false,
        lastMatches: action.matches
      }
    case 'FAIL_SEARCH_PRODUCTS':
      return {
        ...state,
        isSearching: false,
        lastError: action.error
      }
    default:
      return state
  }
}

export function productEntities(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return keyBy(action.products, 'ProductID')
    default:
      return state
  }
}

export function productIDsByProductName(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return fromPairs(map(action.products, product => [product.ProductName, product.ProductID]))
    default:
      return state
  }
}
