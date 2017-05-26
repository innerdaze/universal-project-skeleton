import fetch from 'isomorphic-fetch'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  INVALIDATE_PRODUCTS
} from '../constants/ActionTypes'

export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  }
}

export function receiveProducts(json) {
  return {
    type: RECEIVE_PRODUCTS,
    products: json,
    receivedAt: Date.now()
  }
}

export function fetchProducts(sessionID) {
  return function (dispatch, getState) {
    dispatch(requestProducts())

    return fetch(getState().app.apiRoot, {
      method: 'post',
      body: JSON.stringify({
        method: 'HandheldService.GetProducts',
        params: {
          SessionID: sessionID,
          GetOptions: 0
        }
      })
    })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveProducts(json.result.Result.ListOfProducts))
      )
  }
}

export function invalidateProducts() {
  return {
    type: INVALIDATE_PRODUCTS
  }
}

export function findProductByProductName(productName) {
  return function (dispatch, getState) {
    const productID = getState().productIDsByProductName[productName]
    return productID && getState().productEntities[productID]
  }
}
