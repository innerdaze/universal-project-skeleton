import fetch from 'isomorphic-fetch'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes } from 'lodash'
import { apiURL } from '../config'
import {
  ADD_ORDER, DELETE_ORDER, CHANGE_ORDER_QUANTITY,
  REQUEST_PROCESS_ORDERS, RECEIVE_PROCESS_ORDERS,
  SUCCEED_PROCESS_ORDERS, FAIL_PROCESS_ORDERS,
  CHANGE_OPERATION_MODE
} from '../constants/ActionTypes'
import { checkStatusAndParseJSON } from '../helpers/Network'
import { failIfMissing } from '../helpers/Function'

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

export function failProcessOrders(error) {
  return {
    type: FAIL_PROCESS_ORDERS,
    error
  }
}

export function processOrders() {
  return function (dispatch, getState) {
    dispatch(requestProcessOrders())

    const orders = getState().orderEntities

    return fetch(apiURL, {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify({
        method: 'HandheldService.ProcessTransactions',
        params: {
          SessionID: getState().session.id,
          Data: getState().orders.unprocessedItems.map(id => {
            return orders.hasOwnProperty(id) && orders[id]
          })
        }
      })
    })
      .then(checkStatusAndParseJSON)
      .then(() => {
        dispatch(succeedProcessOrders())
        dispatch(receiveProcessOrders())
      })
      .catch(error => dispatch(failProcessOrders(error)))
  }
}

export function changeOperationMode(mode) {
  return {
    type: CHANGE_OPERATION_MODE,
    mode: mode
  }
}

export function createTransaction(mode, barcode, quantity) {
  return function (dispatch, getState) {
    const transaction = findTransactionByBarcode(getState, barcode, mode)

    if (transaction) {
      dispatch(changeOrderQuantity(transaction._id, transaction.Qty + quantity))
    } else {
      const uuid = uuidGen()

      const order = {
        _id: uuid,
        __type: 'HandheldTrans',
        AreaID: '',
        Barcode: barcode,
        Qty: quantity,
        Ref1: '',
        Ref2: '',
        TermianlID: getState().terminalID,
        TransDate: new Date().toISOString().slice(0, -1),
        TransType: mode,
        UnitID: '',
        UserID: getState().user.id
      }

      dispatch(addOrder(uuid, order))
    }
  }
}

function findTransactionByBarcode(getState, barcode, mode) {
  return find(
    filter(getState().orderEntities, (item, key) => {
      return includes(getState().orders.unprocessedItems, key)
    }),
    {
      TransType: mode,
      Barcode: barcode
    }
  )
}
