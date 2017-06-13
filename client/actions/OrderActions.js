import fetch from 'isomorphic-fetch'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map } from 'lodash'
import {
  ADD_ORDER, DELETE_ORDER, CHANGE_ORDER_QUANTITY,
  REQUEST_PROCESS_ORDERS, RECEIVE_PROCESS_ORDERS,
  SUCCEED_PROCESS_ORDERS, FAIL_PROCESS_ORDERS,
  CHANGE_OPERATION_MODE, CREATE_PENDING_TRANSACTION,
  DISCARD_PENDING_TRANSACTION, START_CHANGING_ORDER_QUANTITY
} from '../constants/ActionTypes'
import { callApi } from './NetworkActions'
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

export function succeedProcessOrders(orderIDs) {
  return {
    type: SUCCEED_PROCESS_ORDERS,
    orderIDs
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

    const orderIDs = filter(orders.unprocessedItems, id => {
      return orderEntities.hasOwnProperty(id)
          && orderEntities[id].TransType === orders.mode
    })

    const filteredOrders = map(orderIDs, id => {
      return orderEntities.hasOwnProperty(id) && orderEntities[id]
    })

    return dispatch(callApi({
      service: 'HandheldService.ProcessTransactions',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      params: {
        Data: filteredOrders
      },
      success: () => {
        dispatch(receiveProcessOrders())
        dispatch(succeedProcessOrders(orderIDs))
      },
      error: error => dispatch(failProcessOrders(error))
    }))
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
  return (dispatch, getState) => {
    const barcodeID = getState().barcodeIDsByProductID[product.ProductID]

    dispatch(createPendingTransaction(_createTransaction({
      getState,
      product,
      barcode: getState().barcodeEntities[barcodeID],
      mode: getState().orders.mode
    })))
  }
}

function _createTransaction({ getState, barcode, product, quantity = 1, mode }) {
  return {
    _id: uuidGen(),
    __type: 'HandheldTrans',
    AreaID: '',
    Barcode: barcode && barcode.Barcode,
    Qty: quantity,
    Ref1: '',
    Ref2: '',
    TermianlID: window.cordova ? device.uuid : getState().terminalID,
    TransDate: new Date().toISOString().slice(0, -1),
    TransType: mode,
    ProductID: barcode ? barcode.ProductID : product.ProductID,
    UserID: getState().cashiers.activeCashier.CashierID
  }
}

export function createTransactionFromBarcode({ mode, barcode, quantity }) {
  return (dispatch, getState) => {
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
      Barcode: barcode.Barcode
    }
  )
}

export function createTransactionFromProduct({ mode, product, quantity }) {
  return (dispatch, getState) => {
    const transaction = findTransactionByProduct({ mode, product, getState })

    if (transaction) {
      dispatch(changeOrderQuantity(transaction._id, transaction.Qty + quantity))
    } else {
      const transaction = _createTransaction({ getState, product, quantity, mode })
      dispatch(addOrder(transaction._id, transaction))
    }
  }
}

function findTransactionByProduct({ mode, product, getState }) {
  return find(
    filter(getState().orderEntities, (item, key) => {
      return includes(getState().orders.unprocessedItems, key)
    }),
    {
      TransType: mode,
      ProductID: product.ProductID
    }
  )
}
