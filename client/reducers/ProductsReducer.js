import { map, keyBy, fromPairs } from 'lodash'
import sampleProducts from '../test/fixtures/products-sample.json'

export function products(state = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: map(sampleProducts, 'ProductID')
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
