import { filter, toLower, map } from 'lodash'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  INVALIDATE_PRODUCTS,
  RESET_PRODUCTS,
  SEARCH_PRODUCTS,
  FAIL_SEARCH_PRODUCTS,
  SUCCEED_SEARCH_PRODUCTS
} from '../constants/ActionTypes'
import { callApi } from './NetworkActions'

export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  }
}

export function receiveProducts(json) {
  return {
    type: RECEIVE_PRODUCTS,
    products: json.filter(item => !item.Deleted),
    receivedAt: Date.now()
  }
}

export function fetchProducts() {
  return dispatch => {
    dispatch(requestProducts())

    return dispatch(callApi({
      service: 'HandheldService.GetProducts',
      params: {
        GetOptions: 0
      },
      success: json => dispatch(receiveProducts(json.result.Result.ListOfProducts))
    }))
  }
}

export function invalidateProducts() {
  return {
    type: INVALIDATE_PRODUCTS
  }
}

export function findProductByProductName(productName) {
  return (dispatch, getState) => {
    const productID = getState().productIDsByProductName[productName]
    return productID && getState().productEntities[productID]
  }
}

/**
 * Experimental Spec:
 *  search functions return "starts with" results (Array)
 *  find functions return "exact match" result (Object)
 */
export function searchProductByProductName(productNameStub) {
  return (dispatch, getState) => {
    const productEntities = getState().productEntities

    return map(filter(getState().productIDsByProductName, (id, name) => (
      toLower(name).includes(toLower(productNameStub))
    )), id => productEntities[id])
  }
}

export function searchProducts(query, lookupFunction) {
  return dispatch => {
    dispatch(startProductSearch())

    const matches = dispatch(lookupFunction(query))

    if (!matches || matches.length === 0) {
      dispatch(failProductSearch(query))
      return
    }

    dispatch(succeedProductSearch(matches))
  }
}

export function startProductSearch() {
  return {
    type: SEARCH_PRODUCTS
  }
}

export function succeedProductSearch(matches) {
  return {
    type: SUCCEED_SEARCH_PRODUCTS,
    matches
  }
}

export function failProductSearch(query) {
  return {
    type: FAIL_SEARCH_PRODUCTS,
    error: `No match for: ${query}`
  }
}

export function resetProducts() {
  return {
    type: RESET_PRODUCTS
  }
}
