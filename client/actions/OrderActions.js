import fetch from 'isomorphic-fetch'
import { apiURL } from '../config'
import * as types from '../constants/ActionTypes'
import { checkStatusAndParseJSON } from '../helpers/Network'

export function addOrder(id, order) {
  return { type: types.ADD_ORDER, id, order }
}

export function deleteOrder(id) {
  return { type: types.DELETE_ORDER, id }
}

export function changeOrderQuantity(id, quantity) {
  return { type: types.CHANGE_ORDER_QUANTITY, id, quantity }
}

export function requestProcessOrders() {
  return {
    type: types.REQUEST_PROCESS_ORDERS
  }
}

export function receiveProcessOrders() {
  return {
    type: types.RECEIVE_PROCESS_ORDERS,
    receivedAt: Date.now()
  }
}

export function succeedProcessOrders() {
  return {
    type: types.SUCCEED_PROCESS_ORDERS
  }
}

export function failProcessOrders() {
  return {
    type: types.FAIL_PROCESS_ORDERS
  }
}

export function processOrders(sessionID, orders, device) {
  return function (dispatch) {
    dispatch(requestProcessOrders())

    return fetch(apiURL, {
      method: 'post',
      body: {
        method: 'HandheldService.ProcessTransactions',
        params: {
          SessionID: sessionID,
          Data: orders
        }
      }
    })
      .then(checkStatusAndParseJSON)
      .then(() => {
        dispatch(receiveProcessOrders())
        dispatch(succeedProcessOrders())
      })
      .catch(error => {
        dispatch(failProcessOrders(error))
      })
  }
}
