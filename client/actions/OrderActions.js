import fetch from 'isomorphic-fetch'
import { v4 } from 'uuid'
import { apiURL } from '../config'
import {
  ADD_ORDER, DELETE_ORDER, CHANGE_ORDER_QUANTITY,
  REQUEST_PROCESS_ORDERS, RECEIVE_PROCESS_ORDERS,
  SUCCEED_PROCESS_ORDERS, FAIL_PROCESS_ORDERS,
  CHANGE_OPERATION_MODE
} from '../constants/ActionTypes'
import { checkStatusAndParseJSON } from '../helpers/Network'

export function addOrder(id, order) {
  return { type: ADD_ORDER, id, order }
}

export function deleteOrder(id) {
  return { type: DELETE_ORDER, id }
}

export function changeOrderQuantity(id, quantity) {
  return { type: CHANGE_ORDER_QUANTITY, id, quantity }
}

export function requestProcessOrders() {
  return {
    type: REQUEST_PROCESS_ORDERS
  }
}

export function receiveProcessOrders() {
  return {
    type: RECEIVE_PROCESS_ORDERS,
    receivedAt: Date.now()
  }
}

export function succeedProcessOrders() {
  return {
    type: SUCCEED_PROCESS_ORDERS
  }
}

export function failProcessOrders() {
  return {
    type: FAIL_PROCESS_ORDERS
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

export function changeOperationMode(mode) {
  return {
    type: CHANGE_OPERATION_MODE,
    mode: mode
  }
}

export function createTransaction(mode, barcode, quantity) {
  return function (dispatch) {

    const order = {
      __type: 'HandheldTrans',
      AreaID: '',
      Barcode: barcode,
      Qty: quantity,
      Ref1: '',
      Ref2: '',
      // TermianlID: store.getState().terminalID,
      // TransDate: now.toISOString().substr(-1),
      TransType: mode,
      UnitID: '',
      // UserID: store.getState().user.id
    }

    dispatch(addOrder(uuidGen(), order))
  }
}
