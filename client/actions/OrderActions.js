import fetch from 'isomorphic-fetch'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes } from 'lodash'
import {
  ADD_ORDER, DELETE_ORDER, CHANGE_ORDER_QUANTITY,
  REQUEST_PROCESS_ORDERS, RECEIVE_PROCESS_ORDERS,
  SUCCEED_PROCESS_ORDERS, FAIL_PROCESS_ORDERS,
  CHANGE_OPERATION_MODE, CREATE_PENDING_TRANSACTION,
  DISCARD_PENDING_TRANSACTION, START_CHANGING_ORDER_QUANTITY
} from '../constants/ActionTypes'
import { checkStatusAndParseJSON } from '../helpers/Network'
import { failIfMissing } from '../helpers/Function'

export function addOrder(id, order) {
  return { type: ADD_ORDER, id, order }
}

export function deleteOrder(id) {
  return { type: DELETE_ORDER, id }
}

export function startChangingOrderQuantity() {
  return {
    type: START_CHANGING_ORDER_QUANTITY
  }
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

    const { orders, orderEntities, app, session } = getState()

    return fetch(app.apiRoot, {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify({
        method: 'HandheldService.ProcessTransactions',
        params: {
          SessionID: session.id,
          Data: orders.unprocessedItems.map(id => {
            return orderEntities.hasOwnProperty(id) && orderEntities[id]
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

export function createPendingTransaction(transaction) {
  return {
    type: CREATE_PENDING_TRANSACTION,
    transaction
  }
}

export function discardPendingTransaction() {
  return {
    type: DISCARD_PENDING_TRANSACTION
  }
}

export function completPendingTransaction(quantity) {
  return (dispatch, getState) => {
    const transaction = getState().orders.pendingTransaction

    if (quantity) {
      transaction.Qty = quantity
    }

    dispatch(addOrder(transaction._id, transaction))
    dispatch(discardPendingTransaction())
  }
}

export function createPendingTransactionByProduct(product) {
  return function (dispatch, getState) {
    dispatch(createPendingTransaction(_createTransaction({
      getState,
      barcode: getState().barcodeIDsByProductID[product.ProductID],
      mode: getState().orders.mode
    })))
  }
}

function _createTransaction({ getState, barcode, quantity = 1, mode }) {
  return {
    _id: uuidGen(),
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
}

export function createTransaction(mode, barcode, quantity) {
  return function (dispatch, getState) {
    const transaction = findTransactionByBarcode(getState, barcode, mode)

    if (transaction) {
      dispatch(changeOrderQuantity(transaction._id, transaction.Qty + quantity))
    } else {
      const transaction = _createTransaction({ getState, barcode, quantity, mode })
      dispatch(addOrder(transaction._id, transaction))
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
