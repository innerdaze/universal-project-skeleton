import fetch from 'isomorphic-fetch'
import { apiURL } from '../config'
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  INVALIDATE_PRODUCTS
} from '../constants/ActionTypes'

export function requestProducts(device) {
  return {
    type: REQUEST_PRODUCTS,
    device
  }
}

export function receiveProducts(device, json) {
  return {
    type: RECEIVE_PRODUCTS,
    device,
    products: json,
    receivedAt: Date.now()
  }
}

export function fetchProducts(device) {
  return function (dispatch) {
    dispatch(requestProducts(device))

    return fetch(`${apiURL}/products`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveProducts(device, json.result.Result.ListOfProducts))
      )
  }
}

export function invalidateProducts(device) {
  return {
    type: INVALIDATE_PRODUCTS,
    device
  }
}
