import actions from './actions'
import {  barcodeOperations } from '../barcode'
import { networkOperations } from '../network'
import { v4 as uuidGen } from 'uuid'
import { find, filter, includes, map } from 'lodash'
  debugger
 
  export function addOrder(id, order) {
    return  dispatch(actions.addOrder(id, order))
  }
  
  export function deleteOrder(id) {
    return dispatch(actions.deleteOrder(id))
  }
  
  export function cancelDeletingOrder() {
    return dispatch(actions.cancelDeletingOrder())
  }
  
  export function startDeletingOrder() {
    return dispatch(actions.startDeletingOrder())
  }
  
  export function startChangingOrderQuantity(order) {
    return dispatch(actions.startDeletingOrder(order))
  }
  
  export function finishChangingOrderQuantity() {
    return (dispatch, getState) => {
      dispatch(actions.finishChangingOrderQuantity())
  
      if (getState().orders.pendingTransaction) {
        completePendingTransaction()
      }
    }
  }
  
  export function cancelChangingOrderQuantity() {
    return (dispatch, getState) => {
      dispatch(actions.cancelChangingOrderQuantity())
      if (getState().orders.pendingTransaction) {
        discardPendingTransaction()
      }
    }
  }
  
  export function changeOrderQuantity(id, quantity) {
    return (dispatch, getState) => {
      if (getState().orders.pendingTransaction) {
        dispatch(actions.changePendingTransactionQuantity(quantity))
      } else {
        dispatch(actions.changeOrderQuantity(id, quantity))
      }
    }
  }
  
  export function requestProcessOrders() {
    return dispatch(actions.requestProcessOrders())
  }
  
  export function receiveProcessOrders() {
    return dispatch(actions.receiveProcessOrders())
  }
  
  export function succeedProcessOrders(orderIDs) {
    return dispatch(actions.succeedProcessOrders(orderIDs))
  }
  
  export function failProcessOrders(error) {
    return dispatch(actions.failProcessOrders(error))
  }
  
  export function processOrders() {
    return function (dispatch, getState) {
      requestProcessOrders();
  
      const { orders, orderEntities } = getState()
  
      const orderIDs = filter(orders.unprocessedItems, id => {
        return orderEntities.hasOwnProperty(id) &&
            orderEntities[id].TransType === orders.mode
      })
  
      const filteredOrders = map(orderIDs, id => {
        return orderEntities.hasOwnProperty(id) &&
            orderEntities[id]
      })
  
      return dispatch(networkOperations.callApi({
        service: 'HandheldService.ProcessTransactions',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          Data: filteredOrders
        },
        success: () => {
          receiveProcessOrders();
          succeedProcessOrders(orderIDs);
        },
        error: error => failProcessOrders(error)
      }))
    }
  }
  
  export function changeOperationMode(mode) {debugger
    return dispatch(actions.changeOperationMode(mode))
  }
  
  export function createPendingTransaction(transaction) {
    return dispatch(actions.createPendingTransaction(transaction))
  }
  
  export function discardPendingTransaction() {
    return dispatch(actions.discardPendingTransaction())
  }
  
  export function completePendingTransaction() {
    return (getState) => {
      const transaction = getState().orders.pendingTransaction
  
      addOrder(transaction._id, transaction)
      discardPendingTransaction()
    }
  }
  
  export function createPendingTransactionByProduct(product) {
    return (getState) => {
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
       createPendingTransaction(transaction)
       startChangingOrderQuantity(transaction)
      }
    }
  }
  
  export function createPendingTransactionByBarcodeID(barcodeID) {
    return (dispatch, getState) => {
      const barcode = dispatch(barcodeOperations._findBarcodeByID(barcodeID))
  
      if (barcode) {
        const transaction = findTransactionByBarcode(getState, barcode, getState().orders.mode)
  
        if (transaction) {
         promptStartModifyTransaction(transaction);
        } else {
          const transaction = _createTransaction({
            getState,
            barcode,
            mode: getState().orders.mode
          })
          createPendingTransaction(transaction);
          startChangingOrderQuantity(transaction);
        }
      }
    }
  }
  
  function _createTransaction({ getState, barcode, product, quantity = 1, mode }) {
    const productID = barcode ? barcode.ProductID : product.ProductID
  
    if (!product) {
      product = productID && getState().productEntities[productID]
    }
  
    return {
      _id: uuidGen(),
      __type: 'HandheldTrans',
      AreaID: getState().app.storeID,
      Barcode: barcode && barcode.Barcode,
      Qty: quantity,
      Ref1: '',
      Ref2: '',
      TermianlID: window.cordova && window.device ? window.device.uuid : getState().terminalID,
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
    return dispatch(actions.promptStartModifyTransaction(transaction))
  }
  
  export function confirmStartModifyTransaction() {
    return dispatch(actions.confirmStartModifyTransaction())
  }
  
  export function cancelStartModifyTransaction() {
    return dispatch(actions.cancelStartModifyTransaction())
  }
  
  export default {
    cancelStartModifyTransaction,
    confirmStartModifyTransaction,
    promptStartModifyTransaction,
    createPendingTransactionByBarcodeID,
    createPendingTransactionByProduct,
    finishChangingOrderQuantity,
    startChangingOrderQuantity,
    startDeletingOrder,
    cancelDeletingOrder,
    deleteOrder,
    addOrder
  }