import fetch from 'isomorphic-fetch'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map } from 'lodash'
import {
  ADD_ORDER,
  DELETE_ORDER,
  START_DELETING_ORDER,
  CHANGE_ORDER_QUANTITY,
  REQUEST_PROCESS_ORDERS,
  RECEIVE_PROCESS_ORDERS,
  SUCCEED_PROCESS_ORDERS,
  FAIL_PROCESS_ORDERS,
  CHANGE_OPERATION_MODE,
  CREATE_PENDING_TRANSACTION,
  DISCARD_PENDING_TRANSACTION,
  START_CHANGING_ORDER_QUANTITY,
  FINISH_CHANGING_ORDER_QUANTITY,
  PROMPT_START_MODIFY_TRANSACTION,
  CONFIRM_START_MODIFY_TRANSACTION,
  CANCEL_START_MODIFY_TRANSACTION,
  CANCEL_CHANGING_ORDER_QUANTITY,
  CHANGE_PENDING_TRANSACTION_QUANTITY
} from '../constants/ActionTypes'
import { callApi } from './NetworkActions'
import { failIfMissing } from '../helpers/Function'
import { _findBarcodeByID } from '../actions/BarcodeActions'

export function addOrder(id, order) {
  return { type: ADD_ORDER, id, order }
}

export function deleteOrder(id) {
  return { type: DELETE_ORDER, id }
}

export function startDeletingOrder() {
  return {
    type: START_DELETING_ORDER
  }
}

export function startChangingOrderQuantity(order) {
  return {
    type: START_CHANGING_ORDER_QUANTITY,
    order
  }
}

export function finishChangingOrderQuantity() {
  return (dispatch, getState) => {
    dispatch({
      type: FINISH_CHANGING_ORDER_QUANTITY
    })

    if (getState().orders.pendingTransaction) {
      dispatch(completePendingTransaction())
    }
  }
}

export function cancelChangingOrderQuantity() {
  return (dispatch, getState) => {
    dispatch({
      type: CANCEL_CHANGING_ORDER_QUANTITY
    })

    if (getState().orders.pendingTransaction) {
      dispatch(discardPendingTransaction())
    }
  }
}

export function changeOrderQuantity(id, quantity) {
  return (dispatch, getState) => {
    if (getState().orders.pendingTransaction) {
      dispatch({
        type: CHANGE_PENDING_TRANSACTION_QUANTITY,
        quantity
      })
    } else {
      dispatch({
        type: CHANGE_ORDER_QUANTITY, id, quantity
      })
    }
  }
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

export function completePendingTransaction() {
  return (dispatch, getState) => {
    const transaction = getState().orders.pendingTransaction

    // if (quantity) {
    //   transaction.Qty = quantity
    // }

    dispatch(addOrder(transaction._id, transaction))
    dispatch(discardPendingTransaction())
  }
}

export function createPendingTransactionByProduct(product) {
  return (dispatch, getState) => {
    const transaction = findTransactionByProduct(getState, product, getState().orders.mode)

    if (transaction) {
      dispatch(promptStartModifyTransaction(transaction))
    } else {
      const barcodeID = getState().barcodeIDsByProductID[product.ProductID]
      const transaction = _createTransaction({
        getState,
        product,
        barcode: getState().barcodeEntities[barcodeID],
        mode: getState().orders.mode
      })
      dispatch(createPendingTransaction(transaction))
      dispatch(startChangingOrderQuantity(transaction))
    }
  }
}

export function createPendingTransactionByBarcodeID(barcodeID) {
  return (dispatch, getState) => {
    const barcode = dispatch(_findBarcodeByID(barcodeID))

    if (barcode) {
      const transaction = findTransactionByBarcode(getState, barcode, getState().orders.mode)

      if (transaction) {
        dispatch(promptStartModifyTransaction(transaction))
      } else {
        const transaction = _createTransaction({
          getState,
          barcode,
          mode: getState().orders.mode
        })
        dispatch(createPendingTransaction(transaction))
        dispatch(startChangingOrderQuantity(transaction))
      }
    }
  }
}

function _createTransaction({ getState, barcode, product, quantity = 1, mode }) {
  // TODO: Validate arguments with Flow

  const productID = barcode ? barcode.ProductID : product.ProductID

  if (!product) {
    product = productID && getState().productEntities[productID]
  }

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
    ProductID: productID,
    ProductName: product && product.ProductName,
    UserID: getState().cashiers.activeCashier.CashierID
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

function findTransactionByProduct(getState, product, mode) {
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

export function promptStartModifyTransaction(transaction) {
  return {
    type: PROMPT_START_MODIFY_TRANSACTION,
    transaction
  }
}

export function confirmStartModifyTransaction(transaction) {
  return {
    type: CONFIRM_START_MODIFY_TRANSACTION
  }
}

export function cancelStartModifyTransaction() {
  return {
    type: CANCEL_START_MODIFY_TRANSACTION
  }
}

// export function createTransactionFromBarcode({ mode, barcode, quantity }) {
//   return (dispatch, getState) => {
//     const transaction = findTransactionByBarcode(getState, barcode, mode)
//
//     if (transaction) {
//       dispatch(changeOrderQuantity(transaction._id, transaction.Qty + quantity))
//     } else {
//       const transaction = _createTransaction({ getState, barcode, quantity, mode })
//       dispatch(addOrder(transaction._id, transaction))
//     }
//   }
// }

// export function createTransactionFromProduct({ mode, product, quantity }) {
//   return (dispatch, getState) => {
//     const transaction = findTransactionByProduct({ mode, product, getState })
//
//     if (transaction) {
//       dispatch(changeOrderQuantity(transaction._id, transaction.Qty + quantity))
//     } else {
//       const transaction = _createTransaction({ getState, product, quantity, mode })
//       dispatch(addOrder(transaction._id, transaction))
//     }
//   }
// }
