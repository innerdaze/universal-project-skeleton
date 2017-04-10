import fetch from 'isomorphic-fetch'
import { apiURL } from '../config'
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
  return function (dispatch) {
    dispatch(requestProducts())

    return fetch(apiURL, {
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
